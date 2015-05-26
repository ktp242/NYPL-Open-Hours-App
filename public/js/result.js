isOpen = function(){
	
	// var selectedBranch = $('.choose-branch option:selected').text();
	
	for (var i = 0; i < branchNameHourArray.length; i++) {
		if (urlRq.slug == branchNameHourArray[i].name){
			for (var j = 0; j < branchNameHourArray[i].day.length; j++) {
				if (dayNow == branchNameHourArray[i].day[j].day){
					
					if (branchNameHourArray[i].day[j].open == null) {
						var open = -1;
						var close = -1;
					} else {
						var open = branchNameHourArray[i].day[j].open.split(':');
						var close = branchNameHourArray[i].day[j].close.split(':');

						var openNum = parseInt(open);
						var closeNum = parseInt(close);

						console.log(openNum + " , " + closeNum);
					}


					
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
	urlGenerator = new UrlGenerator(selectedBranch);
	urlGenerator.generateUrl();
};

// API get the current URL
var UrlRequest = function(){
	this.slug;	
};

UrlRequest.prototype = {
	getSlug: function(){
		var href = location.href;
		slug = href.replace('http://localhost:8080/','').split("/");
		console.log(slug[0]);
	} 
};

// View
$(document).ready(function(){	
	var urlRq = new UrlRequest();
	urlRq.getSlug();

	// chooseBranch.change(isOpen);
	isOpen();
});
