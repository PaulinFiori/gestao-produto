package br.back.back.controller;

import br.back.back.dto.LoginRequest;
import br.back.back.model.Usuario;
import br.back.back.security.JwtService;
import br.back.back.security.UserDetailsServiceImpl;
import br.back.back.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(authService.register(usuario.getNome(), usuario.getEmail(), usuario.getSenha()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.senha())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.email());
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        jwtService.addTokensToResponse(response, accessToken, refreshToken);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        Optional<String> refreshTokenOpt = jwtService.getRefreshTokenFromRequest(request);
        
        if (refreshTokenOpt.isEmpty() || jwtService.isTokenExpired(refreshTokenOpt.get())) {
            return ResponseEntity.badRequest().body("Refresh token has expired");
        }

        String refreshToken = refreshTokenOpt.get();
        String username = jwtService.getUsernameFromToken(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!jwtService.validateToken(refreshToken, userDetails)) {
            return ResponseEntity.badRequest().body("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);
        jwtService.addTokensToResponse(response, newAccessToken, refreshToken);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        jwtService.invalidateTokens(response);
        return ResponseEntity.ok().build();
    }


}
