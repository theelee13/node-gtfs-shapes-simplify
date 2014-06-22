var parse = require('csv-parse');
var fs = require('fs');
var simple = require('./gtfs-shapes-simplify.js');

var getObjects = function (loc){
	var filestream = fs.createReadStream(loc);
	var parser = parse({columns:true});
	var array = [];
	parser.on('data',function(record){
		parser.pause();
		array.push(record);
		parser.resume();
	});
	parser.on('end',function(){
		testFunction(array);
	});
	filestream.pipe(parser);
}

var testFunction = function (arr){
	var LatLngSW = {
		lat: function (){
			return 34.0;
		},
		lng: function (){
			return -84.33;
		}
	}
	var LatLngNE = {
		lat: function (){
			return 34.073;
		},
		lng: function (){
			return -84.26;
		}
	}
	var fakeBoundsObject = {
		getNorthEast: function (){
			return LatLngNE;	  
		},
		getSouthWest: function (){
			return LatLngSW;				  
		}
	}
	var array2 = simple.filter(arr,.001,fakeBoundsObject);
	array2.forEach(function(doc){
		console.log(doc);
	});
}

getObjects('./shapes.txt');
