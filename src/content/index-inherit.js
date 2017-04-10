let buildIndex = function() {
  let indexHtml = "";
  console.log

  let contentCursor = content.slice();
  for (let i = 0; i < route.length; ++i) {
    for (let j = 0; j < contentCursor.length; ++j) {
      if (route[i] == contentCursor[j]["uriName"]) {
        contentCursor = contentCursor[j]["children"];
        break;
      }
    }
  }

  for (let i = 0; i < contentCursor.length; ++i) {
    let child = contentCursor[i];
    indexHtml += `<li><a href="?page=` + route.join(",") + ","
      + child["uriName"] + `">` + child["displayName"] + `</a></li>`;
  }
  return indexHtml;
}

console.log("ROUTES");
console.log(routes);
document.getElementById("container").innerHTML += `
<h2 style="text-align:center" id="title">` + routes["displayName"] + `</h2>
<ol>` + buildIndex() + `</ol>`;
