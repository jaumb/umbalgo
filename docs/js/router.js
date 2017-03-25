/**
 * Decode uri parameters to a map
 */
function uriParams() {
  var params = {};
  var tokens;
  var re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(document.location.search.split('+').join(' '))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

/**
 * Decode the uri, and append scripts to the body of the page that populate the
 * appropriate content.
 * The content of the requested page is populated by a script of the same name
 * in the js/content folder, who's hierarchy mirrors the navigational hierarchy.
 * That script is a superset of a script of the same name with `-inherit`
 * appended, which will be loaded by any pages lower in the hierarchy (in
 * addition to their own script). If the uri doesn't decode to a recognized
 * page, the user is directed to the home page.
 */
function followRoute() {
  // The hierarchy of recognized routes
  var routes = {
    "algorithms": {
      "chapter-2-sorting": {
        "2.1-elementary-sorts": new Set([
          "insertion-sort"
        ])
      }
    }
  };

  try {
    var navLevels = uriParams()["page"].split(',');
    var scripts = [];
    var levelTrace = [];
    var route = routes;
    for (var i = 0; i < navLevels.length - 1; ++i) {
      route = route[navLevels[i]];
      levelTrace.push(navLevels[i]);
      scripts.push("<script src=\"js/content/" + levelTrace.join("/") + "/"
                   + navLevels[i] + "-inherit.js\"></script>");
    }
    if (!route.has(navLevels[navLevels.length - 1])) {
      throw 'Invalid route';
    }
    scripts.push("<script src=\"js/content/" + levelTrace.join("/") + "/"
                 + navLevels[navLevels.length - 1] + ".js\"></script>");
  } catch(e) {
    scripts = ["<script src=\"js/content/index.js\"></script>"]
  }
  document.body.innerHTML += scripts.join("");
}

followRoute();
