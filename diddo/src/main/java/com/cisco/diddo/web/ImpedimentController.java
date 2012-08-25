package com.cisco.diddo.web;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cisco.diddo.dao.ImpedimentDao;
import com.cisco.diddo.dao.SprintDao;
import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.entity.Impediment;

import flexjson.JSONSerializer;
import flexjson.transformer.AbstractTransformer;

@RequestMapping("/impediments")
@Controller
@RooWebScaffold(path = "impediments", formBackingObject = Impediment.class)
@RooWebJson(jsonObject = Impediment.class)
public class ImpedimentController extends BaseController{
	
	@Autowired
	public ImpedimentDao impedimentDao;
    
    @Autowired
    public SprintDao sprintDao;
    
    @Autowired
    public UserDao userDao;
	
    @RequestMapping(params = "form", produces = "text/html")
    public String createForm(Model uiModel) {
        populateEditForm(uiModel, new Impediment());
        List<String[]> dependencies = new ArrayList<String[]>();
        if (sprintDao.count() == 0) {
            dependencies.add(new String[] { "sprint", "sprints" });
        }
        if (userDao.count() == 0) {
            dependencies.add(new String[] { "user", "users" });
        }
        uiModel.addAttribute("dependencies", dependencies);
        return "impediments/create";
    }
      
    @RequestMapping(value = "/{id}", params="close", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> updateClose(@PathVariable("id") String id) {
        List<Impediment> impediments = impedimentDao.findAll();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        for(Impediment impediment : impediments ){
	        if (impediment.getId().toString().equals(id)) {
	        	impediment.setClosed(true);
	            impedimentDao.save(impediment);
	            return new ResponseEntity<String>(headers, HttpStatus.OK);
	        }
        }
        return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
    }
    
    
    
   void populateEditForm(Model uiModel, Impediment impediment) {
        uiModel.addAttribute("impediment", impediment);
        addDateTimeFormatPatterns(uiModel);
        uiModel.addAttribute("sprints", sprintDao.findAll());
        uiModel.addAttribute("users", userDao.findAll());
    }
   /*@RequestMapping(produces = "text/html")
   public String list(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, Model uiModel) {
   	if(hasRole(ROLE_ADMIN)){
   		 uiModel.addAttribute("valid", "valid");	
   	}
       uiModel.addAttribute("impediments", impedimentDao.findAll());
       addDateTimeFormatPatterns(uiModel);
       return "impediments/list";
   }*/
   
   @RequestMapping(headers = "Accept=application/json")
   @ResponseBody
   public ResponseEntity<String> listJson() {
       HttpHeaders headers = new HttpHeaders();
       headers.add("Content-Type", "application/json; charset=utf-8");
       List<Impediment> result = impedimentDao.findAll();
       String str = new JSONSerializer().exclude("*.class").transform(new BigDecimalTransformer(),BigInteger.class).serialize(result);
       return new ResponseEntity<String>(str, headers, HttpStatus.OK);
   }
   /*public void addDateTimeFormatPatterns(Model uiModel) {
       uiModel.addAttribute("impediment_submitteddate_date_format", org.joda.time.format.DateTimeFormat.patternForStyle("M-", LocaleContextHolder.getLocale()));
   }*/
   public class BigDecimalTransformer extends AbstractTransformer{ 
	   public void transform(Object object)
	   { 
		   getContext().writeQuoted(((BigInteger)object).toString());
	   }
	}
}
