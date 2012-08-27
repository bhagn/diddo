package com.cisco.diddo.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;

import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.entity.User;

public class DiddoAuthenticationProvider implements AuthenticationProvider{
	
	private String propertyFile = "users.properties";
	
	 @Autowired
	 private UserDao userDao;
	 
 	@Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
    	//initialData.save();
    	try{
    		String userName = authentication.getPrincipal().toString();
	        String passWord = authentication.getCredentials().toString();
    		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        	//check for ROLE.
        	User user = userDao.findByUsernameAndPassword(userName , passWord);
        	if(user != null){
   	        	if(user.scrumMaster){
		    	        authorities.add(new GrantedAuthorityImpl("ROLE_ADMIN"));
	    	     }
	    	     else{
	    		        authorities.add(new GrantedAuthorityImpl("ROLE_USER"));
	    	     }
	    	        	return new UsernamePasswordAuthenticationToken(userName, passWord, authorities);	
	        }
	    	Properties props = PropertiesLoaderUtils.loadAllProperties(propertyFile);
	        String val = props.getProperty(userName);
	        if(passWord.equals(val)){
	        	//@TODO Uncomment and comment previous  lines
          	    //authorities.add(new GrantedAuthorityImpl("ROLE_VIEW"));
          	    authorities.add(new GrantedAuthorityImpl("ROLE_ADMIN"));
	        	return new UsernamePasswordAuthenticationToken(userName, passWord, authorities);
    		    //throw new BadCredentialsException("Username/password is not correct.");
	        }
	        else
    		{
    			throw new BadCredentialsException("Username/password is not correct.");
    		}
    	}
    	catch(Exception ex){
    		throw new BadCredentialsException(ex.getLocalizedMessage());
    	}
        
    }

    @Override
    public boolean supports(Class<? extends Object> authentication) {
        return true;
    }

}