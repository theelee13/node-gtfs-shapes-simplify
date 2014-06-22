var simple = require('simplify-polyline');
var _ = require('underscore');

module.exports = {
	filter: function(documents, epsilon, box){
		var originalLength = documents.length;
		var shortenedDocs = shorten(documents,box);
		console.log(originalLength-shortenedDocs.length+' outside box.');
		var alteredDocs = translate(shortenedDocs);
		var finalDocs = simple.simplify(alteredDocs,epsilon);
		console.log(shortenedDocs.length-finalDocs.length+' eliminated by RDP');
		return finalDocs;
	}
}

var shorten = function (docs, bounds){
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	return _.filter(docs,function(shapesObject){
		var shapeLat = shapesObject.shape_pt_lat;
		if((shapeLat>southWest.lat())&&(shapeLat<northEast.lat())){
			var shapeLon = shapesObject.shape_pt_lon;
			if((shapeLon>southWest.lng())&&(shapeLon<northEast.lng())){
				return true;
			}
		}
	});
}

var translate = function (docs){
	for(var i = 0;i<docs.length;i++){
		docs[i].x=+docs[i].shape_pt_lon;
		docs[i].y=+docs[i].shape_pt_lat;
	}
	return docs;
}
