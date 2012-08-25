package com.cisco.diddo.dao;

import com.cisco.diddo.entity.Sprint;
import com.cisco.diddo.entity.User;
import com.cisco.diddo.entity.UserStory;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = UserStory.class)
public interface UserStoryDao {

    List<com.cisco.diddo.entity.UserStory> findAll();

	List<UserStory> findAllBySprint(Sprint sprint);
}
