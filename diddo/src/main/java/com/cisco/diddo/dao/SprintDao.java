package com.cisco.diddo.dao;

import com.cisco.diddo.entity.Sprint;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = Sprint.class)
public interface SprintDao {

    List<com.cisco.diddo.entity.Sprint> findAll();
    long count();
	Sprint findBySprintNo(String sprintNo);
}
