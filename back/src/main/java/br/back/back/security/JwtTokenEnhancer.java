package br.back.back.security;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenEnhancer {

    public Map<String, Object> enhanceToken(Map<String, Object> claims) {
        Map<String, Object> enhancedClaims = new HashMap<>(claims);
        enhancedClaims.put("organization", "Your Organization");
        return enhancedClaims;
    }
} 