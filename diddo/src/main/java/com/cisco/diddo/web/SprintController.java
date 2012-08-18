package com.cisco.diddo.web;

import com.cisco.diddo.entity.Sprint;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/sprints")
@Controller
@RooWebScaffold(path = "sprints", formBackingObject = Sprint.class)
@RooWebJson(jsonObject = Sprint.class)
public class SprintController {
}
