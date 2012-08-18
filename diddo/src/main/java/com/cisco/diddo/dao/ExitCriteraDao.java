package com.cisco.diddo.dao;

import com.cisco.diddo.entity.ExitCriteria;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = ExitCriteria.class)
public interface ExitCriteraDao {

    List<com.cisco.diddo.entity.ExitCriteria> findAll();
}
