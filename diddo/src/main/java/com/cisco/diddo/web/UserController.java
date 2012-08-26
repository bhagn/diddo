package com.cisco.diddo.web;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.entity.Team;
import com.cisco.diddo.entity.User;

import flexjson.JSONDeserializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping("/users")
@Controller
@RooWebScaffold(path = "users", formBackingObject = User.class)
@RooWebJson(jsonObject = User.class)
public class UserController {
	  @Autowired
	  public UserDao userDao;
	
	   @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
	    public ResponseEntity<String> createFromJson(@RequestBody String json) {
	        User user = fromJsonToUser(json);
	        userDao.save(user);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        return new ResponseEntity<String>(user.toJson() , headers, HttpStatus.CREATED);
	    }
	   
	   @RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
	    public ResponseEntity<String> updateFromJson(@RequestBody String json) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        User user = fromJsonToUser(json);
	        if (userDao.save(user) == null) {
	            return new ResponseEntity<String>(user.toJson() , headers, HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<String>(headers, HttpStatus.OK);
	    }
	   @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	    public ResponseEntity<String> deleteFromJson(@PathVariable("id") String idStr) {
		    BigInteger id = new BigInteger(idStr);
	        User user = findById(id);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        if (user == null) {
	            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
	        }
	        userDao.delete(user);
	        return new ResponseEntity<String>(headers, HttpStatus.OK);
	    }
	   private User findById(BigInteger id){
			List<User> users = userDao.findAll();
			for(User user : users){
				if(user.getId().equals(id)){
					return user;
				}
			}
			return null;
		}
	   private Team findTeamById(BigInteger id){
		   List<Team> teams = teamDao.findAll();
			for(Team team : teams){
				if(team.getId().equals(id)){
					return team;
				}
			}
			return null;
	   }
	  private User fromJsonToUser(String jsonStr){
		  User user = null;
		  Map<String, String> deserialized = new JSONDeserializer<Map<String, String>>().deserialize(jsonStr);
		  String id = deserialized.get("id");
		  if(id != null && !id.equals("")){
			 user = findById(new BigInteger(id));
		  }
		  if(user == null){
			  user = new User();
		  }
		  user.setUsername(deserialized.get("username"));
		  user.setPassword(deserialized.get("password"));
		  user.setEmail(deserialized.get("email"));
		  String teamId = deserialized.get("team");
		  if(teamId != null && !teamId.equals("")){
		     user.setTeam(findTeamById(new BigInteger(teamId)));
		  }
		  return user;
	  }
}
