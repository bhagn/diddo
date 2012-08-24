package com.cisco.diddo.web;

import javax.mail.Session;
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
    		model.addAttribute("ROLE_USER" , true);
    		model.addAttribute("ROLE_ADMIN" , true);
    		session.setAttribute("ROLE_USER" , true);
    		session.setAttribute("ROLE_ADMIN" , true);
    	}
    	else if(hasRole("ROLE_USER")){
    		model.addAttribute("ROLE_USER" , true);
    		session.setAttribute("ROLE_USER" , true);
    	}
    	else{
    		model.addAttribute("ROLE_VIEW" , true);
    		session.setAttribute("ROLE_VIEW" , true);
    	}
	    return "index";
	}

}
