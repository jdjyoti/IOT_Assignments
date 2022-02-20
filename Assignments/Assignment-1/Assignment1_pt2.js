//assignment1-part2

var column = [];
var array_set = [];


	function edit_data(data){
		
	data.forEach(item=> {
		array_set.push(JSON.parse(item));
		});
	for (var i = 0; i < array_set.length; i++) {
		for ( var key in array_set[i]) {
			var init_key = key
			key = key.toUpperCase().trim().replace(/\s+/g, " ");
			if (column.indexOf(key) === -1) {
				column.push(key);
			}
			array_set[i][key] = array_set[i][init_key]
			delete array_set[i][init_key]
		}
	}
	
	return [array_set,column]
}

	function format_table(value, val){
	
	var csv = column + '\n'
	for (var i = 0; i < array_set.length; i++) {
		var line = '';
		for (var j = 0; j < column.length; j++) {
			if (array_set[i][column[j]] !== undefined) {
				if (line != '')
					line += ','
				line += array_set[i][column[j]]
			} else {
				line += ','
			}

		}
		csv += line + '\r\n';
	}
	return csv
}


	function JSON_CSV(data) {
		var {rows , header } = edit_data(data)
		var table = format_table(rows , header)
		console.log(table)
	}

console.log("Assignment1-part2");
JSON_CSV(['{" air quality":"yellow","temperature":10," sea conditions ":3,"city":"Genova"}','{"city":"Milano","air  quality":"red","temperature ":10}'])
