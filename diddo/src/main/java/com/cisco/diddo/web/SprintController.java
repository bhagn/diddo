package com.cisco.diddo.web;

import java.util.List;

import com.cisco.diddo.dao.SprintDao;
import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.dao.UserStoryDao;
import com.cisco.diddo.entity.Sprint;
import com.cisco.diddo.entity.Team;
import com.cisco.diddo.entity.User;
import com.cisco.diddo.entity.UserStory;

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

@RequestMapping("/sprints")
@Controller
@RooWebScaffold(path = "sprints", formBackingObject = Sprint.class)
@RooWebJson(jsonObject = Sprint.class)
public class SprintController {
	
	@Autowired
	public UserStoryDao userStoryDao;
	
	@RequestMapping(value = "/{id}",params="userstories", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> getUserJson(@PathVariable("id") String sprintNo) {
        Sprint sprint = sprintDao.findBySprintNo(sprintNo);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (sprint == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        List<UserStory> userStoryList = userStoryDao.findAllBySprint_SprintNoAndSprint_ReleaseVersion(sprint.getSprintNo(), sprint.getReleaseVersion());
        String userStoryJson = UserStory.toJsonArray(userStoryList);
        return new ResponseEntity<String>(userStoryJson, headers, HttpStatus.OK);
    }
}
