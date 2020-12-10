package com.ktully.api.reactive.Controllers;

//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * This API Controller is hidden behind Spring Cloud Gateway, which
 * handles Cross Origin header.
 */

//@CrossOrigin
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
	
	// Login-Sim Calls
	@PostMapping("api/reactive/anonymous_invoke")
	public String postAnonymous_invoke() {
		return "Call to anonymous_invoke successful!";
	}
	
	@PostMapping("api/reactive/authenticate")
	public String postAuthenticate() {
		return "Call to authenticate successful!";
	}
	
	@PostMapping("api/reactive/assert")
	public String postAssert() {
		return "Call to assert successful!";
	}
	

}
