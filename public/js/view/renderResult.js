app.view.renderResult = {

	renderOpenHour: function(){

		CurrentTime.getTime();
		BranchData.getLocData("result");

	},

	isOpen: function(){

		var pathname = location.pathname;
		var slugs = pathname.split("/");
		var branchSlug;
		var daySlug;

		if (slugs.length > 3) {
			$('.branch-name').empty();
			$('.branch-name').append()
			$('.schedule').empty();
			$('.schedule').append("<h2>You May Have A Wrong URL Endpoint!</h2>");
		
		} else if (slugs.length == 2){
			branchSlug = slugs[1];
		    daySlug = 0;
		    showResult(BranchData.branchNameHourArray);
		
		} else if (slugs.length == 3){
			branchSlug = slugs[1];
		    daySlug = slugs[2];
		    if (daySlug.split("-").length > 1){   
			    showTimeResult(BranchData.branchNameHourArray);
			} else {
				if (parseInt(daySlug, 10)){	
					showFutureResult(BranchData.branchNameHourArray);
				} else {
					$('.branch-name').empty();
					$('.branch-name').append()
					$('.schedule').empty();
					$('.schedule').append("<h2>You May Have A Wrong URL Endpoint!</h2>");
				}
			}
		}


		function showResult(array) {
			for (var i = 0; i < array.length; i++) {
				
				if (branchSlug == array[i].slug){

					$('.schedule').empty();
					$('.schedule').append("<br/><p><h3>The open schedule for today is as below:</h3></p>");

					for (var j = 0; j < array[i].day.length; j++) {

						if (CurrentTime.dayNow == array[i].day[j].day){
							
							if (array[i].day[j].open == null) {
								var open = -1;
								var close = -1;

								$('.schedule').append("<p><h3>" + array[i].day[j].day + " is not open.</h3></p>");
            
							} else {
								var open = array[i].day[j].open.split(':');
								var close = array[i].day[j].close.split(':');

								var openNum = parseInt(open[0]);
								var closeNum = parseInt(close[0]);

								$('.schedule').append("<p><h3>" + array[i].day[j].day + ": " + array[i].day[j].open + " - " + array[i].day[j].close + "</h3></p>");
							}
							
							if (CurrentTime.hourNow >= openNum && CurrentTime.hourNow < closeNum) {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch is open now.");
							} else {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch is close now.");
							}
						}
					}
				}
			}
		};

		function showFutureResult(array) {

			CurrentTime.getFutureTime(daySlug);

			for (var i = 0; i < array.length; i++) {
				if (branchSlug == array[i].slug){
					$('.schedule').empty();
					$('.schedule').append("<br/><p><h3>The open schedule for the day " + daySlug + " days from now is as below:</h3></p>");
					
					for (var j = 0; j < array[i].day.length; j++) {
						if (CurrentTime.dayFuture == array[i].day[j].day){

							if (array[i].day[j].open == null) {
								$('.schedule').append("<p><h3>" + array[i].day[j].day + " is not open.</h3></p>");
							} else {
								$('.schedule').append("<p><h3>" + array[i].day[j].day + ": " + array[i].day[j].open + " - " + array[i].day[j].close + "</h3></p>");
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
								$('.open-close').append("This branch will be open in " + daySlug + " days from now.");
							} else {
								$('.branch-name').empty();
								$('.branch-name').append(array[i].name);
								$('.open-close').append("This branch will be closed in " + daySlug + " days from now.");
							}
						}
					};
				}	
			};
		};

		function showTimeResult(array) {

			CurrentTime.getStampTime(daySlug);
			var dateInput = CurrentTime.monthInput + "/" + CurrentTime.dateInput + "/" + CurrentTime.yearInput;

			for (var i = 0; i < array.length; i++) {
				if (branchSlug == array[i].slug){
					$('.schedule').empty();
					$('.schedule').append("<br/><p><h3>The open schedule for " + dateInput + " is as below:</h3></p>");
					
					for (var j = 0; j < array[i].day.length; j++) {
						if (CurrentTime.dayInput == array[i].day[j].day){

							if (array[i].day[j].open == null) {
								$('.schedule').append("<p><h3>" + array[i].day[j].day + " is not open.</h3></p>");
							} else {
								$('.schedule').append("<p><h3>" + array[i].day[j].day + ": " + array[i].day[j].open + " - " + array[i].day[j].close + "</h3></p>");
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