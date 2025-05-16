package br.back.back.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;

@Component
public class JwtTokenUtil {

    @Value("${jwt.access-token-validity-seconds:3600}")
    private long accessTokenValidityInSeconds;

    @Value("${jwt.refresh-token-validity-seconds:2592000}")
    private long refreshTokenValidityInSeconds;

    @Value("${jwt.secret:gPXp2r5u8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaN}")
    private String secretString;
    
    private static SecretKey SIGNING_KEY;
    
    private SecretKey getSigningKey() {
        if (SIGNING_KEY == null) {
            SIGNING_KEY = Keys.hmacShaKeyFor(secretString.getBytes());
        }
        return SIGNING_KEY;
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    @Autowired
    private JwtTokenEnhancer tokenEnhancer;

    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims = tokenEnhancer.enhanceToken(claims, userDetails);
        return doGenerateToken(claims, userDetails.getUsername(), false);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims = tokenEnhancer.enhanceToken(claims, userDetails);
        return doGenerateToken(claims, userDetails.getUsername(), true);
    }

    private String doGenerateToken(Map<String, Object> claims, String subject, boolean isRefreshToken) {
        long validity = isRefreshToken ? refreshTokenValidityInSeconds : accessTokenValidityInSeconds;
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + validity * 1000))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
} 