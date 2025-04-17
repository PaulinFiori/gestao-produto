package br.back.back.config;

import java.lang.reflect.Method;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
import org.springframework.web.bind.annotation.RequestMethod;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
			"classpath:/resources/", "classpath:/static/", "classpath:/public/" };

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		if (!registry.hasMappingForPattern("/**")) {
			registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
		}
	}
	
	@Bean
	public WebMvcRegistrations webMvcRegistrationsHandlerMapping() {
		return new WebMvcRegistrations() {
			@Override
			public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
				return new RequestMappingHandlerMapping() {
					private static final String API_BASE_PATH = "api";

					@Override
					protected void registerHandlerMethod(Object handler, Method method, RequestMappingInfo mapping) {
						PatternsRequestCondition apiPattern = new PatternsRequestCondition(API_BASE_PATH)
									.combine(mapping.getPatternsCondition());

						mapping = RequestMappingInfo
								.paths(apiPattern.getPatterns().toArray(new String[0]))
								.methods(mapping.getMethodsCondition().getMethods().toArray(new RequestMethod[0]))
								.build();

						super.registerHandlerMethod(handler, method, mapping);
					}
				};
			}
		};
	}

}