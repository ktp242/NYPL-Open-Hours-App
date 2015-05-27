// The view render for index.html
app.view.renderIndex = {
	// Ask BranchData to get data from NYPL  API
	getLocData: function(){
		// Indicate the view render's identification
		BranchData.getLocData("index");
	},

	// Render the dropdown menu
	renderDropdown: function(){
		for (var i = 0; i < BranchData.branchNameHourArray.length; i++) {
		    $('.choose-branch').append("<option value=" + BranchData.branchNameHourArray[i].slug + ">" + BranchData.branchNameHourArray[i].name + "</option>");
		};
	}
};