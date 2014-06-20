var fs = require('fs');
var parse = require('csv-parse');
var simple = require('simplify-polyline');

module.exports = {
	simplify: function(loc, epsilon, callback){
		var polyline = getArray(loc, callback);
		var sortedLine = polyLine;
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

getObject = function(record){
	obj = {};
	obj.y= +record.shape_pt_lat;
	obj.x= +record.shape_pt_lon;
	obj.place = record.shape_pt_sequence;
	obj.shapeID = record.shape_id;
	return obj;
}
