BranchData = function(){
	this.currentPage;
};

BranchData.branchNameHourArray = [];

BranchData.getLocData = function(currentPage){
	var self = this;
	self.currentPage = currentPage;

	// API to get branches locations data
	$.ajax({
	    url: "http://locations.api.nypl.org/api/v0.7.1/locations/", 
	    type: 'GET', 
	    data: {}, 
	    datatype: 'json',
	    success: BranchData.getBranchHours,
	    error: function(err) { console.log(err); }
	});
};

BranchData.getBranchHours = function(data){

	// Get the names and regular hour array of the branches
	for (var i = 0; i < data.locations.length; i++){

		var branchName = data.locations[i].name;
		var locHours = data.locations[i].hours['regular'];
		var slug = data.locations[i].slug;
		
		// Create a new object to store branch name and open hour
		var branchNameHour = {};
		
		// Create a new object for the open hour of different day
		branchNameHour["day"] = [];

		// Check if the data exist
		try{
			if(branchName){
				branchNameHour["id"] = i;
				branchNameHour["name"] = branchName;
				branchNameHour["slug"] = slug;	
				// Push the branchNameHour object into the array
				BranchData.branchNameHourArray.push(branchNameHour);
			}
			} catch (e) {
				console.log("Error when reading from NYPL Locations API\n" + e);
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

	if (BranchData.branchNameHourArray){
		switch (BranchData.currentPage){
			case 'index':
				app.view.renderIndex.renderDropdown();
			break;
			case 'result':
				app.view.renderResult.isOpen();
			break;
			default:
			    console.log('no page name passed');
		};
	};
};