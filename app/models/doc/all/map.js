// The map function is the most critical part of any view as it provides the
// logical mapping between the input fields of the individual objects stored
// within Couchbase to the information output when the view is accessed.
//
// Read more about how to write map functions at:
// http://www.couchbase.com/docs/couchbase-manual-2.0/couchbase-views-writing-map.html

function(doc, meta) {
  if (doc.type === "doc") {
    emit(meta.id, doc);
  }
}

// To be able to filter or sort the view by some document property, you
// would use that property for the key. For example, the following view
// would allow you to lookup customer documents by the last_name or
// first_name fields (your keys could be compound, e.g. arrays):
//
//   function(doc, meta) {
//     if (doc.type == "customer") {
//       emit(doc.last_name, {first_name: doc.first_name});
//       emit(doc.first_name, {last_name: doc.last_name});
//     }
//   }
//
