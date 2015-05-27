app.view.renderSlug = {
	
	getSlug: function(){
		var branchSlug = $('.choose-branch option:selected').val();
		var daySlug = $('.choose-day').val();
		var daySlugNum;

		daySlugNum = parseInt(daySlug, 10) || 0;
		
		if (daySlugNum < 0){
			daySlugNum = 0;
		}

		$('.slug-result').empty();
		
		if (branchSlug == "base"){
			$('.slug-result').append("<p><h2>" + "Please select a branch." + "</h2></p>");
		} else {
			if (daySlugNum == 0) {
				$('.slug-result').append("<p><h2>" + "Your application endpoint is <br/>http://" + location.hostname + ":" + location.port + "/" + branchSlug + "</h2></p>");
			} else {
				$('.slug-result').append("<p><h2>" + "Your application endpoint is <br/>http://" + location.hostname + ":" + location.port + "/" + branchSlug + "/" + daySlugNum + "</h2></p>");
			}
		}
	},
};