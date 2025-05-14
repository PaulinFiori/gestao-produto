package br.back.back.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Optional;
import br.back.back.config.JwtConfig;

@Service
public class JwtService {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtConfig jwtConfig;

    public String generateAccessToken(UserDetails userDetails) {
        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails cannot be null");
        }
        return jwtTokenUtil.generateAccessToken(userDetails);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails cannot be null");
        }
        return jwtTokenUtil.generateRefreshToken(userDetails);
    }

    public String getUsernameFromToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }
        return jwtTokenUtil.getUsernameFromToken(token);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }
        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails cannot be null");
        }
        return jwtTokenUtil.validateToken(token, userDetails);
    }

    public boolean isTokenExpired(String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }
        return jwtTokenUtil.isTokenExpired(token);
    }

    public void addTokensToResponse(HttpServletResponse response, String accessToken, String refreshToken) {
        Cookie accessTokenCookie = new Cookie(jwtConfig.getCookie().getAccessToken(), accessToken);
        Cookie refreshTokenCookie = new Cookie(jwtConfig.getCookie().getRefreshToken(), refreshToken);

        configureCookie(accessTokenCookie);
        configureCookie(refreshTokenCookie);

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);
    }

    private void configureCookie(Cookie cookie) {
        cookie.setHttpOnly(true);
        cookie.setSecure(jwtConfig.getCookie().isSecure());
        cookie.setPath("/");
    }

    public Optional<String> getAccessTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return Optional.empty();
        }
        return Arrays.stream(cookies)
                .filter(cookie -> jwtConfig.getCookie().getAccessToken().equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    public Optional<String> getRefreshTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return Optional.empty();
        }
        return Arrays.stream(cookies)
                .filter(cookie -> jwtConfig.getCookie().getRefreshToken().equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    public void invalidateTokens(HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie(jwtConfig.getCookie().getAccessToken(), "");
        Cookie refreshTokenCookie = new Cookie(jwtConfig.getCookie().getRefreshToken(), "");

        accessTokenCookie.setMaxAge(0);
        refreshTokenCookie.setMaxAge(0);

        configureCookie(accessTokenCookie);
        configureCookie(refreshTokenCookie);

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);
    }

    public boolean isRefreshTokenValid(String refreshToken) {
        return !isTokenExpired(refreshToken);
    }
}
