node-gtfs-shapes-simplify
=========================

Using my polyline-simplify module, perform the Ramer-Douglas-Peucker algorithm on a shapes.txt gtfs file returning a file of similar structure.

Concept
===
The goal of this module is to simplify the shapes collection in a database, providing a smaller collection for one to deal with. The original idea was to do this before uploading the shapes collection to the database, lessening the overall size. 

Instead, the module works dynamically, accepting an array of documents and returning an array of fewer documents, depending on the size of the map used (bounding-box) and the accuracy requested (epsilon value).
