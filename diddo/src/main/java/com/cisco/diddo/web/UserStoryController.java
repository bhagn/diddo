package com.cisco.diddo.web;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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

import com.cisco.diddo.dao.UserStoryDao;
import com.cisco.diddo.entity.UserStory;

import flexjson.JSONDeserializer;

@RequestMapping("/userstorys")
@Controller
@RooWebScaffold(path = "userstorys", formBackingObject = UserStory.class)
@RooWebJson(jsonObject = UserStory.class)
public class UserStoryController {
	    @Autowired
	    public UserStoryDao userStoryDao;
	
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
		/*userStory.setName(deserialized.get("name"));
	    userStory.setEmail(deserialized.get("email"));*/
		/*String scrumMasterId = deserialized.get("scrumMaster");
		if(scrumMasterId != null && !scrumMasterId.equals("")){
		     //set scrummaster here;
		}*/
		
		DateFormat format = new SimpleDateFormat("MM/dd/yyyy");
		try{
		     Date date = format.parse("dateString");
		     Calendar cal  = Calendar.getInstance(); 
		     cal.setTime(date);
		}catch(ParseException ex){
			
		}
		
		return userStory;
	}

}
