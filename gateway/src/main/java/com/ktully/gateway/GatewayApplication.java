package com.ktully.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
//import org.springframework.http.codec.ServerCodecConfigurer;

@EnableEurekaClient
@EnableConfigurationProperties(UriConfiguration.class)
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
	
	/*
	@Bean
	public ServerCodecConfigurer serverCodecConfigurer() {
	   return ServerCodecConfigurer.create();
	}*/
	
	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder, UriConfiguration uriConfiguration) {
		String httpbinUri = uriConfiguration.getHttpbin();
		String apiReactiveUri = uriConfiguration.getApiReactive();
		String authUri = uriConfiguration.getAuth();
		return builder.routes()
				// httpbin
				.route(p -> p.path("/get").filters(f -> f.addRequestHeader("Hello", "World")).uri(httpbinUri))
				.route(p -> p.path("/headers").filters(f -> f.addRequestHeader("Hello", "World")).uri(httpbinUri))
				.route(p -> p.path("/ip").filters(f -> f.addRequestHeader("Hello", "World")).uri(httpbinUri))
				// apiReactive
				.route(p -> p.path("/api/reactive/**").uri(apiReactiveUri))
				.route(p -> p.path("/api/auth/**").uri(authUri))
				// apiWeb // TODO
				.build();
	}
}

@ConfigurationProperties
class UriConfiguration {

	private String httpbin = "http://httpbin.org:80";
	private String apiReactive = "lb://api-reactive";
	private String auth = "lb://auth";

	// GETTERS
	public String getHttpbin() {
		return httpbin;
	}
	
	public String getApiReactive() {
		return apiReactive;
	}
	
	public String getAuth() {
		return auth;
	}

	// SETTERS
	public void setHttpbin(String httpbin) {
		this.httpbin = httpbin;
	}
	
	public void setApiReactive(String apiReactive) {
		this.apiReactive = apiReactive;
	}
	
	public void setAuth(String auth) {
		this.auth = auth;
	}
}