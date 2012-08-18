package com.cisco.diddo.dao;

import com.cisco.diddo.entity.Team;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = Team.class)
public interface TeamDao {

    List<com.cisco.diddo.entity.Team> findAll();
}
