package br.back.back;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import java.time.ZoneId;
import java.util.Date;
import java.util.TimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;

@SpringBootApplication
public class BackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}

	@PostConstruct
	public void init(){
		Logger logger
				= Logger.getLogger(
				BackApplication.class.getName());

		TimeZone.setDefault(TimeZone.getTimeZone(ZoneId.of("America/Sao_Paulo")));
		logger.log(Level.INFO,"Spring boot application running in America/Sao_Paulo timezone : {0}", new Date());
	}

}
