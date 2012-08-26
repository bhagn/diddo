package com.cisco.diddo.dao;

import com.cisco.diddo.entity.Team;

import java.math.BigInteger;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = Team.class)
public interface TeamDao {

    List<com.cisco.diddo.entity.Team> findAll();
    Team findByName(String name);
    Team findOneById(BigInteger id);
    
}
