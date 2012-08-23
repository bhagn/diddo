package com.cisco.diddo.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	    if(usr != null){
	    	model.addAttribute("user", usr);
	    	model.addAttribute("team" , usr.team);
	    }
	    if(hasRole("ROLE_ADMIN")){
    		model.addAttribute("ROLE_USER" , true);
    		model.addAttribute("ROLE_ADMIN" , true);
    	}
    	else if(hasRole("ROLE_USER")){
    		model.addAttribute("ROLE_USER" , true);
    	}
	    return "index";
	}

}
