// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.cisco.diddo.entity;

import com.cisco.diddo.entity.Team;

privileged aspect Team_Roo_JavaBean {
    
    public String Team.getName() {
        return this.name;
    }
    
    public void Team.setName(String name) {
        this.name = name;
    }
    
    public String Team.getEmail() {
        return this.email;
    }
    
    public void Team.setEmail(String email) {
        this.email = email;
    }
    
}
