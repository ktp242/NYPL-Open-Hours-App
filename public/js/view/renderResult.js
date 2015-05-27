// The view model for redering the result page
app.view.renderResult = {
	// The function to call CurrentTime model to get time 
	// related data
	// Get NYPL API data by requesting it from BranchData class
	renderOpenHour: function(){
		CurrentTime.getTime();
		BranchData.getLocData("result");
	},
	
	// Get the slug and parameter from the URL of the page
	// Based on the slug and parameter, call different function of
	// BranchData
	isOpen: function(){
		var pathname = location.pathname;
		var slugs = pathname.split("/");
		var branchSlug;
		var daySlug;
		
		// Analyze the slug and parameter 
		// Throw error if the URL is incorrect
		if (slugs.length > 3) {
			$('.branch-name').empty();
			$('.branch-name').append()
			$('.schedule').empty();
			$('.schedule').append("<h2>You May Have A Wrong URL Endpoint!</h2>");		
		// If the URL has no parameter, render the result based on current time
		} else if (slugs.length == 2){
			branchSlug = slugs[1];
		    daySlug = 0;
		    showResult(BranchData.branchNameHourArray);
		// If the URL has parameter, check what kind of parameter it is
		// Render the result based on the parameter 
		} else if (slugs.length == 3){
			branchSlug = slugs[1];
		    daySlug = slugs[2];
		    if (daySlug.split("-").length > 1){   
			    showTimeResult(BranchData.branchNameHourArray);
			} else {
				if (parseInt(daySlug, 10) || parseInt(daySlug, 10) == 0){	
					showFutureResult(BranchData.branchNameHourArray);
				} else {
					$('.branch-name').empty();
					$('.branch-name').append()
					$('.schedule').empty();
					$('.schedule').append("<h2>You May Have A Wrong URL Endpoint!</h2>");
				}
			}
		}

        // The function for render the open result based on current time
		function showResult(array) {
			// Loop through the array contains data from NYPL API
			for (var i = 0; i < array.length; i++) {
				// Find data of the brach selected 
				// and render the data to the page
				if (branchSlug == array[i].slug){
					$('.schedule').empty();
					$('.schedule').append("<br/><p><h3>The open schedule for today is as below:</h3></p>");
					// Loop through the open hours of the week 
					for (var j = 0; j < array[i].day.length; j++) {
						// Find the open hour of the day which equals to the day today
						if (CurrentTime.dayNow == array[i].day[j].day){
							// Check if it is not open on that day
							if (array[i].day[j].open == null) {
								var open = -1;
								var close = -1;
								$('.schedule').append("<p><h3>" + array[i].day[j].day + " is not open.</h3></p>");
							} else {
								var open = array[i].day[j].open.split(':');
								var close = array[i].day[j].close.split(':');
								var openNum = parseInt(open[0], 10);
								var closeNum = parseInt(close[0], 10);
								// Render open hour of the day
								$('.schedule').append("<h3>" + array[i].day[j].day + ": " + array[i].day[j].open + " - " + array[i].day[j].close + "</h3>");
							}
							// Check if the branch is open at the current of time
							if (CurrentTime.hourNow >= openNum && CurrentTime.hourNow < closeNum) {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch is open now.");
							} else {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch is closed now.");
							}
						}
					}
				}
			};
		};

		// The function renders the result to show 
		// if the branch is open in a number of day later
		function showFutureResult(array) {
			// Get the time info via CurrentTime 
			CurrentTime.getFutureTime(daySlug);
			// Loop through the array contains data from NYPL API
			for (var i = 0; i < array.length; i++) {
				// Find data of the brach selected 
				// and render the data to the page
				if (branchSlug == array[i].slug){
					$('.schedule').empty();
					$('.schedule').append("<br/><p><h3>The open schedule for " + daySlug + " days after is as below:</h3></p>");
					// Loop through the open hours of the week
					for (var j = 0; j < array[i].day.length; j++) {
						// Find the open hour of the day which equals to 
						// the iindicated day 
						if (CurrentTime.dayFuture == array[i].day[j].day){
							
							if (array[i].day[j].open == null) {
								$('.schedule').append("<h3>" + array[i].day[j].day + " is not open.</h3>");
							} else {
								$('.schedule').append("<h3>" + array[i].day[j].day + ": " + array[i].day[j].open + " - " + array[i].day[j].close + "</h3>");
		                    }

							if (array[i].day[j].open == null) {
								var open = -1;
								var close = -1;
							} else {
								var open = array[i].day[j].open.split(':');
								var close = array[i].day[j].close.split(':');

								var openNum = parseInt(open[0], 10);
								var closeNum = parseInt(close[0], 10);
							}
	
							if (CurrentTime.hourNow >= openNum && CurrentTime.hourNow < closeNum) {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch will be open at the same time of now " + daySlug + " days after.");
							} else {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch will be closed at the same time of now " + daySlug + " days after.");
							}
						}
					};
				}	
			};
		};

		// The function renders the result to show 
		// if the branch is open at a specific time indicated 
		// by timestamp
		function showTimeResult(array) {
			// Get the time info via CurrentTime
			CurrentTime.getStampTime(daySlug);
			// Render the time indicated on the page
			var dateInput = CurrentTime.monthInput + "/" + CurrentTime.dateInput + "/" + CurrentTime.yearInput;
			// Loop through the array contains data from NYPL API
			for (var i = 0; i < array.length; i++) {
				// Find data of the brach selected 
				// and render the data to the page
				if (branchSlug == array[i].slug){
					$('.schedule').empty();
					$('.schedule').append("<br/><p><h3>The open schedule for " + dateInput + " is as below:</h3></p>");
					// Loop through the open hours of the week
					for (var j = 0; j < array[i].day.length; j++) {
						// Check the day of the indicated date
						if (CurrentTime.dayInput == array[i].day[j].day){
							if (array[i].day[j].open == null) {
								$('.schedule').append("<h3>" + array[i].day[j].day + " is not open.</h3>");
							} else {
								$('.schedule').append("<h3>" + array[i].day[j].day + ": " + array[i].day[j].open + " - " + array[i].day[j].close + "</h3>");
		                    }

							if (array[i].day[j].open == null) {
								var open = -1;
								var close = -1;
							} else {
								var open = array[i].day[j].open.split(':');
								var close = array[i].day[j].close.split(':');

								var openNum = parseInt(open[0], 10);
								var closeNum = parseInt(close[0], 10);
							}
							// Check if the branch is open at that time 
							// and render the result
							if (CurrentTime.hourInput >= openNum && CurrentTime.hourInput < closeNum) {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch is open at " + dateInput + " " + CurrentTime.timeInput);
							} else {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch is closed at " + dateInput + " " + CurrentTime.timeInput);
							}
						}
					};
				}	
			};
		};
	}
};