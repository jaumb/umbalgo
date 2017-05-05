/**
 * Load an array of scripts asynchronously, in order.
 */
var loadScripts = function(scripts, callback) {
  var recurse = function(scripts, callback, i) {
    if (i < scripts.length) {
      var xhr = new XMLHttpRequest;
      console.log("Loading " + scripts[i] + "...");
      xhr.open("GET", scripts[i]);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var s = document.createElement('script');
            s.innerHTML = xhr.responseText;
            document.body.appendChild(s);
            console.log("Loaded " + scripts[i]);
            recurse(scripts, callback, ++i);
          } else {
            console.log("Error loading " + scripts[i]);
          }
        }
      };
      xhr.send();
    } else if (callback) {
      callback();
    }
  }
  recurse(scripts, callback, 0);
};
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
var routes;
var route;
var content;
(function() {
  /**
   * The content's navigational hierarchy. This is used to validate page
   * requests and to generate breadcrumbs, page headers, index pages, etc. Note
   * that each level of the hierarchy's collection of children is ordered. This
   * is required to generate the index pages.
   */
  content = [
    {
      "uriName": "algorithms",
      "displayName": "Algorithms",
      "depends": [
        "js/libs/highlight.pack.js",
        "http://d3js.org/d3.v4.min.js",
        "js/libs/runner.js",
        "js/libs/vizlib/common.js",
        "js/libs/vizlib/factories/element_factory.js",
        "js/libs/vizlib/factories/array_factory.js",
        "js/libs/vizlib/factories/tree_factory.js",
        "js/libs/vizlib/vizlib.js",
        "js/libs/vizlib/redraw.js",
        "js/libs/jszip.min.js",
        "js/libs/FileSaver.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.debug.js",
        "http://canvg.github.io/canvg/rgbcolor.js",
        "http://canvg.github.io/canvg/StackBlur.js",
        "http://canvg.github.io/canvg/canvg.js"
      ],
      "children": [
        {
          "uriName": "fundamentals",
          "displayName": "Fundamentals",
          "ImgName": "fundamentals.svg",
          "description": "Basic tools required for the study of algorithms and data structures (pg. 3).",
          "titleColor": "#ea6874",
          "descriptionColor": "#ea6874",
          "children": [
            {
              "uriName": "shuffle",
              "displayName": "Shuffle",
              "ImgName": "fundamentals.svg",
              "status": "enabled",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "Randomly shuffle the elements in an array (pg. 32).",
              "depends": ["js/libs/vizlib/algorithms/shuffle.js"],
              "methods": [
                {
                  "displayName": "shuffle(Object[] a)",
                  "name": "shuffle"
                }
              ]
            },
            {
              "uriName": "search",
              "displayName": "Search",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "bag-linked-list",
              "displayName": "Bag (Linked List)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "description": "A collection that provides the ability to collect items, but does not support item removal (pg. 124).",
              "descriptionColor": "#ea6874"
            },
            {
              "uriName": "bag-array",
              "displayName": "Bag (Array)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "queue-linked-list",
              "displayName": "Queue (Linked List)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "description": "A collection that is based on the first-in-first-out (FIFO) policy (pg. 126).",
              "descriptionColor": "#ea6874"
            },
            {
              "uriName": "queue-array",
              "displayName": "Queue (Array)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "stack-linked-list",
              "displayName": "String (Linked List)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "stack-array",
              "displayName": "Stack (Array)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "union-find-quickfind",
              "displayName": "Union-Find (Quickfind)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "union-find-quickunion",
              "displayName": "Union-Find (Quickunion)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "color": "#f79fb0",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "union-find-weightedquickunion",
              "displayName": "Union-Find (Weighted Quickunion)",
              "status": "disabled",
              "ImgName": "fundamentals.svg",
              "titleColor": "#ea6874",
              "descriptionColor": "#ea6874",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            }
          ],
        },
        {
          "uriName": "sorting",
          "displayName": "Sorting",
          "ImgName": "sorting.svg",
          "description": "The process of rearranging a sequence of objects so as to put them in some logical order (pg. 242).",
          "titleColor": "#e7a32a",
          "descriptionColor": "#e7a32a",
          "children": [
            {
              "uriName": "selection-sort",
              "displayName": "Selection Sort",
              "status": "enabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "Sort by repeatedly selecting the smallest remaining item (pg. 248).",
              "depends": ["js/libs/vizlib/algorithms/selection.js"],
              "methods": [
                {
                  "displayName": "sort(Comparable[] a)",
                  "name": "sort"
                }
              ]
            },
            {
              "uriName": "insertion-sort",
              "displayName": "Insertion Sort",
              "status": "enabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "Sort by moving larger items one position to the right, before inserting the current item into the vacated position (pg. 250).",
              "depends": ["js/libs/vizlib/algorithms/insertion.js"],
              "methods": [
                {
                  "displayName": "sort(Comparable[] a)",
                  "name": "sort"
                }
              ]
            },
            {
              "uriName": "shell-sort",
              "displayName": "Shell Sort",
              "status": "disabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "merge-sort",
              "displayName": "Merge Sort",
              "status": "disabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "quick-sort",
              "displayName": "Quick Sort",
              "status": "disabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "quick-3way-sort",
              "displayName": "Quick 3-Way Sort",
              "status": "disabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "heap-sort",
              "displayName": "Heap Sort",
              "status": "disabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "maxpq",
              "displayName": "MaxPQ",
              "status": "disabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "minpq",
              "displayName": "MinPQ",
              "status": "disabled",
              "ImgName": "sorting.svg",
              "titleColor": "#e7a32a",
              "descriptionColor": "#e7a32a",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            }
          ]
        },
        {
          "uriName": "searching",
          "displayName": "Searching",
          "ImgName": "searching.svg",
          "description": "Algorithms related to searching through the vast amount of information made accessible by modern computing (pg. 361).",
          "titleColor": "#3cda83",
          "descriptionColor": "#3cda83",
          "children": [
            {
              "uriName": "basic-unordered-symbol-table",
              "displayName": "Basic Unordered Symbol Table",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "binary-symbol-table",
              "displayName": "Binary Symbol Table",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "ordered-symbol-table-bst",
              "displayName": "Ordered Symbol Table (BST)",
              "status": "enabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "A table that stores a set of objects ordered by keys and provides a variety of operations to manipulate them (pg. 366).",
              "depends": ["js/libs/vizlib/algorithms/bst.js"],
              "methods": [
                {
                  "displayName": "ceiling(Node x, Key key)",
                  "name": "ceiling"
                },
                {
                  "displayName": "delete(Node x, Key key)",
                  "name": "delete"
                },
                {
                  "displayName": "deleteMax(Node x)",
                  "name": "deleteMax"
                },
                {
                  "displayName": "deleteMin(Node x)",
                  "name": "deleteMin"
                },
                {
                  "displayName": "floor(Node x, Key key)",
                  "name": "floor"
                },
                {
                  "displayName": "get(Node x, Key key)",
                  "name": "get"
                },
                {
                  "displayName": "keys(Node x, Queue<Key> queue, Key lo, Key hi)",
                  "name": "keys"
                },
                {
                  "displayName": "max(Node x)",
                  "name": "max"
                },
                {
                  "displayName": "min(Node x)",
                  "name": "min"
                },
                {
                  "displayName": "put(Node x, Key key, Value val)",
                  "name": "put"
                },
                {
                  "displayName": "rank(Key key, Node x)",
                  "name": "rank"
                },
                {
                  "displayName": "select(Node x, int k)",
                  "name": "select"
                }
              ]
            },
            {
              "uriName": "ordered-symbol-table-red-black-bst",
              "displayName": "Ordered Symbol Table (Reb/Black BST)",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "separate-chaining-hash-table",
              "displayName": "Separate Chaining Hash Table",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "graph-undirected",
              "displayName": "Graph (Undirected)",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "depth-first-search-undirected",
              "displayName": "Depth First Search (Undirected)",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "breadth-first-search-undirected",
              "displayName": "Breadth First Search (Undirected)",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "connected-components",
              "displayName": "Connected Components",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "graph-directed",
              "displayName": "Graph (Directed)",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "cycle-detection",
              "displayName": "Cycle Detection",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "depth-first-search-directed",
              "displayName": "Depth First Search (Directed)",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "reverse-postorder-vertex-ordering",
              "displayName": "Reverse Post-Order Vertex Ordering",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "kosarajus-strongly-connected-components",
              "displayName": "Kosaraju's Strongly-Connected Components",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "edge-weighted-graph",
              "displayName": "Edge-Weighted Graph",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "kruskals-minimum-spanning-tree",
              "displayName": "Kruskal's Minimum Spanning Tree",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "edge-weighted-directed-graph",
              "displayName": "Edge-Weighted Directed Graph",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "dijkstras-shortest-paths",
              "displayName": "Dijkstra's Shortest Paths",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "shortest-paths-edge-weighted-directed-acyclic-graphs",
              "displayName": "Shortest Paths (Edge-Weighted, Directed, Acyclic Graphs)",
              "status": "disabled",
              "ImgName": "searching.svg",
              "titleColor": "#3cda83",
              "descriptionColor": "#3cda83",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            }
          ]
        },
        {
          "uriName": "strings",
          "displayName": "Strings",
          "ImgName": "strings.svg",
          "description": "Classic algorithms for addressing the underlying computational challenges related to processing strings (pg. 695).",
          "titleColor": "#20bdd0",
          "descriptionColor": "#20bdd0",
          "children": [
            {
              "uriName": "lsd-string-sort",
              "displayName": "LSD String Sort",
              "status": "disabled",
              "ImgName": "strings.svg",
              "titleColor": "#20bdd0",
              "descriptionColor": "#20bdd0",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "msd-string-sort",
              "displayName": "MSD String Sort",
              "status": "disabled",
              "ImgName": "strings.svg",
              "titleColor": "#20bdd0",
              "descriptionColor": "#20bdd0",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "trie-symbol-table",
              "displayName": "Trie Symbol Table",
              "status": "disabled",
              "ImgName": "strings.svg",
              "titleColor": "#20bdd0",
              "descriptionColor": "#20bdd0",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "knuth-morris-pratt-substring-search",
              "displayName": "Knuth-Morris-Pratt Substring Search",
              "status": "disabled",
              "ImgName": "strings.svg",
              "titleColor": "#20bdd0",
              "descriptionColor": "#20bdd0",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "non-deterministic-finite-state-automata",
              "displayName": "Non-Deterministic Finite State Automata",
              "status": "disabled",
              "ImgName": "strings.svg",
              "titleColor": "#20bdd0",
              "descriptionColor": "#20bdd0",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "run-length-encoding",
              "displayName": "Run Length Encoding",
              "status": "disabled",
              "ImgName": "strings.svg",
              "titleColor": "#20bdd0",
              "descriptionColor": "#20bdd0",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            },
            {
              "uriName": "huffman-compression",
              "displayName": "Huffman Compression",
              "status": "disabled",
              "ImgName": "strings.svg",
              "titleColor": "#20bdd0",
              "descriptionColor": "#20bdd0",
              "description": "This visualization is under construction. We will make it available as soon as possible."
            }
          ]
        }
      ]
    }
  ];
  /**
   * Decode uri parameters to a map.
   */
  let uriParams = function() {
    let params = {};
    let tokens;
    let re = /[?&]?([^=]+)=([^&/]*)/g;
    while (tokens = re.exec(document.location.search.split('+').join(' '))) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
  }
  /**
   * Extract the routes from the content object, sacrificing order for map-speed
   * lookups.
   */
  let makeRoutes = function(content) {
    let makeRoutes = function(content) {
      if (content !== undefined) {
        let routes = {};
        for (let c of content) {
          let children = makeRoutes(c["children"]);
          routes[c["uriName"]] = {
            "index": children === undefined,
            "children": c.hasOwnProperty("children")
              ? children : undefined
          };
          for (let property in c) {
            if (c.hasOwnProperty(property) && property !== "index" && property !== "children") {
              routes[c["uriName"]][property] = c[property];
            }
          }
        }
        return routes;
      }
    }
    return {"children": makeRoutes(content)};
  }

  let loadRoute = function(uriRoute) {
    try {
      // A list of levels in the navigational hierarchy as specified by the uri,
      // in descending order.
      route = uriRoute.split(',');
      // A list of the levels of the navigational hierarchy that have already been
      // traversed.
      var trace = [];
      // An array of html that will be appended to the body. Each imports a script
      // that provides common content for a level of the navigational hierarchy.
      var scripts = [];
      // An array of html that comprises the nav bar.
      var nav = [];
      // Iterate over the requested route level-by-level.
      routes = makeRoutes(content);
      for (var i = 0; i < route.length; ++i) {
        routes = routes["children"][route[i]];
        // Add the current level to the trace.
        trace.push(route[i]);
        // Load dependencies (if any).
        if (routes["index"] === false && routes["depends"] !== undefined) {
          scripts.push.apply(scripts, routes["depends"]);
        }

        if (i == route.length - 1) {
          // If this is the bottom level of the route, load the script that
          // populates page-specific content and its dependencies.
          if (routes["children"] === undefined ) {
            scripts.push.apply(scripts, routes["depends"]);
            scripts.push("js/content/" + trace.join("/") + ".js");
          } else {
            scripts = [
              "js/content/index-inherit.js",
              "js/content/" + trace.join("/") + "/" + routes["uriName"] + "-index.js"
            ];
          }
          // Add an active breadcrumb to the navbar.
          nav.push("<li class=\"active\"><a href=\"index.html?page="
                   + trace.join(",") + "\">" + routes["displayName"] + "</a></li>");
        } else {
          // Load a script that populates all content common to pages that descend
          // from this one.
          scripts.push("js/content/" + trace.join("/") + "/" + routes["uriName"]
                       + "-inherit.js");
          // Add an inactive breadcrumb to the navbar.
          nav.push("<li><a href=\"index.html?page="
                   + trace.join(",") + "\">" + routes["displayName"] + "</a></li>");
        }
      }
    } catch(e) {
      // If an invalid route was requested, we'll end up here. Load the home page
      // instead.
      scripts = [];
      loadRoute('algorithms');
    }
    console.log(scripts);
    // Load the scripts in order.
    loadScripts(scripts);
    // Populate the nav bar.
    document.getElementById("nav").innerHTML = nav.join("");
    // Populate the page title (if it has one).
    try {
      document.getElementById("title").innerHTML = title;
    } catch (e) {}
  }

  loadRoute(uriParams()["page"]);

  // Populate dropdown menu
  let buildDropdown = function() {
    let buildDropdown = function(page, route) {
      let dropdownContent = "";
      if (page["children"] === undefined) {
        dropdownContent += `<li><a href="?page=` + route.join(",") + `,` + page["uriName"] + `">` + page["displayName"] + `</a></li>`;
      } else {
        dropdownContent +=
          `<li><a href="?page=` + route.join(",") + "," + page["uriName"] + `">` + page["displayName"] + `<span class="caret"></span></a>
             <ul class="dropdown-menu" id="fundamentals">`;
        for (let child of page["children"]) {
          let newRoute = route.slice();
          newRoute.push(page["uriName"]);
          dropdownContent += buildDropdown(child, newRoute);
        }
        dropdownContent += `</ul></li>`;
      }
      return dropdownContent;
    }
    for (let child of content) {
      if (child["uriName"] === "algorithms") {
        let dropdownContent = "";
        for (let c of child["children"]) {
          dropdownContent += buildDropdown(c, ["algorithms"]);
        }
        return dropdownContent;
      }
    }
  }

  document.getElementById("dropdown-menu").innerHTML = buildDropdown();
}());
