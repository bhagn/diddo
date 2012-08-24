package com.cisco.diddo.web;

import java.math.BigInteger;
import java.util.List;

import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.entity.Team;
import com.cisco.diddo.entity.User;

import flexjson.JSONSerializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/teams")
@Controller
@RooWebScaffold(path = "teams", formBackingObject = Team.class)
@RooWebJson(jsonObject = Team.class)
public class TeamController {
	 
		@Autowired
	    public UserDao userDao;
		
		@RequestMapping(value = "/{id}",params="users", headers = "Accept=application/json")
	    @ResponseBody
	    public ResponseEntity<String> getUserJson(@PathVariable("id") BigInteger id) {
	        Team team = teamDao.findOne(id);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json; charset=utf-8");
	        if (team == null) {
	            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
	        }
	        List<User> userList = userDao.findAllByTeam(team);
	        String userJson = new JSONSerializer().exclude("*.class").serialize(userList);
	        return new ResponseEntity<String>(userJson, headers, HttpStatus.OK);
	    }
}
