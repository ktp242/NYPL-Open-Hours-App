// The model for requesting and manipulating the data from NYPL API
BranchData = function(){
	this.currentPage;
};

// The array for storing the data after we rearrange it from NYPL API
BranchData.branchNameHourArray = [];

// Get the data from NYPL API
BranchData.getLocData = function(currentPage){
	self = this;
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

// The callback function to rearrange the data 
// once we successfully request NYPL API
BranchData.getBranchHours = function(data){

	// Get the name, regular hour, and slug of the branches
	for (i = 0; i < data.locations.length; i++){

		branchName = data.locations[i].name;
		locHours = data.locations[i].hours['regular'];
		slug = data.locations[i].slug;
		
		// Create a new object to store branch name and open hour
		branchNameHour = {};
		
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
		for (j = 0; j < locHours.length; j++){
			day = locHours[j].day;
			close = locHours[j].close;
			open = locHours[j].open;

			dayHours = {};
			dayHours["day"] = day;
			dayHours["open"] = open;
			dayHours["close"] = close;
			branchNameHour["day"].push(dayHours);	
		};
	};

   // Check which page the calling view render is on.
   // And then call different function of the view render 
   // after requesting data from NYPL API is done 
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