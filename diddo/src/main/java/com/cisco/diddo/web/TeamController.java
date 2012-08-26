package com.cisco.diddo.web;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.ResponseBody;

import com.cisco.diddo.dao.ScrumMasterDao;
import com.cisco.diddo.dao.TeamDao;
import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.entity.Team;
import com.cisco.diddo.entity.User;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@RequestMapping("/teams")
@Controller
@RooWebScaffold(path = "teams", formBackingObject = Team.class)
@RooWebJson(jsonObject = Team.class)
public class TeamController {
	 
		@Autowired
	    public UserDao userDao;
		
		
		@Autowired
		public TeamDao teamDao;
		
		@Autowired
		public ScrumMasterDao scrumMasterDao;
		
		@RequestMapping(value = "/{id}",params="users", headers = "Accept=application/json")
	    @ResponseBody
	    public ResponseEntity<String> getUserJson(@PathVariable("id") String id) {
	        Team team = findById(new BigInteger(id));
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json; charset=utf-8");
	        if (team == null) {
	            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
	        }
	        List<User> userList = userDao.findAllByTeam(team);
	        //String userJson = new JSONSerializer().exclude("*.class").serialize(userList);
	        String jsonStr = User.toJsonArray(userList);
	        return new ResponseEntity<String>(jsonStr , headers, HttpStatus.OK);
	    }
		/*@RequestMapping(headers = "Accept=application/json")
	    @ResponseBody
	    public ResponseEntity<String> listJson() {
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json; charset=utf-8");
	        List<Team> result = teamDao.findAll();
	        return new ResponseEntity<String>(Team.toJsonArray(result), headers, HttpStatus.OK);
	    }*/
		@RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	    public ResponseEntity<String> deleteFromJson(@PathVariable("id") String id) {
	        Team team = findById(new BigInteger(id));
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        if (team == null) {
	            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
	        }
	        teamDao.delete(team);
	        return new ResponseEntity<String>(headers, HttpStatus.OK);
	    }
		@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
	    public ResponseEntity<String> createFromJson(@RequestBody String json) {
	        Team team = fromJsonToTeam(json);
	        teamDao.save(team);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        return new ResponseEntity<String>(team.toJson() , headers, HttpStatus.CREATED);
	    }
		
		@RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
	    public ResponseEntity<String> updateFromJson(@RequestBody String json) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        Team team = fromJsonToTeam(json);
	        if (teamDao.save(team) == null) {
	            return new ResponseEntity<String>(team.toJson() , headers, HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<String>(team.toJson() ,headers, HttpStatus.OK);
	    }
		
		private Team findById(BigInteger id){
			List<Team> teams = teamDao.findAll();
			for(Team team : teams){
				if(team.getId().equals(id)){
					return team;
				}
			}
			return null;
		}
		private Team fromJsonToTeam(String jsonStr){
			Team team = null;
			Map<String, String> deserialized = new JSONDeserializer<Map<String, String>>().deserialize(jsonStr);
			  String id = deserialized.get("id");
			  if(id != null && !id.equals("")){
				 team = findById(new BigInteger(id));
			  }
			  if(team == null){
				  team = new Team();
			  }
			  team.setName(deserialized.get("name"));
			  team.setEmail(deserialized.get("email"));
			  String scrumMasterId = deserialized.get("scrumMaster");
			  if(scrumMasterId != null && !scrumMasterId.equals("")){
			     //set scrummaster here;
			  }
			return team;
		}

}
