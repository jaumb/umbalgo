"use strict";

var buildIndex = function buildIndex() {
  var indexHtml = "";

  // Traverse the content tree until we've reached the current page's entry
  // (the variable `route` is an array of the comma-separated `uriNames`
  // that were entered with the uri).
  var contentCursor = content.slice();
  for (var i = 0; i < route.length; ++i) {
    for (var j = 0; j < contentCursor.length; ++j) {
      if (route[i] == contentCursor[j]["uriName"]) {
        contentCursor = contentCursor[j]["children"];
        break;
      }
    }
  }

  // Print a link to each child page.
  for (var _i = 0; _i < contentCursor.length; ++_i) {
    var child = contentCursor[_i];
    indexHtml += "<li><a href=\"?page=" + route.join(",") + "," + child["uriName"] + "\">" + child["displayName"] + "</a></li>";
  }
  return indexHtml;
};

// Print the list of child pages.
document.getElementById("container").innerHTML += "\n<h2 style=\"text-align:center\" id=\"title\">" + routes["displayName"] + "</h2>\n<ol>" + buildIndex() + "</ol>";