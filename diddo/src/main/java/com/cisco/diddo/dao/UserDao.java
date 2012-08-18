package com.cisco.diddo.dao;

import com.cisco.diddo.entity.User;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = User.class)
public interface UserDao {

    List<com.cisco.diddo.entity.User> findAll();
}
