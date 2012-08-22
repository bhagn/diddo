package com.cisco.diddo.businesslogic;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

import com.cisco.diddo.dao.ImpedimentDao;
import com.cisco.diddo.dao.SprintDao;
import com.cisco.diddo.dao.TeamDao;
import com.cisco.diddo.dao.UserDao;
import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;

public class ImpedimentScheduler {
	@Autowired
	public ImpedimentDao impedimentDao;
    
    @Autowired
    public SprintDao sprintDao;
    
    @Autowired
    public UserDao userDao;
    
    @Autowired
    public TeamDao teamDao;
    
    private long dateIntervalInSecs = 1000*60*60*24l;
    
    public void init(){
    	Timer timer = new Timer();
    	timer.scheduleAtFixedRate(new SendMail(), getScheduleStartDate(), dateIntervalInSecs);
    }
    private Date getScheduleStartDate() {
    	try{
	    	DateFormat format = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss");
            return format.parse("08/21/2012 10:00:00");
    	}catch(ParseException ex ){
    		
    	}
    	return new Date();
    }
    private class SendMail extends TimerTask{
    	
		@Override
		public void run() {
			sendMail();
		}
		
		private void sendMail(){
			JavaMailSenderImpl emailSender = new JavaMailSenderImpl();
	        emailSender.setHost("xchcasha.cisco.com");
	        MimeMessagePreparator preparator = new MimeMessagePreparator() {
	            public void prepare(javax.mail.internet.MimeMessage mimeMessage) throws MessagingException {

	            	try {
	            	// Offers support for HTML text content
	                MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
	                message.setFrom("");
	                message.setTo("");
	                message.setSubject("");
	                message.setText("", true);
	            	}catch(Exception ex){}
	            }
		  };
		}
    }
}
