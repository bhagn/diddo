// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.cisco.diddo.web;

import com.cisco.diddo.entity.ExitCriteria;
import com.cisco.diddo.web.ExitCriteriaController;
import java.math.BigInteger;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

privileged aspect ExitCriteriaController_Roo_Controller_Json {
    
    @RequestMapping(value = "/{id}", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ExitCriteriaController.showJson(@PathVariable("id") BigInteger id) {
        ExitCriteria exitCriteria = exitCriteraDao.findOne(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (exitCriteria == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(exitCriteria.toJson(), headers, HttpStatus.OK);
    }
    
    @RequestMapping(headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ExitCriteriaController.listJson() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        List<ExitCriteria> result = exitCriteraDao.findAll();
        return new ResponseEntity<String>(ExitCriteria.toJsonArray(result), headers, HttpStatus.OK);
    }
    
   /* @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> ExitCriteriaController.createFromJson(@RequestBody String json) {
        ExitCriteria exitCriteria = ExitCriteria.fromJsonToExitCriteria(json);
        exitCriteraDao.save(exitCriteria);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }
    */
    @RequestMapping(value = "/jsonArray", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> ExitCriteriaController.createFromJsonArray(@RequestBody String json) {
        for (ExitCriteria exitCriteria: ExitCriteria.fromJsonArrayToExitCriterias(json)) {
            exitCriteraDao.save(exitCriteria);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }
    
    @RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> ExitCriteriaController.updateFromJson(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        ExitCriteria exitCriteria = ExitCriteria.fromJsonToExitCriteria(json);
        if (exitCriteraDao.save(exitCriteria) == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/jsonArray", method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> ExitCriteriaController.updateFromJsonArray(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        for (ExitCriteria exitCriteria: ExitCriteria.fromJsonArrayToExitCriterias(json)) {
            if (exitCriteraDao.save(exitCriteria) == null) {
                return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
   /* @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> ExitCriteriaController.deleteFromJson(@PathVariable("id") BigInteger id) {
        ExitCriteria exitCriteria = exitCriteraDao.findOne(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (exitCriteria == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        exitCriteraDao.delete(exitCriteria);
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }*/
    
}
