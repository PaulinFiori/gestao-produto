package br.back.back.config;

import freemarker.template.Configuration;
import freemarker.template.TemplateExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

@org.springframework.context.annotation.Configuration
public class FreemarkerConfig {

    @Bean
    public Configuration freemarkerConfiguration() throws Exception {
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_32);
        
        // Definir onde estão os templates
        configuration.setDirectoryForTemplateLoading(
            new ClassPathResource("templates").getFile()
        );
        
        // Configurações padrão
        configuration.setDefaultEncoding("UTF-8");
        configuration.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        configuration.setLogTemplateExceptions(false);
        configuration.setWrapUncheckedExceptions(true);
        configuration.setFallbackOnNullLoopVariable(false);
        
        return configuration;
    }
}
