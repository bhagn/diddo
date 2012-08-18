package com.cisco.diddo.dao;

import com.cisco.diddo.entity.Impediment;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = Impediment.class)
public interface ImpedimentDao {

    List<com.cisco.diddo.entity.Impediment> findAll();
}
