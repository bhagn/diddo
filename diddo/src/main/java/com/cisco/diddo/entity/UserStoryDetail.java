package com.cisco.diddo.entity;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import flexjson.JSONSerializer;
import flexjson.transformer.AbstractTransformer;

public class UserStoryDetail {
	public String title = "";
	public String description = "";
	public Calendar startDate ;
	public Calendar endDate ;
	public Map<String,Boolean> exitcriterias = new HashMap<String , Boolean>();
	
	public String toJson() {
		return new JSONSerializer().exclude("*.class", "*.locale").transform(new CalendarTransformer(), Calendar.class).serialize(
				this);
	}
	public static class CalendarTransformer extends AbstractTransformer {
		public void transform(Object object) {
			DateFormat format = new SimpleDateFormat("MM/dd/yyyy");
			Date date = ((Calendar) object).getTime();
			getContext().writeQuoted(format.format(date));
		}
	}
	
	
	

}
