// Controller

// This is the function to get, arrange, and save data from the end point. 
var branchViewRender = function(){
	// API end point
	var endPoint = "http://locations.api.nypl.org/api/v0.7.1/locations/";
	
	// The array for the arranged data
	var branchNameHourArray = [];
	
	// The function to manipulate data from the end point 
	var getBranchHours = function(data){
		
		var branchNames = [];
		
		// Get the names and regular hour array of the branches
		for (var i = 0; i < data.locations.length; i++){
			
			var branchName = data.locations[i].name;
			var locHours = data.locations[i].hours['regular'];
			
			// Create a new object to store branch name and open hour
			var branchNameHour = {};
			
			// Create a new object for the open hour of different day
			branchNameHour["day"] = [];
			
			// Check if the data exist
			if(branchName) {
				branchNames.push(branchName);
				branchNameHour["id"] = i;
				branchNameHour["name"] = branchName;	
				// Push the branchNameHour object into the array
				branchNameHourArray.push(branchNameHour);
			};

			// Get the hours of each day from regular hour array
			for (var j = 0; j < locHours.length; j++){
				var day = locHours[j].day;
				var close = locHours[j].close;
				var open = locHours[j].open;

				dayHours = {};
				dayHours["day"] = day;
				dayHours["open"] = open;
				dayHours["close"] = close;
				branchNameHour["day"].push(dayHours);	
			}
		};

		// console.log(bigArray);
	
		RenderLocDropdown(branchNames);
	};

	var locApiRq = new LocApiRequest(endPoint);
	locApiRq.getLocData(getBranchHours);

	var timeRequest = new TimeRequest();
	var dayNow = timeRequest.getDay();
	var hourNow = parseInt(timeRequest.getHour());

	var RenderLocDropdown = function(array){
		var chooseBranch = $('.choose-branch');
		for (var i = 0; i < array.length; i++) {
		    chooseBranch.append("<option>" + array[i] + "</option>");
		};
	};

	var isOpen = function(){
		var selectedText = $('.choose-branch option:selected').text();
		for (var i = 0; i < branchNameHourArray.length; i++) {
			
			if (selectedText == branchNameHourArray[i].name){
				for (var j = 0; j < branchNameHourArray[i].day.length; j++) {
					if (dayNow == branchNameHourArray[i].day[j].day){
						
						if (branchNameHourArray[i].day[j].open == null) {
							var open = -1;
							var close = -1;
						} else {
							var open = branchNameHourArray[i].day[j].open.split(':');
							var close = branchNameHourArray[i].day[j].open.split(':');

							var openNum = parseInt(open[0]);
							var closeNum = parseInt(close[0]);
						};
						
						if (hourNow > openNum && hourNow < closeNum) {
							console.log(branchNameHourArray[i].name + " is open now.");
						} else {
							console.log(branchNameHourArray[i].name + " is close now.");
						}


						// console.log("today is " + bigArray[i].day[j].day + " at " + bigArray[i].name);
					}
								
					if (branchNameHourArray[i].day[j].open == null) {

						console.log("The hours of " + branchNameHourArray[i].name + " on " + branchNameHourArray[i].day[j].day + 
						" is not open ");
					} else {

						console.log("The hours of " + branchNameHourArray[i].name + " on " + branchNameHourArray[i].day[j].day + 
						" is open at " + branchNameHourArray[i].day[j].open + " close at " + branchNameHourArray[i].day[j].close);
					}
				}
			}
		}
	};

	$('.choose-branch').change(isOpen);
};


// API to get branches locations data
var LocApiRequest = function(endPoint){
	this.endPoint = endPoint;	
};

LocApiRequest.prototype = {
	getLocData: function(callback){
		var callback = callback;
		var self = this;

		$.ajax({
		    url: self.endPoint, 
		    type: 'GET', 
		    data: {}, 
		    datatype: 'json',
		    success: callback,
		    error: function(err) { alert(err); }
		});
	}
};


// API to get time

var TimeRequest = function(){
	this.dayNow;
	this.hourNow;
};

TimeRequest.prototype = {
	getDay: function(){
		dayNow = moment().format('ddd');
		return dayNow;
	},
	getHour: function(){
		hourNow = moment().format('H');
		return hourNow;
	}
};

// Model
var Instance = function(dataIndex){
	this.property = dataIndex;
};


// View
$(document).ready(function(){
	branchViewRender();
});