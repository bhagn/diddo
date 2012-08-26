package com.cisco.diddo.entity;

import java.util.Calendar;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoEntity;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooMongoEntity
@RooJson
public class UserStory {

    @NotNull
    private String friendlyID;

    @NotNull
    private String title;

    @Size(max = 1024)
    private String description;

    @NotNull
    @Min(0L)
    private short points;

    @Min(0L)
    private short burntPoints;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Calendar startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Calendar endDate;

    private String color;

    private Boolean spillOver;

    private Boolean unplanned;
    
    private Boolean complex;

    @NotNull
    @ManyToOne
    private Sprint sprint;

    @ManyToOne
    private Team team;
}
