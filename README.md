node-gtfs-shapes-simplify
=========================

Using my polyline-simplify module, perform the Ramer-Douglas-Peucker algorithm on a shapes.txt gtfs file returning a file of similar structure.

Usage
===
````
var simple = require('gtfs-shapes-simplify');
var newDocs = simple.simplify(documents,epsilon,context);
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
  the object returned from a Maps API `getBounds()` call, a LatLngBounds() object. This allows for the processing of only necessary shapes points.

Concept
===
The goal of this module is to simplify the shapes collection in a database, providing a smaller collection for one to deal with. The original idea was to do this before uploading the shapes collection to the database, lessening the overall size. 

Instead, the module works dynamically, accepting an array of documents and returning an array of fewer documents, depending on the size of the map used (bounding-box) and the accuracy requested (epsilon value).
