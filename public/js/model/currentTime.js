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

CurrentTime.getTime = function(){
	var self = this;
	self.dayNow = moment().format('ddd');
	self.hourNow = moment().format('H');
};


CurrentTime.getFutureTime = function(futureDay){
	var self = this;
	var addDays = moment().add(futureDay, 'days');   
    var futureDayInfo = (addDays._d).toString().split(" ");
    self.dayFuture = futureDayInfo[0];
};

CurrentTime.getStampTime = function(timeStamp){
	var self = this;
	var stampDayInfo = moment(timeStamp)._d.toString().split(" ");
	self.dayInput = stampDayInfo[0];
	self.hourInput = stampDayInfo[4].split(":")[0];

	self.monthInput = stampDayInfo[1];
	self.dateInput = stampDayInfo[2];
	self.yearInput = stampDayInfo[3];
	self.timeInput = stampDayInfo[4];
};