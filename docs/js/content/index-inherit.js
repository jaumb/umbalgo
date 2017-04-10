"use strict";

var buildIndex = function buildIndex() {
  var indexHtml = "";
  console.log;

  var contentCursor = content.slice();
  for (var i = 0; i < route.length; ++i) {
    for (var j = 0; j < contentCursor.length; ++j) {
      if (route[i] == contentCursor[j]["uriName"]) {
        contentCursor = contentCursor[j]["children"];
        break;
      }
    }
  }

  for (var _i = 0; _i < contentCursor.length; ++_i) {
    var child = contentCursor[_i];
    indexHtml += "<li><a href=\"?page=" + route.join(",") + "," + child["uriName"] + "\">" + child["displayName"] + "</a></li>";
  }
  return indexHtml;
};

console.log("ROUTES");
console.log(routes);
document.getElementById("container").innerHTML += "\n<h2 style=\"text-align:center\" id=\"title\">" + routes["displayName"] + "</h2>\n<ol>" + buildIndex() + "</ol>";