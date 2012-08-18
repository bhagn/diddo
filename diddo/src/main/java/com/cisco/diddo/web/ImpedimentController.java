package com.cisco.diddo.web;

import com.cisco.diddo.entity.Impediment;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/impediments")
@Controller
@RooWebScaffold(path = "impediments", formBackingObject = Impediment.class)
@RooWebJson(jsonObject = Impediment.class)
public class ImpedimentController {
}
