package com.ktully.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@EnableEurekaClient
@EnableConfigurationProperties(UriConfiguration.class)
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
	
	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder, UriConfiguration uriConfiguration) {
		String apiReactiveUri = uriConfiguration.getApiReactive();
		String authUri = uriConfiguration.getAuth();
		return builder.routes()
				// apiReactive
				.route(p -> p.path("/api/reactive/**").uri(apiReactiveUri))
				// auth
				//.route(p -> p.path("/api/auth/**").uri(authUri))
				.route(p -> p.path("/api/auth/**").filters(f -> f.dedupeResponseHeader("Access-Control-Allow-Origin", "RETAIN_LAST")).uri(authUri))
				.route(p -> p.path("/api/test/**").filters(f -> f.dedupeResponseHeader("Access-Control-Allow-Origin", "RETAIN_LAST")).uri(authUri))
				// apiWeb // TODO
				.build();
		
		/* Interesting reference for route configs:
		 * 		//.route(p -> p.path("/api/auth/**").and().method("OPTION").filters(f -> f.setStatus("200").removeRequestHeader("Origin").addResponseHeader("Access-Control-Allow-Origin", "*").addResponseHeader("Access-Control-Allow-Headers", "content-type").dedupeResponseHeader("Access-Control-Allow-Origin", "RETAIN_UNIQUE").dedupeResponseHeader("Access-Control-Allow-Headers", "RETAIN_UNIQUE")).uri(authUri))
				//.route(p -> p.path("/api/auth/**").and().method("OPTION").filters(f -> f.setStatus("200").removeRequestHeader("Origin").addResponseHeader("Access-Control-Allow-Origin", "*").addResponseHeader("Access-Control-Allow-Headers", "content-type")).uri(authUri))
				//.route(p -> p.path("/api/test/**").and().method("OPTION").filters(f -> f.setStatus("200").removeRequestHeader("Origin").addResponseHeader("Access-Control-Allow-Origin", "*").addResponseHeader("Access-Control-Allow-Headers", "content-type").dedupeResponseHeader("Access-Control-Allow-Origin", "RETAIN_UNIQUE").dedupeResponseHeader("Access-Control-Allow-Headers", "RETAIN_UNIQUE")).uri(authUri))
				//.route(p -> p.path("/api/test/**").and().method("OPTION").filters(f -> f.setStatus("200").removeRequestHeader("Origin").addResponseHeader("Access-Control-Allow-Origin", "*").addResponseHeader("Access-Control-Allow-Headers", "content-type")).uri(authUri))
		 */
	}
}

@ConfigurationProperties
class UriConfiguration {

	private String apiReactive = "lb://api-reactive";
	private String auth = "lb://auth";

	// GETTERS	
	public String getApiReactive() {
		return apiReactive;
	}
	
	public String getAuth() {
		return auth;
	}

	// SETTERS
	public void setApiReactive(String apiReactive) {
		this.apiReactive = apiReactive;
	}
	
	public void setAuth(String auth) {
		this.auth = auth;
	}
}