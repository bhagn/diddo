package com.cisco.diddo.dao;

import com.cisco.diddo.entity.ScrumMaster;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = ScrumMaster.class)
public interface ScrumMasterDao {

    List<com.cisco.diddo.entity.ScrumMaster> findAll();
}
