CurrentTime = function(){
	this.dayNow;
	this.hourNow;
	this.dayFuture;
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