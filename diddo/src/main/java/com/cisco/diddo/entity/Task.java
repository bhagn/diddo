package com.cisco.diddo.entity;

import com.cisco.diddo.constants.TASK;
import java.util.Calendar;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
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
public class Task {

    @NotNull
    private String taskNumber;

    @Size(max = 1024)
    private String description;

    @Min(0L)
    private short dots;

    @NotNull
    @Enumerated
    private TASK status;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Calendar startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Calendar endDate;

    @NotNull
    @Value("false")
    private Boolean complex;

    @NotNull
    @Value("false")
    private Boolean unplanned;

    @ManyToOne
    private User owner;

    @ManyToOne
    private UserStory userStory;
}
