package com.cisco.diddo.web;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class BaseController {
	protected  final String ROLE_ADMIN = "ROLE_ADMIN";
	protected  final String ROLE_USER = "ROLE_ADMIN";
	
	protected Authentication getCurrentUser(){
		return SecurityContextHolder.getContext().getAuthentication();
	}
	
	protected boolean hasRole(String role){
		Authentication auth = getCurrentUser();
		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
		for(GrantedAuthority authority : authorities){
			if(authority.equals(role)){
				return true;
			}
		}
		return false;
	}

}
