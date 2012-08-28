package com.cisco.diddo.dao;

import com.cisco.diddo.entity.ExitCriteria;
import com.cisco.diddo.entity.UserStory;

import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = ExitCriteria.class)
public interface ExitCriteraDao {

    List<com.cisco.diddo.entity.ExitCriteria> findAll();
    List<com.cisco.diddo.entity.ExitCriteria> findAllByUserStory(UserStory userStory);
}
