package com.cisco.diddo.businesslogic;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Test {

	 private Date getScheduleStartDate() {
	    	try{
		    	DateFormat format = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss");
                return format.parse("08/21/2012 5:52:00");
	    	}catch(ParseException ex ){
	    		
	    	}
	    	return new Date();
	    }
	 public static void main(String[] args) {
			new Test().getScheduleStartDate();
		}
}
