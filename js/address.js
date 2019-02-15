

var address = {};


address.getCountries = function () {
	var doneLoadingCountries = new $.Deferred();
	$.when(api.commAPI('NonLoginMethods','getCountries',{})).done(function (res) {
		if (res.length == 0) throw "get countries result empty";
		doneLoadingCountries.resolve(res);
	});
	return doneLoadingCountries;
};

address.loadCountriesSelect = function (container) {

	$.when(address.getCountries()).done(function (countries) {
		var options = '<option value="">Select Country</option>';
		countries.forEach(function (country) {
			var selected = '';
			if (country.name === 'United States') selected = 'selected';
			options += '<option value="'+country.name+'" '+selected+'>'+country.name+'</option>';
		});
		container.html("<select class='countries form-control'>"+options+"</select>");
	});

};