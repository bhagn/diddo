// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.cisco.diddo.entity;

import com.cisco.diddo.entity.ExitCriteria;
import com.cisco.diddo.entity.UserStory;

privileged aspect ExitCriteria_Roo_JavaBean {
    
    public UserStory ExitCriteria.getUserStory() {
        return this.userStory;
    }
    
    public void ExitCriteria.setUserStory(UserStory userStory) {
        this.userStory = userStory;
    }
    
    public String ExitCriteria.getDescription() {
        return this.description;
    }
    
    public void ExitCriteria.setDescription(String description) {
        this.description = description;
    }
    
    public boolean ExitCriteria.getDone() {
        return this.done;
    }
    
    public void ExitCriteria.setDone(boolean done) {
        this.done = done;
    }
    
}
