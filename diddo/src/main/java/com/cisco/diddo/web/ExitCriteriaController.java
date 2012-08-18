package com.cisco.diddo.web;

import com.cisco.diddo.entity.ExitCriteria;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/exitcriterias")
@Controller
@RooWebScaffold(path = "exitcriterias", formBackingObject = ExitCriteria.class)
@RooWebJson(jsonObject = ExitCriteria.class)
public class ExitCriteriaController {
}
