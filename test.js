var parse = require('csv-parse');
var fs = require('fs');
var simple = require('./gtfs-shapes-simplify.js');

var array = [];
var getObjects = function (loc){
	var filestream = fs.createReadStream(loc);
	var parser = parse({columns:true});
	parser.on('data',function(record){
		parser.pause();
		array.push(record);
		console.log(record);
		parser.resume();
	});
	filestream.pipe(parser);
}

getObjects('./shapes.txt');
console.log(array);
