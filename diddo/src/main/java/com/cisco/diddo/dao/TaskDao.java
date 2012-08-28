package com.cisco.diddo.dao;

import com.cisco.diddo.entity.Task;
import com.cisco.diddo.entity.UserStory;

import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = Task.class)
public interface TaskDao {

    List<com.cisco.diddo.entity.Task> findAll();
    
    List<com.cisco.diddo.entity.Task> findAllByUserStory(UserStory userStory);
}
