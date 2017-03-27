

var tree_factory = (function() {
  //////////////////////////////////////////////////////////////////////////////
  //  private variables
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  //  private methods
  //////////////////////////////////////////////////////////////////////////////

  // clear the highlighting of nodes at the insertion sequence positions
  tree.unhighlight = function(elements) {
      q.push(function() {
          positions.forEach(function(i) {
              tree.nodes[i - 1].fill = 'white';
          });
      });
  };

  // display the next element to be added to the tree
  tree.displayNextElem = function(elem) {
      q.push(function() {
          tree.nodes.push({
              val:elem,
              pos:{x:tree.nodeSP.x, y:tree.nodeSP.y},
              lc:null,
              rc:null
          });
      });
  };

  // add root element to the tree
  tree.addRoot = function(e) {
      q.push(function() {

          tree.size++;
      });
  };

  // add e1 to the tree to the right of e2
  tree.addRightChild = function(e1, e2) {
      q.push(function() {
          node1 = tree.find(e1);
          node2 = tree.find(e2);
          node2.rc = node1;
          node1.pos.x = node2.pos.x + dx;
          node1.pos.y = node2.pos.y + dy;
          tree.reposition();
          tree.size++;
      });
  };

  // add e1 to the tree to the left of e2
  tree.addLeftChild = function(e1, e2) {
      q.push(function() {
          node1 = tree.find(e1);
          node2 = tree.find(e2);
          node2.lc = node1;
          node1.pos.x = node2.pos.x - dx;
          node1.pos.y = node2.pos.y + dy;
          tree.reposition();
          tree.size++;
      });
  };

  // get the height of the tree
  tree.getHeight = function() {
      function getHeight(node) {
          if (!node) {
              return 0;
          } else if (node.lc && node.rc) {
              return node.l;
          } else {
              return Math.max(getHeight(node.lc), getHeight(node.rc));
          }
      }
      return getHeight(tree.root);
  };

  // get a list of all nodes in the tree
  tree.getNodes = function() {
      var nodes = [];
      function getNodes(node) {
          if (!node) { return; }
          nodes.push({val:node.val, size:node.size, lc:node.lc, rc:node.rc,
                          pos:node.pos, seq:node.seq});
          getNodes(node.lc);
          getNodes(node.rc);
      }
      if (tree.root) {
          getNodes(tree.root);
      }
      return nodes.sort(function(a, b) { return a.seq - b.seq; });
  };

  // get a list of all edges in the tree
  tree.getEdges = function() {
      var edges = [];
      function getEdges(e) {
          if (!e) { return; }
          if (e.lc) {
              edges.push({v1:e.val, p1:e.pos, v2:e.lc.val, p2:e.lc.pos,
                                                      seq:e.lc.seq});
              getEdges(e.lc);
          }
          if (e.rc) {
              edges.push({v1:e.val, p1:e.pos, v2:e.rc.val, p2:e.rc.pos,
                                                      seq:e.rc.seq});
              getEdges(e.rc);
          }
      }
      getEdges(tree.root);
      return edges.sort(function(a, b) { return a.seq - b.seq; });
  };

  // adjust the position of all nodes on the tree
  tree.reposition = function(node) {
      // get the number leaves in the tree rooted at node
      getLeafCount = function(node) {
          if (!node) {
              return 0;
          } else if (!node.lc && !node.rc) {
              return 1;
          } else {
              return getLeafCount(node.lc) + getLeafCount(node.rc);
          }
      };

      if (!node) { return; }

      var lCount = getLeafCount(node);
      if (node.lc) {
          node.lc.pos.x = (node.pos.x - dx) -
                  (tree.getHeight() - node.lc.l) * tree.w*(lCount-1)/2;
          tree.reposition(node.lc);
      }
      if (node.rc) {
          node.rc.pos.x = (node.pos.x + dx) +
                  (tree.getHeight() - node.rc.l) * tree.w*(lCount-1)/2;
          tree.reposition(node.rc);
      }
  };

  // reset the tree
  tree.reset = function() {
      if (intervalID) {
          clearInterval(intervalID);
          intervalID = null;
      }
      d3.select('#g_lines').html(null);
      d3.select('#g_circles').html(null);
      d3.select('#g_labels').html(null);
      tree.root = null;
      tree.size = 0;
      redraw();
  };

  //////////////////////////////////////////////////////////////////////////////
  //  public methods
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  //  return public methods
  //////////////////////////////////////////////////////////////////////////////
  return {

  };
})();
