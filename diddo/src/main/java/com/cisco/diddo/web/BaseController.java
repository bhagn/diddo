package com.cisco.diddo.web;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.cisco.diddo.dao.TeamDao;
import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.entity.Team;
import com.cisco.diddo.entity.User;

public class BaseController {
	@Autowired
	private TeamDao teamDao;
	
	@Autowired
	private UserDao userDao;
	
	protected  final String ROLE_ADMIN = "ROLE_ADMIN";
	protected  final String ROLE_USER = "ROLE_ADMIN";
	
	protected Authentication getCurrentAuthentication(){
		return SecurityContextHolder.getContext().getAuthentication();
	}
	
	protected boolean hasRole(String role){
		Authentication auth = getCurrentAuthentication();
		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
		for(GrantedAuthority authority : authorities){
			if(authority.equals(role)){
				return true;
			}
		}
		return false;
	}
	
	protected User getCurrentUser(){
		Authentication auth = getCurrentAuthentication();
		String userName = auth.getPrincipal().toString();
		return userDao.findByUsername(userName);
	}
    protected Team getCurrectTeam(){
    	User user = getCurrentUser();
    	if(user != null){
    		return user.getTeam();
    	}
    	return null;
    }
}
