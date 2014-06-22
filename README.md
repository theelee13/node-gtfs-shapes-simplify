node-gtfs-shapes-simplify
=========================

Using my polyline-simplify module, perform the Ramer-Douglas-Peucker algorithm on a shapes.txt gtfs file returning a file of similar structure.

Usage
===
````
var simple = require('gtfs-shapes-simplify');
var newDocs = simple.filter(documents,epsilon,context);
newDocs.forEach(function(document){
  console.log(document);
});
````
The three parameters are:

documents:
  an array of shapes documents. In Mongo, the call would resemble `Shapes.find().fetch()`

epsilon:
  a value, representing a distance, which all points are compared to in the algorithm. The larger the epsilon, the fewer points accepted. A sufficiently large epsilon will only return two points, the first and last.

context:
  the object returned from a Maps API `getBounds()` call, a LatLngBounds object. This allows for the processing of only necessary shapes points.

Concept
===
The goal of this module is to simplify the shapes collection in a database, providing a smaller collection for one to deal with. The original idea was to do this before uploading the shapes collection to the database, lessening the overall size. 

Instead, the module works dynamically, accepting an array of documents and returning an array of fewer documents, depending on the size of the map used (bounding-box) and the accuracy requested (epsilon value).

Results
===
The following is the output from the test run of `node test.js`
````
60 outside box.
47 eliminated by RDP
{	shape_id: '86179',
	shape_pt_lat: '34.06895',
   shape_pt_lon: '-84.26064',
	shape_pt_sequence: '26',
	x: -84.26064,
	y: 34.06895 }

<8 more documents edited out for brevity>

{	shape_id: '86179',
	shape_pt_lat: '34.0154',
	shape_pt_lon: '-84.329099',
	shape_pt_sequence: '82',
	x: -84.329099,
	y: 34.0154 }
````

In the test example case, using an epsilon of .001 and a bounding box that eliminates 60 documents, we effectively bring the polyline from 117 points to just 10.
