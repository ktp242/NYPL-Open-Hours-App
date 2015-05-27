app.view.renderSlug = {
	
	getSlug: function(){
		var branchSlug = $('.choose-branch option:selected').val();
		var selectedOpt = $('.choose-option:checked').val();
		var inputValue = $('.text-input').val();
		var daySlug;

		$('.slug-result').empty();
		if (branchSlug == "base"){
			$('.slug-result').append("<p><h2>" + "Please select a branch." + "</h2></p>");
		} else {

			switch (selectedOpt){
				case 'a':
					daySlug = parseInt(inputValue, 10) || 0;
					if (daySlug < 0){
						daySlug = 0;
					}

					if (daySlug == 0) {
						$('.slug-result').append("<p><h2>" + "Your application endpoint is <br/>http://" + location.hostname + ":" + location.port + "/" + branchSlug + "</h2></p>");
					} else {
						$('.slug-result').append("<p><h2>" + "Your application endpoint is <br/>http://" + location.hostname + ":" + location.port + "/" + branchSlug + "/" + daySlug + "</h2></p>");
					}
				break;
				
				case 'b':
					daySlug = inputValue.split(" ").join("T");
					$('.slug-result').append("<p><h2>" + "Your application endpoint is <br/>http://" + location.hostname + ":" + location.port + "/" + branchSlug + "/" + daySlug + "</h2></p>");
				break;

				default:
					console.log('no option indicated');
			};
		}	
	}
};