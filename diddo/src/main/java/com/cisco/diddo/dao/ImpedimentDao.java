package com.cisco.diddo.dao;

import java.util.List;

import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

import com.cisco.diddo.entity.Impediment;
import com.cisco.diddo.entity.Team;

@RooMongoRepository(domainType = Impediment.class)
public interface ImpedimentDao {

    List<com.cisco.diddo.entity.Impediment> findAll();
    
    com.cisco.diddo.entity.Impediment findById(long id);
    
    List<com.cisco.diddo.entity.Impediment> findAllBySubmitterId_Team(Team team);
}
