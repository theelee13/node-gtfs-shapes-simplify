/*
 *	Undergoing a rework. Instead of working with the shapes file directly (and needing the csv-parser and fs)
 *	we'll now assume an individual shape is passed through with its points in order. 
 */

var simple = require('simplify-polyline');

module.exports = {
	simplify: function(loc, epsilon, callback){
		var finalLine = simple.simplify(sortedLine,epsilon);
	}
}

getArray = function(loc, callback){
	var coordArray = [];
	var filestream = fs.createReadStream(loc);
	var parser = parse({columns:true});
	parser.on('data',function(record){
		parser.pause();
		coordArray.push(getObject(record));
		parser.resume();
	});
	parser.on('error', function(err){
		return callback(err);
	});
	parser.on('end',function(){
		console.log("Loaded all Shapes objects. Beginning algorithm.");
	});
	filestream.pipe(parser);
	return coordArray;
}
