package com.cisco.diddo.entity;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoEntity;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooMongoEntity
@RooJson
public class User {

    @NotNull
    @Column(unique = true)
    public String username;

    @NotNull
    public String email;

    @ManyToOne
    public Team team;

    @NotNull
    public boolean scrumMaster;

    @NotNull
    @Size(min = 6, max = 20)
    public String password;
}
