package com.cisco.diddo.web;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import com.cisco.diddo.dao.ExitCriteraDao;
import com.cisco.diddo.dao.UserStoryDao;
import com.cisco.diddo.entity.ExitCriteria;
import com.cisco.diddo.entity.UserStory;

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

@RequestMapping("/exitcriterias")
@Controller
@RooWebScaffold(path = "exitcriterias", formBackingObject = ExitCriteria.class)
@RooWebJson(jsonObject = ExitCriteria.class)
public class ExitCriteriaController {
	
	 @Autowired
	    ExitCriteraDao exitCriteraDao;
	    
	 @Autowired
	    UserStoryDao userStoryDao;
	//{"userStory":"24829071708636294432708773694","description":"Test"}
	 @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
	    public ResponseEntity<String> createFromJson(@RequestBody String jsonStr) {
		    Map<String, String> deserialized = new JSONDeserializer<Map<String, String>>().deserialize(jsonStr);
		    ExitCriteria exitCriteria = null;
		    String id = deserialized.get("id");
			if(id != null && !id.equals("")){
				exitCriteria = findById(new BigInteger(id));
			}
			if(exitCriteria == null){
				exitCriteria = new ExitCriteria(); 
			}
	        String usId = deserialized.get("userStory");
	        UserStory us = findUserStoryById(new BigInteger(usId));
	        exitCriteria.setUserStory(us);
	        exitCriteria.setDescription(deserialized.get("description"));
			exitCriteraDao.save(exitCriteria);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        return new ResponseEntity<String>(exitCriteria.toJson(),headers, HttpStatus.CREATED);
	    }
	 @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	    public ResponseEntity<String> deleteFromJson(@PathVariable("id") String idStr) {
			BigInteger id = new BigInteger(idStr);
	        ExitCriteria exitCriteria = findById(id);//findById(id);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        if (exitCriteria == null) {
	            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
	        }
	        exitCriteraDao.delete(exitCriteria);
	        return new ResponseEntity<String>(headers, HttpStatus.OK);
	    }
	 private ExitCriteria findById(BigInteger id){
			List<ExitCriteria> exitCriterias = exitCriteraDao.findAll();
			for(ExitCriteria exitCriteria : exitCriterias){
				if(exitCriteria.getId().equals(id)){
					return exitCriteria;
				}
			}
			return null;
		}
	 private UserStory findUserStoryById(BigInteger id){
			List<UserStory> userStorys = userStoryDao.findAll();
			for(UserStory userStory : userStorys){
				if(userStory.getId().equals(id)){
					return userStory;
				}
			}
			return null;
		}
	    
}
