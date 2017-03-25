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
(function() {
  /**
   * The content's navigational hierarchy. This is used to validate page
   * requests and to generate breadcrumbs, page headers, index pages, etc. Note
   * that each level of the hierarchy's collection of children is ordered. This
   * is required to generate the index pages.
   */
  var content = [
    {
      "uriName": "algorithms",
      "displayName": "Algorithms",
      "children": [
        {
          "uriName": "fundamentals",
          "displayName": "Fundamentals",
          "children": [
            {
              "uriName": "shuffle",
              "displayName": "Shuffle"
            },
            {
              "uriName": "search",
              "displayName": "Search"
            },
            {
              "uriName": "bag-linked-list",
              "displayName": "Bag (Linked List)"
            },
            {
              "uriName": "bag-array",
              "displayName": "Bag (Array)"
            },
            {
              "uriName": "queue-linked-list",
              "displayName": "Queue (Linked List)"
            },
            {
              "uriName": "queue-array",
              "displayName": "Queue (Array)"
            },
            {
              "uriName": "stack-linked-list",
              "displayName": "String (Linked List)"
            },
            {
              "uriName": "stack-array",
              "displayName": "Stack (Array)"
            },
            {
              "uriName": "union-find-quickfind",
              "displayName": "Union-Find (Quickfind)"
            },
            {
              "uriName": "union-find-quickunion",
              "displayName": "Union-Find (Quickunion)"
            },
            {
              "uriName": "union-find-weightedquickunion",
              "displayName": "Union-Find (Weighted Quickunion)"
            }
          ],
        },
        {
          "uriName": "sorting",
          "displayName": "Sorting",
          "children": [
            {
              "uriName": "selection-sort",
              "displayName": "Selection Sort"
            },
            {
              "uriName": "insertion-sort",
              "displayName": "Insertion Sort"
            },
            {
              "uriName": "shell-sort",
              "displayName": "Shell Sort"
            },
            {
              "uriName": "merge-sort",
              "displayName": "Merge Sort"
            },
            {
              "uriName": "quick-sort",
              "displayName": "Quick Sort"
            },
            {
              "uriName": "quick-3way-sort",
              "displayName": "Quick 3-Way Sort"
            },
            {
              "uriName": "heap-sort",
              "displayName": "Heap Sort"
            },
            {
              "uriName": "maxpq",
              "displayName": "MaxPQ"
            },
            {
              "uriName": "minpq",
              "displayName": "MinPQ"
            }
          ]
        },
        {
          "uriName": "searching",
          "displayName": "Searching",
          "children": [
            {
              "uriName": "basic-unordered-symbol-table",
              "displayName": "Basic Unordered Symbol Table"
            },
            {
              "uriName": "binary-symbol-table",
              "displayName": "Binary Symbol Table"
            },
            {
              "uriName": "ordered-symbol-table-bst",
              "displayName": "Ordered Symbol Table (BST)"
            },
            {
              "uriName": "ordered-symbol-table-red-black-bst",
              "displayName": "Ordered Symbol Table (Reb/Black BST)"
            },
            {
              "uriName": "separate-chaining-hash-table",
              "displayName": "Separate Chaining Hash Table"
            },
            {
              "uriName": "graph-undirected",
              "displayName": "Graph (Undirected)"
            },
            {
              "uriName": "depth-first-search-undirected",
              "displayName": "Depth First Search (Undirected)"
            },
            {
              "uriName": "breadth-first-search-undirected",
              "displayName": "Breadth First Search (Undirected)"
            },
            {
              "uriName": "connected-components",
              "displayName": "Connected Components"
            },
            {
              "uriName": "graph-directed",
              "displayName": "Graph (Directed)"
            },
            {
              "uriName": "cycle-detection",
              "displayName": "Cycle Detection"
            },
            {
              "uriName": "depth-first-search-directed",
              "displayName": "Depth First Search (Directed)"
            },
            {
              "uriName": "reverse-postorder-vertex-ordering",
              "displayName": "Reverse Post-Order Vertex Ordering"
            },
            {
              "uriName": "kosarajus-strongly-connected-components",
              "displayName": "Kosaraju's Strongly-Connected Components"
            },
            {
              "uriName": "edge-weighted-graph",
              "displayName": "Edge-Weighted Graph"
            },
            {
              "uriName": "kruskals-minimum-spanning-tree",
              "displayName": "Kruskal's Minimum Spanning Tree"
            },
            {
              "uriName": "edge-weighted-directed-graph",
              "displayName": "Edge-Weighted Directed Graph"
            },
            {
              "uriName": "dijkstras-shortest-paths",
              "displayName": "Dijkstra's Shortest Paths"
            },
            {
              "uriName": "shortest-paths-edge-weighted-directed-acyclic-graphs",
              "displayName": "Shortest Paths (Edge-Weighted, Directed, Acyclic Graphs)"
            }
          ]
        },
        {
          "uriName": "strings",
          "displayName": "Strings",
          "children": [
            {
              "uriName": "lsd-string-sort",
              "displayName": "LSD String Sort"
            },
            {
              "uriName": "msd-string-sort",
              "displayName": "MSD String Sort"
            },
            {
              "uriName": "trie-symbol-table",
              "displayName": "Trie Symbol Table"
            },
            {
              "uriName": "knuth-morris-pratt-substring-search",
              "displayName": "Knuth-Morris-Pratt Substring Search"
            },
            {
              "uriName": "non-deterministic-finite-state-automata",
              "displayName": "Non-Deterministic Finite State Automata"
            },
            {
              "uriName": "run-length-encoding",
              "displayName": "Run Length Encoding"
            },
            {
              "uriName": "huffman-compression",
              "displayName": "Huffman Compression"
            }
          ]
        }
      ]
    }
  ];
  /**
   * Decode uri parameters to a map.
   */
  var uriParams = function() {
    var params = {};
    var tokens;
    var re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(document.location.search.split('+').join(' '))) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
  }
  /**
   * Extract the routes from the content object, sacrificing order for map-speed
   * lookups.
   */
  var makeRoutes = function(content) {
    var recurse = function(content, routes) {
      if (content) {
        for (var i = 0; i < content.length; ++i) {
          var c = content[i];
          routes[c["uriName"]] = { "displayName": c["displayName"] };
          if (c.hasOwnProperty("children")) {
            routes[c["uriName"]]["children"] = {}
            recurse(c["children"], routes[c["uriName"]]["children"]);
          }
        }
      }
    };
    var routes = { "children": {} };
    recurse(content, routes["children"]);
    return routes;
  };

  try {
    // The comma-joined route, as extracted from the uri.
    var routeJoined = uriParams()["page"];
    // A list of levels in the navigational hierarchy as specified by the uri,
    // in descending order.
    var route = routeJoined.split(',');
    // A list of the levels of the navigational hierarchy that have already been
    // traversed.
    var trace = [];
    // An array of html that will be appended to the body. Each imports a script
    // that provides common content for a level of the navigational hierarchy.
    var scripts = [];
    // An array of html that comprises the nav bar.
    var nav = [];

    // Iterate over the requested route level-by-level, stopping at the parent
    // of the destination.
    for (var i = 0, level = makeRoutes(content);
         i < route.length - 1;
         level = level["children"][route[i++]]) {
      // Add the current level to the trace
      trace.push(route[i]);
      // Add html to import the script that populates content common to all
      // pages at this level.
      scripts.push("<script src=\"js/content/" + trace.join("/") + "/"
                   + route[i] + "-inherit.js\"></script>");
      // Add a breadcrumb to the navbar for this level.
      nav.push("<li><a href=\"index.html?page=" + trace.join(",") + "\">"
               + level["children"][route[i]]["displayName"] + "</a></li>");
    }
    // Check that the destination page exists.
    if ([route[route.length - 1]] === undefined) {
      throw 'Invalid route';
    }
    // Add html to import a script that poulates its page specific content.
    scripts.push("<script src=\"js/content/"
                 + trace.slice(0, trace.length).join("/") + "/"
                 + route[route.length - 1] + ".js\"></script>");
    // Add a breadcrumb to the navbar for this level.
    var title = level["children"][route[i]]["displayName"];
    nav.push("<li class=\"active\"><a href=\"index.html?page=" + routeJoined
             + "\">" + title + "</a></li>");
  } catch(e) {
    // If an invalid route was requested, we'll end up here. Load the home page
    // instead.
    scripts = ["<script src=\"js/content/index.js\"></script>"];
    nav = ["<li class=\"active\"><a href=\"index.html\">Home</a></li>"];
  }
  // Append the html to load the necessary scripts to the body.
  document.body.innerHTML += scripts.join("");
  // Populate the nav bar.
  document.getElementById("nav").innerHTML = nav.join("");
  // Populate the page title.
  document.getElementById("title").innerHTML = title;
})();
