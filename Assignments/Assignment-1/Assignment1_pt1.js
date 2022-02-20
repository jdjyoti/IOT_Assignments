'use strict'
// PART1
function stringify(value) {
    function replacer(k, value){
        if (Array.isArray(value)){
            var obj = [];
			var keyList = Object.getOwnPropertyNames(value);
			for (let i = 0; i < keyList.length; i++) {
				obj[keyList[i].toUpperCase()] = value[keyList[i]];
			}
			return obj;           

        }
        else if (value && typeof value === 'object') {
            var obj = {};
			var keyList = Object.getOwnPropertyNames(value);
			for (let i = 0; i < keyList.length; i++) {
				obj[keyList[i].toUpperCase()] = value[keyList[i]];
			}
			return obj;
        }
        if (typeof value === 'function') return value
        return value
    }
    return JSON.stringify(value, replacer)
}

console.log("Assignment1-part1:\n"+stringify([{city:'Milano',air_quality:'red',temperature:10},
	{air_quality:'yellow','temperature':20,'sea_conditions':3,city:'Genova'}]));



// PART2
