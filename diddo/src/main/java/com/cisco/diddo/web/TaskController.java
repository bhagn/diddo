package com.cisco.diddo.web;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.cisco.diddo.constants.TASK;
import com.cisco.diddo.dao.TaskDao;
import com.cisco.diddo.dao.UserDao;
import com.cisco.diddo.dao.UserStoryDao;
import com.cisco.diddo.entity.Task;
import com.cisco.diddo.entity.User;
import com.cisco.diddo.entity.UserStory;

import flexjson.JSONDeserializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/tasks")
@Controller
@RooWebScaffold(path = "tasks", formBackingObject = Task.class)
@RooWebJson(jsonObject = Task.class)
public class TaskController {
	@Autowired
	public TaskDao taskDao;

	@Autowired
	public UserDao userDao;

	@Autowired
	public UserStoryDao userStoryDao;

	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
	public ResponseEntity<String> createFromJson(@RequestBody String json) {
		Task task = fromJsonToTask(json);
		taskDao.save(task);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return new ResponseEntity<String>(task.toJson(), headers,
				HttpStatus.CREATED);
	}

	/*
	 * @RequestMapping(value = "/jsonArray", method = RequestMethod.POST,
	 * headers = "Accept=application/json") public ResponseEntity<String>
	 * createFromJsonArray(@RequestBody String json) { for (Task task:
	 * Task.fromJsonArrayToTasks(json)) { taskDao.save(task); } HttpHeaders
	 * headers = new HttpHeaders(); headers.add("Content-Type",
	 * "application/json"); return new ResponseEntity<String>(headers,
	 * HttpStatus.CREATED); }
	 */
	@RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
	public ResponseEntity<String> updateFromJson(@RequestBody String json) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		Task task = fromJsonToTask(json);
		if (taskDao.save(task) == null) {
			return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String>(task.toJson(), headers, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	public ResponseEntity<String> deleteFromJson(
			@PathVariable("id") String idStr) {
		BigInteger id = new BigInteger(idStr);
		Task task = findById(id);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		if (task == null) {
			return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
		}
		taskDao.delete(task);
		return new ResponseEntity<String>(headers, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", params = "close", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public ResponseEntity<String> markTaskAsDone(
			@PathVariable("id") String idStr) {
		BigInteger id = new BigInteger(idStr);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");

		Task task = findById(id);
		if (task == null) {
			return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
		}

		task.setStatus(TASK.COMPLETED);

		if (taskDao.save(task) == null) {
			return new ResponseEntity<String>(headers,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<String>(headers, HttpStatus.OK);
	}

	private Task findById(BigInteger id) {
		List<Task> tasks = taskDao.findAll();
		for (Task task : tasks) {
			if (task.getId().equals(id)) {
				return task;
			}
		}
		return null;
	}

	private UserStory findUserStoryById(BigInteger id) {
		List<UserStory> userStorys = userStoryDao.findAll();
		for (UserStory userStory : userStorys) {
			if (userStory.getId().equals(id)) {
				return userStory;
			}
		}
		return null;
	}

	private User findUserById(BigInteger id) {
		List<User> users = userDao.findAll();
		for (User user : users) {
			if (user.getId().equals(id)) {
				return user;
			}
		}
		return null;
	}

	private Task fromJsonToTask(String jsonStr) {
		Task task = null;
		Map<String, String> deserialized = new JSONDeserializer<Map<String, String>>()
				.deserialize(jsonStr);
		String id = deserialized.get("id");
		if (id != null && !id.equals("")) {
			task = findById(new BigInteger(id));
		}
		if (task == null) {
			task = new Task();
		}
		task.setTaskNumber(deserialized.get("taskNumber"));
		task.setDescription(deserialized.get("description"));
		TASK status = null;
		String _status = deserialized.get("status");
		if (_status.equals(TASK.IN_PROGRESS.toString())) {
			status = TASK.IN_PROGRESS;
		} else if (_status.equals(TASK.NEW_TASK.toString())) {
			status = TASK.NEW_TASK;
		} else {
			status = TASK.COMPLETED;
		}

		task.setStatus(status);

		String dots = deserialized.get("dots");
		if (dots != null) {
			task.setDots(Byte.valueOf(dots));
		}
		if (deserialized.get("unplanned") != null) {
			Object obj = deserialized.get("unplanned");
			if (obj instanceof ArrayList && ((ArrayList) obj).size() > 0) {
				task.setUnplanned(true);
			}
		}
		if (deserialized.get("complex") != null) {
			Object obj = deserialized.get("complex");
			if (obj instanceof ArrayList && ((ArrayList) obj).size() > 0) {
				task.setComplex(true);
			}
		}
		String Id = deserialized.get("userStory");
		if (Id != null && !Id.equals("")) {
			BigInteger iid = new BigInteger(Id);
			task.setUserStory(findUserStoryById(iid));
		}
		Id = deserialized.get("owner");
		if (Id != null && !Id.equals("")) {
			BigInteger iid = new BigInteger(Id);
			task.setOwner(findUserById(iid));
		}
		String date = deserialized.get("startDate");
		task.setStartDate(getCalendar(date));
		date = deserialized.get("endDate");
		task.setEndDate(getCalendar(date));

		return task;
	}

	private Calendar getCalendar(String dateStr) {
		DateFormat format = new SimpleDateFormat("MM/dd/yyyy");
		try {
			Date date = format.parse(dateStr);
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			return cal;
		} catch (Exception ex) {

		}
		return null;
	}

}
