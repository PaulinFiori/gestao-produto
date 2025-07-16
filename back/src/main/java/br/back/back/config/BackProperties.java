package br.back.back.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "spring")
@Data
public class BackProperties {

    private Mail mail = new Mail();

    @Data
    public static class Mail {

        private String host;
        private String username;
        private String password;

    }
}
