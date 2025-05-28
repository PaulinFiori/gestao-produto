package br.back.back.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import br.back.back.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtTokenEnhancer {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Map<String, Object> enhanceToken(Map<String, Object> claims, UserDetails userDetails) {
        Map<String, Object> enhancedClaims = new HashMap<>(claims);

        usuarioRepository.findByEmail(userDetails.getUsername())
                .ifPresent(usuario -> {
                    enhancedClaims.put("nome", usuario.getNome());
                    enhancedClaims.put("perfil", usuario.getPerfil());
                });
        
        List<String> authorities = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        enhancedClaims.put("authorities", authorities);
        
        return enhancedClaims;
    }

}
