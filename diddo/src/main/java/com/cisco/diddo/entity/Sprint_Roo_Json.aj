// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.cisco.diddo.entity;

import com.cisco.diddo.entity.Sprint;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Sprint_Roo_Json {
    
    public String Sprint.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static Sprint Sprint.fromJsonToSprint(String json) {
        return new JSONDeserializer<Sprint>().use(null, Sprint.class).deserialize(json);
    }
    
    public static String Sprint.toJsonArray(Collection<Sprint> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<Sprint> Sprint.fromJsonArrayToSprints(String json) {
        return new JSONDeserializer<List<Sprint>>().use(null, ArrayList.class).use("values", Sprint.class).deserialize(json);
    }
    
}
