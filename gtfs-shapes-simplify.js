var simple = require('simplify-polyline');

module.exports = {
	simplify: function(documents, epsilon, box){
		var shortenedDocs = shorten(documents,box);
		var alteredDocs = translate(shortenedDocs);	
		var finalLine = simple.simplify(alteredDocs,epsilon);
	}
}

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
	});
}

var translate = function (docs){
	for(var i = 0;i<docs.length;i++){
		docs[i].x=docs[i].shape_pt_lon;
		docs[i].y=docs[i].shape_pt_lat;
	}
	return docs;
}
