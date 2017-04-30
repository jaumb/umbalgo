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
    indexHtml += `<div class = "col-sm-6 col-md-4">
                    <div class="card">
                    <a href="?page=` + route.join(",") + ","+ child["uriName"] + `"><span></span></a>
                      <div class="avatar" id="avatar"><img src="logo/` + child["ImgName"] + `"/></div>
                      <div class="bottom-section">
                        <h3 style="color:` + child["titleColor"] + `;">` + child["displayName"] + `</h3>
                        <p style="color:` + child["descriptionColor"] + `;">"` + child["description"] + `"</p>
                      </div>
                    </div>
                  </div>`;
  }
  return indexHtml;
}

// Print the list of child pages.
document.getElementById("container").innerHTML += `
<h2 style="text-align:center; color:#dce9f2;" id="title">` + routes["displayName"] + `</h2>
<ol>` + buildIndex() + `</ol>`;


/*let buildDropdown = function() {
  let dropdownContent = "";

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
    dropdownContent += `<li><a href="?page=` + route.join(",") + ","
      + child["uriName"] + `">` + child["displayName"] + `</a></li>`;
  }
  return dropdownContent;
}

// Print the list of child pages.
document.getElementById("dropdown-menu").innerHTML += `
<li><a href='#'>` + child["displayName"] + `<span class="caret"></span></a>
<ul class="dropdown-menu"></ul></li>`
*/
