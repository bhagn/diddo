package com.cisco.diddo.web;

import java.math.BigInteger;
import java.util.ArrayList;
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

import com.cisco.diddo.dao.SprintDao;
import com.cisco.diddo.dao.TeamDao;
import com.cisco.diddo.dao.UserStoryDao;
import com.cisco.diddo.entity.Sprint;
import com.cisco.diddo.entity.Team;
import com.cisco.diddo.entity.UserStory;

import flexjson.JSONDeserializer;

@RequestMapping("/userstorys")
@Controller
@RooWebScaffold(path = "userstorys", formBackingObject = UserStory.class)
@RooWebJson(jsonObject = UserStory.class)
public class UserStoryController {
	    @Autowired
	    public UserStoryDao userStoryDao;
	    
	    @Autowired
	    public SprintDao sprintDao;
	    
	    @Autowired
	    public TeamDao teamDao;
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> deleteFromJson(@PathVariable("id") String idStr) {
		BigInteger id = new BigInteger(idStr);
        UserStory userStory = findById(id);//findById(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (userStory == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        userStoryDao.delete(userStory);
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
	
	 @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
	    public ResponseEntity<String> createFromJson(@RequestBody String json) {
	        UserStory userStory = fromJsonToUserStory(json);
	        userStoryDao.save(userStory);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        return new ResponseEntity<String>(userStory.toJson(),headers, HttpStatus.CREATED);
	    }
	
    @RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> updateFromJson(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        UserStory userStory = fromJsonToUserStory(json);
        if (userStoryDao.save(userStory) == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    } 
	 
	private UserStory findById(BigInteger id){
		List<UserStory> userStorys = userStoryDao.findAll();
		for(UserStory userStory : userStorys){
			if(userStory.getId().equals(id)){
				return userStory;
			}
		}
		return null;
	}
	private Sprint findSprintById(BigInteger id){
		List<Sprint> sprints = sprintDao.findAll();
		for(Sprint sprint : sprints){
			if(sprint.getId().equals(id)){
				return sprint;
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
	private UserStory fromJsonToUserStory(String jsonStr){
		UserStory userStory = null;
		Map<String, String> deserialized = new JSONDeserializer<Map<String, String>>().deserialize(jsonStr);
		String id = deserialized.get("id");
		if(id != null && !id.equals("")){
			 userStory = findById(new BigInteger(id));
		}
		if(userStory == null){
			userStory = new UserStory();
		 }
		userStory.setFriendlyID(deserialized.get("friendlyID"));
	    userStory.setDescription(deserialized.get("description"));
	    String points = deserialized.get("points");
	    if(points != null){
	    	userStory.setPoints(Byte.valueOf(points));
	    }
	    userStory.setColor(deserialized.get("color"));
	    if(deserialized.get("unplanned") != null ){
	    	Object obj = deserialized.get("unplanned");
	    	if(obj instanceof ArrayList && ((ArrayList)obj).size() > 0){
	    	    userStory.setUnplanned(true);
	    	}
	    }
	    String Id = deserialized.get("sprint");
	    if(Id != null && !Id.equals("")){
	    	BigInteger iid = new BigInteger(Id);
	    	userStory.setSprint(findSprintById(iid));
	    }
	    Id = deserialized.get("team");
	    if(Id != null && !Id.equals("")){
	    	BigInteger iid = new BigInteger(Id);
	    	userStory.setTeam(findTeamById(iid));
	    }
	    
		return userStory;
	}

}
