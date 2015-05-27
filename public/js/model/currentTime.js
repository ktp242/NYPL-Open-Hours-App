// The class to get current time or manipulate time
CurrentTime = function(){
	this.dayNow;
	this.hourNow;
	
	this.dayFuture;
	
	this.dayInput;
	this.hourInput;
	this.monthInput;
	this.dateInput;
	this.yearInput;
	this.timeInput;
};

// Get current time, and get the day and hour of the accessed time
CurrentTime.getTime = function(){
	var self = this;
	self.dayNow = moment().format('ddd');
	self.hourNow = moment().format('H');
};

// Get the day of a number of days later from today
CurrentTime.getFutureTime = function(futureDay){
	var self = this;
	var addDays = moment().add(futureDay, 'days');   
    var futureDayInfo = (addDays._d).toString().split(" ");
    self.dayFuture = futureDayInfo[0];
};

// Get the day, date, time, and other info from the timestamp
CurrentTime.getStampTime = function(timestamp){
	var self = this;
	var stampDayInfo = moment(timestamp)._d.toString().split(" ");
	self.dayInput = stampDayInfo[0];
	self.hourInput = stampDayInfo[4].split(":")[0];

	self.monthInput = stampDayInfo[1];
	self.dateInput = stampDayInfo[2];
	self.yearInput = stampDayInfo[3];
	self.timeInput = stampDayInfo[4];
};