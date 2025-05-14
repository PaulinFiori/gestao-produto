package br.back.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import java.time.Duration;

@Configuration(proxyBeanMethods = false)
public class AuthorizationServerConfig {

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder()
            .setting("access_token_time_to_live", Duration.ofHours(1)) // 1 hora
            .setting("refresh_token_time_to_live", Duration.ofDays(30)) // 30 dias
            .build();
    }
}
