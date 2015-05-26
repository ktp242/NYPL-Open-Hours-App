var chooseBranch = $('.choose-branch');
var isOpen; 

// Controller

// This is the function to get, arrange, and save data from the endpoint. 
var branchViewRender = function(){
	// API endpoint
	var endpoint = "http://locations.api.nypl.org/api/v0.7.1/locations/";
	
	// The array for the arranged data
	var branchNameHourArray = [];

	// The function to manipulate data from the endpoint 
	var getBranchHours = function(data){
		
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
			};
		};

		renderDropDown(branchNameHourArray, chooseBranch );
	};

	var locApiRq = new LocApiRequest(endpoint);
	locApiRq.getLocData(getBranchHours);

	var timeRequest = new TimeRequest();
	var dayNow = timeRequest.getDay();
	var hourNow = parseInt(timeRequest.getHour());

    // Render the drop down menu of the branches
	var renderDropDown = function(array, element){		
		for (var i = 0; i < array.length; i++) {
		    element.append("<option>" + array[i].name + "</option>");
		};
	};
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
// Generate a clean URL
var UrlGenerator = function(slug){
	this.slug = slug;
	this.appEndpoint = "result.html/";
	this.cleanUrl;
};

UrlGenerator.prototype = {
	generateUrl: function(){
		var self = this;
		self.slug = self.slug.replace(/\s/g, "-");
		cleanUrl = self.appEndpoint + self.slug.toLowerCase();
		// console.log(cleanUrl);
	}
}


var Instance = function(dataIndex){
	this.property = dataIndex;
};


// View
$(document).ready(function(){	
	// Execute the view render
	branchViewRender();
	var urlRq = new UrlRequest();
	urlRq.getSlug();

	// chooseBranch.change(isOpen);
	isOpen();
});