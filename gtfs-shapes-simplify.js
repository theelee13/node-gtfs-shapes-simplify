/*
 *	Undergoing a rework. Instead of working with the shapes file directly (and needing the csv-parser and fs)
 *	we'll now assume an individual shape is passed through with its points in order. 
 */

var simple = require('simplify-polyline');

module.exports = {
	simplify: function(documents, epsilon, box){
		var shortenedDocs = shorten(documents,box);
		var alteredDocs = translate(shortenedDocs);	
		var finalLine = simple.simplify(alteredDocs,epsilon);
	}
}

//getting syntax error here. TODO fix.
var shorten = function (docs, bounds){
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	return _.filter(docs,function(shapesObject){
		var shapeLat = shapesObject.shape_pt_lat;
		if((shapeLat>southWest.lat())&&(shapeLat<northEast.lat())){
			var shapeLon = shapesObject.shape_pt_lon;
			if((shapeLon>southWest.lon())&&(shapeLon<northEast.lon())){
				return true;
			}
		}
	}
}

var translate = function (docs){
	for(var i = 0;i<docs.length;i++){
		docs[i].x=docs[i].shape_pt_lon;
		docs[i].y=docs[i].shape_pt_lat;
	}
	return docs;
}


//test for translate.
var arbitraryArray = [
	{shape_pt_lon: -34,shape_pt_lat: 80},
	{shape_pt_lon: -33,shape_pt_lat: 82}
];
var translated = translate(arbitraryArray);
translated.forEach(function(obj){
	console.log(obj.x+' '+obj.y);
});

