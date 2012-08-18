package com.cisco.diddo.dao;

import com.cisco.diddo.entity.Task;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = Task.class)
public interface TaskDao {

    List<com.cisco.diddo.entity.Task> findAll();
}
