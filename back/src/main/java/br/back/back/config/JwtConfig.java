package br.back.back.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtConfig {

    private String secret;
    private long accessTokenValidityInSeconds;
    private long refreshTokenValidityInSeconds;
    private String refreshTokenMaxAge;

    private CookieConfig cookie;

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public long getAccessTokenValidityInSeconds() {
        return accessTokenValidityInSeconds;
    }

    public void setAccessTokenValidityInSeconds(long accessTokenValidityInSeconds) {
        this.accessTokenValidityInSeconds = accessTokenValidityInSeconds;
    }

    public long getRefreshTokenValidityInSeconds() {
        return refreshTokenValidityInSeconds;
    }

    public void setRefreshTokenValidityInSeconds(long refreshTokenValidityInSeconds) {
        this.refreshTokenValidityInSeconds = refreshTokenValidityInSeconds;
    }

    public String getRefreshTokenMaxAge() {
        return refreshTokenMaxAge;
    }

    public void setRefreshTokenMaxAge(String refreshTokenMaxAge) {
        this.refreshTokenMaxAge = refreshTokenMaxAge;
    }

    public CookieConfig getCookie() {
        return cookie;
    }

    public void setCookie(CookieConfig cookie) {
        this.cookie = cookie;
    }

    public static class CookieConfig {
        private String refreshToken;
        private String accessToken;
        private boolean secure;
        private boolean httpOnly;
        private String sameSite;

        public String getRefreshToken() {
            return refreshToken;
        }

        public void setRefreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
        }

        public String getAccessToken() {
            return accessToken;
        }

        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }

        public boolean isSecure() {
            return secure;
        }

        public void setSecure(boolean secure) {
            this.secure = secure;
        }

        public boolean isHttpOnly() {
            return httpOnly;
        }

        public void setHttpOnly(boolean httpOnly) {
            this.httpOnly = httpOnly;
        }

        public String getSameSite() {
            return sameSite;
        }

        public void setSameSite(String sameSite) {
            this.sameSite = sameSite;
        }
    }
}
