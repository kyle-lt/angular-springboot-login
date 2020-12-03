package com.ktully.api.reactive.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * This API Controller is hidden behind Spring Cloud Gateway, which
 * does authentication and authorization for the below end points
 * using antMatchers in the com.ktully.auth.security.WebSecurityConfig
 * class.
 */

@RestController
public class MainController {

	@GetMapping("/api/reactive/public")
	public String pub() {
	    return "Hello, this is Public Content!";
	  }
	
	@GetMapping("/api/reactive/user")
	public String user() {
	    return "Hello, this is User Content!";
	  }
	
	@GetMapping("/api/reactive/admin")
	public String admin() {
	    return "Hello, this is Admin Content!";
	  }
	
	@GetMapping("/api/reactive/mod")
	public String mod() {
	    return "Hello, this is Moderator Content!";
	  }
	

}
