package com.cisco.diddo.web;

import com.cisco.diddo.entity.UserStory;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/userstorys")
@Controller
@RooWebScaffold(path = "userstorys", formBackingObject = UserStory.class)
@RooWebJson(jsonObject = UserStory.class)
public class UserStoryController {
}
