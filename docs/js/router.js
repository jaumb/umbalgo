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
      "fundamentals":new Set([
        "shuffle",
        "search",
        "bag-linked-list",
        "bag-array",
        "queue-linked-list",
        "queue-array",
        "stack-linked-list",
        "stack-array",
        "union-find-quickfind",
        "union-find-quickunion",
        "union-find-weightedquickunion"
      ]),
      "sorting": new Set([
        "selection-sort",
        "insertion-sort",
        "shell-sort",
        "merge-sort",
        "quick-sort",
        "quick-3way-sort",
        "heap-sort",
        "maxpq",
        "minpq"
      ]),
      "searching": new Set([
        "basic-unordered-symbol-table",
        "binary-symbol-table",
        "ordered-symbol-table-bst",
        "ordered-symbol-table-red-black-bst",
        "separate-chaining-hash-table",
        "graph-undirected",
        "depth-first-search-undirected",
        "breadth-first-search-undirected",
        "connected-components",
        "graph-directed",
        "cycle-detection",
        "depth-first-search-directed",
        "reverse-postorder-vertex-ordering",
        "kosarajus-strongly-connected-components",
        "edge-weighted-graph",
        "kruskals-minimum-spanning-tree",
        "edge-weighted-directed-graph",
        "dijkstras-shortest-paths",
        "shorted-paths-edge-weighted-directed-acyclic-graphs"
      ]),
      "strings": new Set([
        "lsd-string-sort",
        "msd-string-sort",
        "trie-symbol-table",
        "knuth-morris-pratt-substring-search",
        "non-deterministic-finite-state-automata",
        "run-length-encoding",
        "huffman-compression"
      ])
    }
  };

  try {
    // A list of levels in the navigational hierarchy as specified by the uri,
    // in descending order.
    var route = uriParams()["page"].split(',');
    // An array of html strings that will be appended to the body. Each imports
    // a script that provides common content for a level of the navigational
    // hierarchy.
    var scripts = [];
    // A list of the levels of the navigational hierarchy that have already been
    // traversed.
    var trace = [];

    // Iterate over the requested route level-by-level, stopping at the parent
    // of the destination.
    for (var i = 0, level = routes;
         i < route.length - 1;
         level = level[route[i++]]) {
      // Add the current level to the trace
      trace.push(route[i]);
      // Add html to import the script that populates content common to all
      // pages at this level.
      scripts.push("<script src=\"js/content/" + trace.join("/") + "/"
                   + route[i] + "-inherit.js\"></script>");
    }
    // Check that the destination page exists.
    if (!level.has(route[route.length - 1])) {
      throw 'Invalid route';
    }
    // Load its page specific content.
    scripts.push("<script src=\"js/content/"
                 + trace.slice(0, trace.length).join("/") + "/"
                 + route[route.length - 1] + ".js\"></script>");
  } catch(e) {
    // If an invalid route was requested, we'll end up here. Load the home page
    // instead.
    scripts = ["<script src=\"js/content/index.js\"></script>"]
  }
  // Append the html to load the necessary scripts to the body.
  document.body.innerHTML += scripts.join("");
}

followRoute();
