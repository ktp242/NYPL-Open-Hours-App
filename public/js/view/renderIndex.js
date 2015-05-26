app.view.renderIndex = {

	getLocData: function(){
		// Query model to get branch data
		BranchData.getLocData("index");
	},

	renderDropdown: function(){
		// console.log(BranchData.branchNameHourArray);
		for (var i = 0; i < BranchData.branchNameHourArray.length; i++) {
		    $('.choose-branch').append("<option value=" + BranchData.branchNameHourArray[i].slug + ">" + BranchData.branchNameHourArray[i].name + "</option>");
		};
	}
};