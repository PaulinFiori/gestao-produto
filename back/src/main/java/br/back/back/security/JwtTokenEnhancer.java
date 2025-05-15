package br.back.back.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;
import br.back.back.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Classe responsável por adicionar informações personalizadas aos tokens JWT
 */
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

                    enhancedClaims.put("authorities",
                            usuario.getAuthorities().stream()
                                    .map(auth -> auth.getAuthority())
                                    .collect(Collectors.toList())
                    );
                });

        return enhancedClaims;
    }

    public Map<String, Object> enhanceToken(Map<String, Object> claims) {
        Map<String, Object> enhancedClaims = new HashMap<>(claims);
        enhancedClaims.put("perfil", "U");
        return enhancedClaims;
    }
}
