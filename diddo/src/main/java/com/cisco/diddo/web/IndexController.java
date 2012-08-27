package com.cisco.diddo.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cisco.diddo.entity.User;

@RequestMapping("/")
@Controller
public class IndexController extends BaseController{
	
	@RequestMapping(produces = "text/html")
	public String index(ModelMap model, HttpServletRequest request, HttpServletResponse response){
	    User usr = getCurrentUser();
	    HttpSession session = request.getSession();
	    if(usr != null){
	    	model.addAttribute("user", usr);
	    	model.addAttribute("team" , usr.team);
	    	model.addAttribute("username" , usr.getUsername());
	    	session.setAttribute("user", usr);
	    	session.setAttribute("team" , usr.team);
	    	session.setAttribute("username" , usr.getUsername());
	    }
	    else{
	    	Authentication auth = getCurrentAuthentication();
	    	model.addAttribute("username" , auth.getPrincipal().toString());
	    	session.setAttribute("username" , auth.getPrincipal().toString());
	    }
	    if(hasRole("ROLE_ADMIN")){
    		model.addAttribute("ROLE" , "ROLE_ADMIN");
    		session.setAttribute("ROLE" , "ROLE_ADMIN");
    	}
    	else if(hasRole("ROLE_USER")){
    		model.addAttribute("ROLE" , "ROLE_USER");
    		session.setAttribute("ROLE" , "ROLE_USER");
    	}
    	else{
    		model.addAttribute("ROLE" , "ROLE_VIEW");
    		session.setAttribute("ROLE" , "ROLE_VIEW");
    	}
	    return "index";
	}

}
