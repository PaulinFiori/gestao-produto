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

    /**
     * Adiciona informações personalizadas ao token JWT
     * @param claims Claims básicas do token
     * @param userDetails Detalhes do usuário autenticado
     * @return Claims enriquecidas com perfil e authorities
     */
    public Map<String, Object> enhanceToken(Map<String, Object> claims, UserDetails userDetails) {
        Map<String, Object> enhancedClaims = new HashMap<>(claims);

        // Tenta buscar o usuário pelo email
        usuarioRepository.findByEmail(userDetails.getUsername())
                .ifPresent(usuario -> {
                    // Adiciona o perfil do usuário (A para admin, U para usuário comum)
                    enhancedClaims.put("perfil", usuario.getPerfil());

                    // Adiciona as authorities do usuário
                    enhancedClaims.put("authorities",
                            usuario.getAuthorities().stream()
                                    .map(auth -> auth.getAuthority())
                                    .collect(Collectors.toList())
                    );
                });

        return enhancedClaims;
    }

    /**
     * Método de compatibilidade para versões anteriores
     * @param claims Claims básicas do token
     * @return Claims enriquecidas com perfil padrão
     */
    public Map<String, Object> enhanceToken(Map<String, Object> claims) {
        Map<String, Object> enhancedClaims = new HashMap<>(claims);
        enhancedClaims.put("perfil", "U"); // Default para usuário comum
        return enhancedClaims;
    }
}
