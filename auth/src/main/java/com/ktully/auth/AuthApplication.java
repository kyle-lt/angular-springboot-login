package com.ktully.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
//import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaClient
@SpringBootApplication
@EnableConfigurationProperties(UriConfiguration.class)
@RestController
public class AuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}
	
	@Bean
	public ServerCodecConfigurer serverCodecConfigurer() {
	   return ServerCodecConfigurer.create();
	}
	
	/* Disabling for now, using Proxy util object in Controllers
	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder, UriConfiguration uriConfiguration) {
		String httpbinUri = uriConfiguration.getHttpbin();
		String apiReactiveUri = uriConfiguration.getApiReactive();
		return builder.routes()
				// httpbin
				.route(p -> p.path("/get").filters(f -> f.addRequestHeader("Hello", "World")).uri(httpbinUri))
				.route(p -> p.path("/headers").filters(f -> f.addRequestHeader("Hello", "World")).uri(httpbinUri))
				.route(p -> p.path("/ip").filters(f -> f.addRequestHeader("Hello", "World")).uri(httpbinUri))
				// apiReactive
				.route(p -> p.path("/api/reactive/public").uri(apiReactiveUri))
				// apiWeb // TODO
				.build();
	}
	*/
}

@ConfigurationProperties
class UriConfiguration {

	private String httpbin = "http://httpbin.org:80";
	private String apiReactive = "lb://api-reactive";

	// GETTERS
	public String getHttpbin() {
		return httpbin;
	}
	
	public String getApiReactive() {
		return apiReactive;
	}

	// SETTERS
	public void setHttpbin(String httpbin) {
		this.httpbin = httpbin;
	}
	
	public void setApiReactive(String apiReactive) {
		this.apiReactive = apiReactive;
	}
}
