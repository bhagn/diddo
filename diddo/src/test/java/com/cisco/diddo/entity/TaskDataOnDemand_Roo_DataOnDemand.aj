// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.cisco.diddo.entity;

import com.cisco.diddo.constants.TASK;
import com.cisco.diddo.dao.TaskDao;
import com.cisco.diddo.entity.Task;
import com.cisco.diddo.entity.TaskDataOnDemand;
import com.cisco.diddo.entity.UserDataOnDemand;
import com.cisco.diddo.entity.UserStoryDataOnDemand;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect TaskDataOnDemand_Roo_DataOnDemand {
    
    declare @type: TaskDataOnDemand: @Component;
    
    private Random TaskDataOnDemand.rnd = new SecureRandom();
    
    private List<Task> TaskDataOnDemand.data;
    
    @Autowired
    private UserDataOnDemand TaskDataOnDemand.userDataOnDemand;
    
    @Autowired
    private UserStoryDataOnDemand TaskDataOnDemand.userStoryDataOnDemand;
    
    @Autowired
    TaskDao TaskDataOnDemand.taskDao;
    
    public Task TaskDataOnDemand.getNewTransientTask(int index) {
        Task obj = new Task();
        setComplex(obj, index);
        setDescription(obj, index);
        setDots(obj, index);
        setEndDate(obj, index);
        setStartDate(obj, index);
        setStatus(obj, index);
        setTaskNumber(obj, index);
        setUnplanned(obj, index);
        return obj;
    }
    
    public void TaskDataOnDemand.setComplex(Task obj, int index) {
        Boolean complex = Boolean.TRUE;
        obj.setComplex(complex);
    }
    
    public void TaskDataOnDemand.setDescription(Task obj, int index) {
        String description = "description_" + index;
        if (description.length() > 1024) {
            description = description.substring(0, 1024);
        }
        obj.setDescription(description);
    }
    
    public void TaskDataOnDemand.setDots(Task obj, int index) {
        short dots = new Integer(index).shortValue();
        if (dots < 0) {
            dots = 0;
        }
        obj.setDots(dots);
    }
    
    public void TaskDataOnDemand.setEndDate(Task obj, int index) {
        Calendar endDate = Calendar.getInstance();
        obj.setEndDate(endDate);
    }
    
    public void TaskDataOnDemand.setStartDate(Task obj, int index) {
        Calendar startDate = Calendar.getInstance();
        obj.setStartDate(startDate);
    }
    
    public void TaskDataOnDemand.setStatus(Task obj, int index) {
        TASK status = TASK.class.getEnumConstants()[0];
        obj.setStatus(status);
    }
    
    public void TaskDataOnDemand.setTaskNumber(Task obj, int index) {
        String taskNumber = "taskNumber_" + index;
        obj.setTaskNumber(taskNumber);
    }
    
    public void TaskDataOnDemand.setUnplanned(Task obj, int index) {
        Boolean unplanned = Boolean.TRUE;
        obj.setUnplanned(unplanned);
    }
    
    public Task TaskDataOnDemand.getSpecificTask(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Task obj = data.get(index);
        BigInteger id = obj.getId();
        return taskDao.findOne(id);
    }
    
    public Task TaskDataOnDemand.getRandomTask() {
        init();
        Task obj = data.get(rnd.nextInt(data.size()));
        BigInteger id = obj.getId();
        return taskDao.findOne(id);
    }
    
    public boolean TaskDataOnDemand.modifyTask(Task obj) {
        return false;
    }
    
    public void TaskDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = taskDao.findAll(new org.springframework.data.domain.PageRequest(from / to, to)).getContent();
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Task' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Task>();
        for (int i = 0; i < 10; i++) {
            Task obj = getNewTransientTask(i);
            try {
                taskDao.save(obj);
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            data.add(obj);
        }
    }
    
}
