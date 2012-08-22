package com.cisco.diddo.dao;

import java.util.List;

import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

import com.cisco.diddo.entity.Impediment;

@RooMongoRepository(domainType = Impediment.class)
public interface ImpedimentDao {

    List<com.cisco.diddo.entity.Impediment> findAll();
}
