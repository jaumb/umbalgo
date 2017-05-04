
var tree_factory = (function() {

  //////////////////////////////////////////////////////////////////////////////
  //  private tree_factory methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Create a new binary tree visualization on the canvas.
   * @param {undefined|Object} treeRoot - Root of the existing binary tree.
   * @param {Object} bounding_box - The box inside of which to center the tree.
   */
  function Binary_Tree(treeRoot, bounding_box) {

    ////////////////////////////////////////////////////////////////////////////
    //  private variables
    ////////////////////////////////////////////////////////////////////////////

    var _X1 = null;
    var _Y1 = null;
    var _X2 = null;
    var _Y2 = null;
    var _W = null;
    var _H = null;
    var _clientNodeMap = new Map();
    var _vizNodeMap = new Map();
    var _edgeMap = new Map();
    var _radius = null;
    var _root = null;
    var _rootPos = null;
    var _nextNodePos = null;
    var _xOffset = null;
    var _yOffset = null;
    var _labelBbox = null;
    var _someSpace = null;

    // calculate initial size of tree nodes
    resize(null, bounding_box);

    ////////////////////////////////////////////////////////////////////////////
    //  private methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Create a new node based on a client node.
     * Client node is expected to have the following methods
     * clientNode.id() - Unique identifier
     * clientNode.lChild() - Left child in the client's tree
     * clientNode.rChild() - Right child in the client's tree
     * clientNode.val() - Value with which to label the node
     * @param {Object} clientNode - Node created by client.
     */
    function _createNewNode(clientNode) {
      var newNode = element_factory.getCircle();
      newNode.setR(_radius);
      newNode.setStrokeWidth(1/15 * _radius);
      newNode.getLabel().setVal(clientNode.val());
      newNode.getLabel().setFontSize((1.2 * _radius) + 'px');
      newNode.isDisplayNode = false;
      _addVizNode(clientNode, newNode);
      return newNode;
    }

    /**
     * Create a new edge from client visualization node to child
     * visualization node.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     */
    function _createNewEdge(vizParent, vizChild) {
      var newEdge = element_factory.getLine();
      newEdge.setStroke(colors.BLACK);
      _positionEdge(vizParent, vizChild, newEdge);
      _addEdge(vizParent, vizChild, newEdge);
      return newEdge;
    }

    /**
     * Create a new binary tree given the root of a subtree.
     * @param {Object} clientNode - Root of the subtree.
     */
    function _buildTree(clientNode) {
      if (!clientNode) { return null; }
      var vizNode = _getVizNode(clientNode);
      if (vizNode) {
        if (vizNode.isDisplayNode && !_root) {
          _root = vizNode;
          vizNode.isDisplayNode = undefined;
        }
      } else {
        vizNode = _createNewNode(clientNode);
        if (!_root) { _root = vizNode; }
      }
      vizNode.lChild = _buildTree(clientNode.lChild());
      vizNode.rChild = _buildTree(clientNode.rChild());
      return vizNode;
    }

    /**
     * Remove targetClientNode from the tree rooted at rootVizNode.
     * @param {Object} rootVizNode - Root of the subtree.
     * @param {Object|undefined} parVizNode - Root's parent node (if any).
     * @param {Object} targetClientNode - Node to remove from subtree.
     */
    function _removeNode(rootVizNode, parVizNode, targetClientNode) {
      if (!rootVizNode) {
        return null;
      } else if (targetClientNode.val() > rootVizNode.getLabel().getVal()) {
        rootVizNode.rChild = _removeNode(rootVizNode.rChild, rootVizNode,
                                                            targetClientNode);
      } else if (targetClientNode.val() < rootVizNode.getLabel().getVal()) {
        rootVizNode.lChild = _removeNode(rootVizNode.lChild, rootVizNode,
                                                            targetClientNode);
      } else {
        // first remove edges
        if (parVizNode) {
          _delEdgeFromCanvas(parVizNode, rootVizNode);
        }
        if (rootVizNode.rChild) {
          _delEdgeFromCanvas(rootVizNode, rootVizNode.rChild);
        }
        if (rootVizNode.lChild) {
          _delEdgeFromCanvas(rootVizNode, rootVizNode.lChild);
        }
        // next remove node itself
        _delNodeFromCanvas(targetClientNode);
        if (!rootVizNode.rChild) {
          return rootVizNode.lChild;
        } else if (!rootVizNode.lChild) {
          return rootVizNode.rChild;
        } else {
          var suc = _getMinNode(rootVizNode.rChild);
          suc.rChild = _delMinNode(rootVizNode.rChild, rootVizNode);
          suc.lChild = rootVizNode.lChild;
          return suc;
        }
      }
      return rootVizNode;
    }

    /**
     * Get the node with the smallest value in the tree rooted at rootVizNode.
     * @param {undefined|Object} rootVizNode - Root of the subtree.
     */
    function _getMinNode(rootVizNode) {
      while (rootVizNode && rootVizNode.lChild) {
        rootVizNode = rootVizNode.lChild;
      }
      return rootVizNode;
    }

    /**
     * Remove the node with the smallest value from the tree rooted at
     * rootVizNode.
     * @param {Object} rootVizNode - Root of the subtree.
     * @param {undefined|Object} vizNodeParent - Parent of rootVizNode.
     */
    function _delMinNode(rootVizNode, vizNodeParent) {
      if (!rootVizNode.lChild) {
        _delEdgeFromCanvas(vizNodeParent, rootVizNode);
        if (rootVizNode.rChild) {
          _delEdgeFromCanvas(rootVizNode, rootVizNode.rChild);
        }
        return rootVizNode.rChild;
      } else {
        rootVizNode.lChild = _delMinNode(rootVizNode.lChild, rootVizNode);
      }
      return rootVizNode;
    }

    /**
     * Remove edge between vizPar and vizChild from canvas.
     * @param {Object} vizPar - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     */
    function _delEdgeFromCanvas(vizPar, vizChild) {
      var edge = _getEdge(vizPar, vizChild);
      if (edge) {
        edge.setPosX2(edge.getPosX1());
        edge.setPosY2(edge.getPosY1());
        redraw.onNextDrawEnd(function(theEdge, par, child) {
          redraw.removeElem(theEdge.getID());
          _removeEdge(par, child);
        }, edge, vizPar, vizChild);
      }
    }

    /**
     * Remove node from canvas.
     * @param {Object} node - Node to remove from canvas.
     */
    function _delNodeFromCanvas(node) {
      if (!node) { return; }
      var vizNode = null;
      if (node.className && node.className() === 'circle') {
        vizNode = node; // it's a visualization node
      } else { // client node 
        vizNode = _getVizNode(node);
      }
      if (vizNode) {
        vizNode.setFillOpacity(0);
        vizNode.setStrokeOpacity(0);
        vizNode.getLabel().setFillOpacity(0);
        redraw.onNextDrawEnd(function(aNode) {
          redraw.removeElem(aNode.getLabel().getID());
          redraw.removeElem(aNode.getID());
          _removeVizNode(aNode);
        }, vizNode);
      }
    }

    /**
     * Set node indices in the subtree rooted at root.
     * @param {} rootNode - Root of the subtree.
     */
    function _setIndices(rootNode) {
      rootNode.index = 1;
      var q = [rootNode];
      while (q.length > 0) {
        var par = q.shift();
        if (par.lChild) {
          par.lChild.index = 2 * par.index - 1;
          q.push(par.lChild);
        }
        if (par.rChild) {
          par.rChild.index = 2 * par.index;
          q.push(par.rChild);
        }
      }
    }

    /**
     * Get the height of the tree rooted at node.
     * @param {undefined|Object} rootNode - Root of the subtree.
     * @param {number} level - Level of node (root of tree is 0).
     */
    function _getHeight(rootNode, level) {
      if (!rootNode) { return (level === 0) ? 0 : level - 1; }
      rootNode.depth = level;
      var lHeight = 0;
      var rHeight = 0;
      lHeight = _getHeight(rootNode.lChild, level + 1);
      rHeight = _getHeight(rootNode.rChild, level + 1);
      return Math.max(lHeight, rHeight);
    }

    /**
     * Representation of a client node (used to store local copies).
     */
    function _clientNode(uid, nodeVal, lc, rc) {
      var _id = uid;
      var _val = nodeVal;
      var _lc = lc;
      var _rc = rc;

      var id = function() { return _id; }
      var val = function() { return _val; }
      var lChild = function() { return _lc; }
      var rChild = function() { return _rc; }
      var setLChild = function(child) { _lc = child; }
      var setRChild = function(child) { _rc = child; }

      return {
        id:id,
        val:val,
        lChild:lChild,
        rChild:rChild,
        setLChild:setLChild,
        setRChild:setRChild
      };
    }

    /**
     * Make a copy of the client node.
     * @param {Object} clientNode - Client node to copy.
     * @return {Object} nodeCopy - Copy of client node.
     */
    function _copyClientNode(clientNode) {
      return new _clientNode(clientNode.id(), clientNode.val(), null, null);
    }

    /**
     * Add a visualization node to the visualization's tree that
     * corresponds to a client's node.
     * @param {Object} clientNode - Client's tree node object.
     * @param {Object} vizNode - A visualization node.
     */
    function _addVizNode(clientNode, vizNode) {
      _clientNodeMap.set(clientNode.id(), vizNode);
      _vizNodeMap.set(vizNode.getID(), clientNode);
    }

    /**
     * Get the visualization node corresponding to the client
     * node.
     * @param {Object} clientNode - Client's tree node object.
     * @return vizNode - Visualization node.
     */
    function _getVizNode(clientNode) {
      return _clientNodeMap.get(clientNode.id());
    }

    /**
     * Get the client node corresponding to the visualization
     * node.
     * @param {Object} vizNode - Viz node's tree node object.
     * @return clientNode - Client node.
     */
    function _getClientNode(vizNode) {
      return _vizNodeMap.get(vizNode.getID());
    }

    /**
     * Remove a node from the visualization.
     * @param {Object} aNode - Node object.
     */
    function _removeVizNode(aNode) {
      if (aNode.className && aNode.className() === 'circle') { // viz node
        var cNode = _getClientNode(aNode);
        _vizNodeMap.delete(aNode.getID());
        _clientNodeMap.delete(cNode.id());
      } else { // client node
        var vNode = _getVizNode(aNode);
        _vizNodeMap.delete(vNode.getID());
        _clientNodeMap.delete(aNode.id());
      }
    }

    /**
     * Get or create an id for the edge between the parent and child nodes.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     * @return id - Id of the edge.
     */
    function _edgeID(vizParent, vizChild) {
      if (!vizParent) { return ''; }
      var n1 = vizParent.getID();
      if (!vizChild) { return n1 + '->' + 'null'; }
      var n2 = vizChild.getID();
      if (n2 < n1) {
        n1 = vizChild.getID();
        n2 = vizParent.getID();
      }
      return n1 + '->' + n2;
    }

    /**
     * Add a visualization edge to the tree.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     * @param {Object} edge - Visualization edge.
     */
    function _addEdge(vizParent, vizChild, edge) {
      _edgeMap.set(_edgeID(vizParent, vizChild), edge);
    }

    /**
     * Get the visualization edge between the parent and child nodes.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     * @return edge - Visualization edge between parent and child.
     */
    function _getEdge(vizParent, vizChild) {
      return _edgeMap.get(_edgeID(vizParent, vizChild));
    }

    /**
     * Remove an edge from the tree visualization.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     */
    function _removeEdge(vizParent, vizChild) {
      _edgeMap.delete(_edgeID(vizParent, vizChild));
    }

    /**
     * Get the number of leaves in the tree rooted at node.
     * @param {undefined|Object} node - The root of the subtree.
     */
    function _getLeafCount(node) {
      if (!node) {
        return 0;
      } else if (!node.lChild && !node.rChild) {
        return 1;
      } else {
        return _getLeafCount(node.lChild) + _getLeafCount(node.rChild);
      }
    }

    /**
     * Set the position of the visualization node's label.
     * @param {Object} vizNode - Visualization node.
     */
    function _positionNodeLabel(vizNode) {
      _labelBbox = redraw.getBBox(vizNode.getLabel());
      vizNode.getLabel().setPosX(vizNode.getPosCX());
      vizNode.getLabel().setPosY(vizNode.getPosCY() + .30 * _labelBbox.height);
      vizNode.getLabel().setSpX(vizNode.getLabel().getPosX());
      vizNode.getLabel().setSpY(vizNode.getLabel().getPosY());
    }

    /**
     * Set the x1,y1,x2,y2 position of the edge from vizParent to
     * vizChild.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     * @param {Object} edge - Edge to position.
     */
    function _positionEdge(vizParent, vizChild, edge) {
      var x1 = vizParent.getPosCX();
      var y1 = vizParent.getPosCY();
      var x2 = vizChild.getPosCX();
      var y2 = vizChild.getPosCY();
      var theta1 = Math.atan2(y2 - y1, x2 - x1);
      var theta2 = Math.atan2(y1 - y2, x1 - x2);
      x1 += Math.cos(theta1) * vizParent.getR();
      y1 += Math.sin(theta1) * vizParent.getR();
      x2 += Math.cos(theta2) * vizChild.getR();
      y2 += Math.sin(theta2) * vizChild.getR();
      if (!edge) {
        edge = _getEdge(vizParent, vizChild);
        if (!edge) { edge = _createNewEdge(vizParent, vizChild); }
      }
      edge.setPos(x1,y1,x2,y2);
      edge.setSp(x1,y1,x1,y1);
      edge.setStrokeWidth(1/15 * _radius);
    }

    /**
     * Reposition all nodes in the tree.
     * @param {undefined|Object} rootNode - The root of the subtree.
     */
    function _repositionNodes(rootNode) {
      var treeHeight = _getHeight(rootNode, 0); // sets depths
      if (treeHeight === 0) { treeHeight = 1; }
      _setIndices(rootNode); // sets indices
      var H = _H - 4 * _radius;
      var W = _W - 4 * _radius;
      var q = [rootNode];
      while (q.length > 0) {
        var par = q.shift();
        var x = par.index * W / (Math.pow(2, par.depth) + 1) + 1.7 * _radius;
        var y = par.depth * H / treeHeight + 1.7 * _radius;
        par.setPosCX(x);
        par.setPosCY(y);
        par.setSpCX(x);
        par.setSpCY(y);
        _positionNodeLabel(par);
        if (par.lChild) { q.push(par.lChild); }
        if (par.rChild) { q.push(par.rChild); }
      }
    }

    /**
     * Reposition all edges in the tree.
     * @param {undefined|Object} rootNode - The root of the subtree.
     */
    function _repositionEdges(rootNode) {
      var q = [rootNode];
      while (q.length > 0) {
        var par = q.shift();
        if (par.lChild) {
          _positionEdge(par, par.lChild);
          q.push(par.lChild);
        }
        if (par.rChild) {
          _positionEdge(par, par.rChild);
          q.push(par.rChild);
        }
      }
    }

    /**
     * Reposition the tree based on the size of the canvas, height of
     * the tree, number of nodes in the tree, and the number of leaves
     * in the tree.
     * @param {undefined|Object} rootNode - The root of the subtree.
     */
    function _reposition(rootNode) {
      if (!rootNode) { return; }
      _repositionNodes(rootNode);
      _repositionEdges(rootNode);
    }

    /**
     * Resize all nodes and edges in the tree.
     * Call this after the canvas size changes.
     */
    function _resize(viz) {
      _clientNodeMap.forEach(function(v, k) {
        v.setR(_radius);
        v.setStrokeWidth(1/15 * _radius);
        v.getLabel().setFontSize((1.2 * _radius) + 'px');
        if (v.emphasis) {
          v.emphasis.setPosCX(v.getPosCX());
          v.emphasis.setPosCY(v.getPosCY());
        }
      });
      if (_root) {
        _root.setPosCX(_rootPos.cx);
        _root.setPosCY(_rootPos.cy);
      }
      _reposition(_root);
      redraw.draw(viz, 0);
    }


    ////////////////////////////////////////////////////////////////////////////
    //  public methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Resize the tree and all nodes and edges in the tree based on a new
     * bounding box.
     */
    function resize(viz, bounding_box) {
      _X1 = bounding_box.p1.x;
      _Y1 = bounding_box.p1.y;
      _X2 = bounding_box.p2.x;
      _Y2 = bounding_box.p2.y;
      _W = _X2 - _X1;
      _H = _Y2 - _Y1;
      _radius = Math.min(.5 * _W / 16, .5 * _H / 10);
      _rootPos = {cx:_W / 2, cy:_Y1 + 1.5 * _radius};
      _nextNodePos = {cx:_X1 + 1.5 * _radius, cy:_Y1 + 1.5 * _radius};
      _xOffset = 2 * _radius;
      _yOffset = 3 * _radius;
      _someSpace = .1 * _radius;
      if (viz)
        _resize(viz);
    }

    /**
     * Build a tree given a node to be treated as the root of the tree.
     * @param {Object} clientNode - The node to make the root of the tree.
     */
    function buildTree(clientNode) {
      if (!clientNode) { return; }
      var savedRootNode = saveTreeState(clientNode);
      redraw.addOps(function() {
        var vizNode = _getVizNode(savedRootNode);
        if (vizNode) {
          _buildTree(savedRootNode);
        } else if (!_root) {
          _root = _buildTree(savedRootNode);
        }
        _reposition(_root);
        // if clientNode does not have a corresponding node on the svg
        // canvas and there is already a root node on the canvas then
        // we ignore this call (we don't want to draw two root nodes)
      });
    }

    /**
     * Remove clientNode from the tree.
     * @param {Object} clientNode - The node being removed from the tree.
     */
    function removeNode(clientNode) {
      redraw.addOps(function() {
        _root = _removeNode(_root, null, clientNode);
      });
    }

    /**
     * Remove the node with the minimum value from the canvas.
     * @param {Object} clientRoot - Root of the client subtree.
     */
    function delMinNode() {
      redraw.addOps(function() {
        if (!_root) { return; }
        var minNode = _getMinNode(_root);
        _root = _delMinNode(_root, null);
        _delNodeFromCanvas(minNode);
      });
    }

    /**
     * Set the color of the edge between parent and child nodes.
     *
     * This function expects clientParentChildPairs to be a list where
     * the first two nodes in the list (i.e. pairsList[0] and pairsList[1])
     * are a parent-child pair where the parent appears first and the child
     * appears second. All subsequent pairs follow the same pattern.
     * @param {Object} clientParentChildPairs - Pairs of client nodes [par,chi]
     * @param {String} color - Desired edge color.
     */
    function setEdgesColor(clientParentChildPairs, color) {
      redraw.addOps(function() {
        while (clientParentChildPairs.length > 0) {
          var vizParent = _getVizNode(clientParentChildPairs.shift());
          var vizChild = _getVizNode(clientParentChildPairs.shift());
          if (vizParent && vizChild) {
            _getEdge(vizParent, vizChild).setStroke(color);
          }
        }
      });
    }

    /**
     * Display the next node being added to the tree.
     * @param {Object} clientNode - The node being added to the tree.
     */
    function dispNextNode(clientNode) {
      redraw.addOps(function() {
        var node = _getVizNode(clientNode);
        if (!node) {
          node = _createNewNode(clientNode);
        }
        node.setPos(_nextNodePos.cx, _nextNodePos.cy);
        node.setSp(_nextNodePos.cx, _nextNodePos.cy);
        _positionNodeLabel(node);
        node.isDisplayNode = true;
      });
    }

    /**
     * Set the fill attribute of a node.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {string} color - The new fill color of the nodes.
     */
    function setFill(clientNodes, color) {
      redraw.addOps(function() {
        clientNodes.forEach(function(clientNode) {
          _getVizNode(clientNode).setFill(color);
        });
      });
    }

    /**
     * Set the outline attribute of an node.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {string} color - The new outline color of the nodes.
     */
    function setOutline(clientNodes, color) {
      redraw.addOps(function() {
        clientNodes.forEach(function(clientNode) {
          _getVizNode(clientNode).setStroke(color);
        });
      });
    }

    /**
     * Emphasize nodes.
     * @param {Object[]} clientNodes - The nodes to emphasize.
     */
    function emphasize(clientNodes) {
      redraw.addOps(function() {
        clientNodes.forEach(function(clientNode) {
          if (clientNode) {
            var vizNode = _getVizNode(clientNode);
            if (!vizNode.emphasis) {
              var emphasis = element_factory.getCircle();
              emphasis.setR(1.3 * vizNode.getR())
              emphasis.setStroke(colors.EMPHASIZE);
              emphasis.setStrokeOpacity(75);
              emphasis.setFill(colors.WHITE);
              emphasis.setFillOpacity(0);
              emphasis.setPosCX(vizNode.getPosCX());
              emphasis.setPosCY(vizNode.getPosCY());
              emphasis.setSpCX(vizNode.getPosCX());
              emphasis.setSpCY(vizNode.getPosCY());
              vizNode.emphasis = emphasis;
            }
          }
        });
      });
    }

    /**
     * Move emphasis circle.
     * @param {Object} clientNode1 - The currently emphasized node.
     * @param {Object|null} clientNode2 - The next node to emphasize.
     * @param {-1|1} dir - Direction of xOffset, left or right of parent.
     */
    function moveEmphasis(clientNode1, clientNode2, dir) {
      redraw.addOps(function() {
        var vizNode1 = _getVizNode(clientNode1);
        var emphasis = vizNode1.emphasis;
        if (clientNode2) {
          var vizNode2 = _getVizNode(clientNode2);
          vizNode1.emphasis = null;
          emphasis.setPosCX(vizNode2.getPosCX());
          emphasis.setPosCY(vizNode2.getPosCY());
          vizNode2.emphasis = emphasis;
        } else {
          if (dir < 0) {
            vizNode1.lChild = emphasis;
            _reposition(_root); // trick to get position in advance
            vizNode1.lChild = null;
          } else {
            vizNode1.rChild = emphasis;
            _reposition(_root); // trick to get position in advance
            vizNode1.rChild = null;
          }
          _removeEdge(vizNode1, emphasis);
        }
      });
    }

    /**
     * De-emphasize nodes.
     * @param {Object[]} clientNodes - The nodes to de-emphasize.
     */
    function deemphasize(clientNodes) {
      redraw.addOps(function() {
        clientNodes.forEach(function(clientNode) {
          var vizNode = _getVizNode(clientNode);
          var emphasis = vizNode.emphasis;
          if (emphasis) {
            redraw.removeElem(emphasis.getID());
            vizNode.emphasis = null;
          }
        });
      });
    }

    /**
     * Clear all emphases on tree nodes.
     */
    function clearEmphases() {
      redraw.addOps(function() {
        _clientNodeMap.forEach(function(v, k) {
          if (v.emphasis) {
            v.emphasis.setFillOpacity(0);
            v.emphasis.setStrokeOpacity(0);
            redraw.onNextDrawEnd(redraw.removeElem, v.emphasis.getID());
            redraw.onNextDrawEnd(function() { v.emphasis = null; });
          }
        });
      });
    }

    /**
     * Create or change nodes' labels.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {number|string} newLabel - The nodes' new text label.
     */
    function setLabels(clientNodes, newLabel) {
      redraw.addOps(function() {
        clientNodes.forEach(function(clientNode) {
          _getVizNode(clientNode).getLabel().setVal(newLabel);
        });
      });
    }

    /**
     * Set nodes' text label fill colors.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {string} color - The new text color for these nodes.
     */
    function setLabelFill(clientNodes, color) {
      redraw.addOps(function() {
        clientNodes.forEach(function(clientNode) {
          _getVizNode(clientNode).getLabel().setFill(color);
        });
      });
    }

    /**
     * Get a list of nodes in the tree.
     * The nodes returned are deep copies.
     */
    function getNodes() {
      var nodes = [];
      _clientNodeMap.forEach(function(v, k) {
        nodes.push(v.copy());
      });
      return nodes;
    }

    /**
     * Get a list of edges in the tree.
     * The edges returned are deep copies.
     */
    function getEdges() {
      var edges = [];
      _edgeMap.forEach(function(v, k) {
        edges.push(v.copy());
      });
      return edges;
    }

    /**
     * Gather all rectangles used in this visualization.
     * Used to get a list of all rectangles to draw on the canvas.
     */
    function getRects() {
      return [];
    }

    /**
     * Gather all text elements used in this visualization.
     * Used to get a list of all text to draw on the canvas.
     */
    function getText() {
      var text = [];
      _clientNodeMap.forEach(function(v, k) {
        text.push(v.getLabel());
      });
      return text;
    }

    /**
     * Gather all circles used in this visualization.
     * Used to get a list of all circles to draw on the canvas.
     */
    function getCircles() {
      var circs = [];
      _clientNodeMap.forEach(function(v, k) {
        circs.push(v);
        if (v.emphasis) {
          circs.push(v.emphasis);
        }
      });
      return circs;
    }

    /**
     * Gather all lines used in this visualization.
     * Used to get a list of all lines to draw on the canvas.
     */
    function getLines() {
      var lines = [];
      _edgeMap.forEach(function(v, k) {
        lines.push(v);
      });
      return lines;
    }

    /**
     * Copy the state of the tree rooted at clientNode.
     * @param {Object} clientNode - Client root node of subtree.
     * @return {Object} treeCopy - Copy of subtree.
     */
    function saveTreeState(clientNode) {
      var treeCopy = _copyClientNode(clientNode);
      var localQ = [treeCopy];
      var clientQ = [clientNode];
      while (clientQ.length > 0) {
        var currNode = clientQ.shift();
        var currLocal = localQ.shift();
        if (currNode.lChild()) {
          currLocal.setLChild(_copyClientNode(currNode.lChild()));
          clientQ.push(currNode.lChild());
          localQ.push(currLocal.lChild());
        }
        if (currNode.rChild()) {
          currLocal.setRChild(_copyClientNode(currNode.rChild()));
          clientQ.push(currNode.rChild());
          localQ.push(currLocal.rChild());
        }
      }
      return treeCopy;
    }

    /**
     * Compare node1 to node2.
     * @param {Object} node1 - Node 1 to compare.
     * @param {Object} node2 - Node 2 to compare.
     */
    var compareNodes = function(node1, node2) {
      redraw.addOps(function() {
        var n1 = _getVizNode(node1);
        var n2 = _getVizNode(node2);
        n1.setFill(colors.COMPARE);
        n2.setFill(colors.COMPARE);
        redraw.onNextDrawEnd(n1.setFill, colors.BACKGROUND);
        redraw.onNextDrawEnd(n2.setFill, colors.BACKGROUND);
      });
    }

    ////////////////////////////////////////////////////////////////////////////
    //  return public methods
    ////////////////////////////////////////////////////////////////////////////
    return {
      buildTree:buildTree,
      removeNode:removeNode,
      delMinNode:delMinNode,
      setEdgesColor:setEdgesColor,
      dispNextNode:dispNextNode,
      setFill:setFill,
      setOutline:setOutline,
      emphasize:emphasize,
      moveEmphasis:moveEmphasis,
      deemphasize:deemphasize,
      clearEmphases:clearEmphases,
      getNodes:getNodes,
      getEdges:getEdges,
      setLabelFill:setLabelFill,
      setLabels:setLabels,
      getRects:getRects,
      getText:getText,
      getCircles:getCircles,
      getLines:getLines,
      saveTreeState:saveTreeState,
      compareNodes:compareNodes,
      resize:resize
    };

  }

  //////////////////////////////////////////////////////////////////////////////
  //  public tree_factory methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Get a new binary tree visualization object.
   * @param {undefined|Object} treeRoot - Root of the existing binary tree.
   * @param {Object} bounding_box - The box inside of which to center the tree,
   *                                should be of the form {p1:{x,y}, p2:{x,y}}
   */
  function get_binary_tree(treeRoot, bounding_box) {
    return new Binary_Tree(treeRoot, bounding_box);
  }

  // return public tree_factory methods
  return {
    get_binary_tree:get_binary_tree
  };

})();
