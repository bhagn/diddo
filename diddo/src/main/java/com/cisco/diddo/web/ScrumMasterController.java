package com.cisco.diddo.web;

import com.cisco.diddo.entity.ScrumMaster;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/scrummasters")
@Controller
@RooWebScaffold(path = "scrummasters", formBackingObject = ScrumMaster.class)
@RooWebJson(jsonObject = ScrumMaster.class)
public class ScrumMasterController {
}
