let buildIndex = function() {
  let indexHtml = "";

  // Traverse the content tree until we've reached the current page's entry
  // (the variable `route` is an array of the comma-separated `uriNames`
  // that were entered with the uri).
  let contentCursor = content.slice();
  for (let i = 0; i < route.length; ++i) {
    for (let j = 0; j < contentCursor.length; ++j) {
      if (route[i] == contentCursor[j]["uriName"]) {
        contentCursor = contentCursor[j]["children"];
        break;
      }
    }
  }

  // Print a link to each child page.
  for (let i = 0; i < contentCursor.length; ++i) {
    let child = contentCursor[i];
    indexHtml += `<li><a href="?page=` + route.join(",") + ","
      + child["uriName"] + `">` + child["displayName"] + `</a></li>`;
  }
  return indexHtml;
}

// Print the list of child pages.
document.getElementById("container").innerHTML += `
<h2 style="text-align:center" id="title">` + routes["displayName"] + `</h2>
<ol>` + buildIndex() + `</ol>`;
