
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

    var _X1 = bounding_box.p1.x;
    var _Y1 = bounding_box.p1.y;
    var _X2 = bounding_box.p2.x;
    var _Y2 = bounding_box.p2.y;
    var _W = _X2 - _X1;
    var _H = _Y2 - _Y1;
    var _nodeMap = {};
    var _edgeMap = {};
    var _radius = 1 / 2 * _W / 16;
    var _root = null;
    var _rootPos = {cx:_W / 2, cy:_Y1 + 1.5 * _radius};
    var _nextNodePos = {cx:_X1 + 1.5 * _radius, cy:_Y1 + 1.5 * _radius};
    var _xOffset = 2 * _radius;
    var _yOffset = 3 * _radius;
    var _labelBbox = null;
    var _someSpace = .1 * _radius;

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
    function _createNewNode(clientNode, cx, cy) {
      var newNode = element_factory.getCircle();
      newNode.setR(_radius);
      newNode.setStrokeWidth('.3vw');
      newNode.getLabel().setVal(clientNode.val());
      newNode.getLabel().setFontSize((1.2 * _radius) + 'px');
      newNode.setPosCX(cx);
      newNode.setPosCY(cy);
      newNode.setSpCX(newNode.getPosCX());
      newNode.setSpCY(newNode.getPosCY());
      _positionNodeLabel(newNode);
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
      newEdge.setStrokeWidth('.3vw');
      _positionEdge(vizParent, vizChild, newEdge);
      _addEdge(vizParent, vizChild, newEdge);
      return newEdge;
    }

    /**
     * Create a new binary tree given the root of a subtree.
     * @param {Object} clientNode - Root of the subtree.
     * @param {Object} vizParentNode - Parent node of the root of this subtree.
     * @param {number} dir - Direction of x axis offset (-1 | 1).
     */
    function _buildTree(clientNode, vizParentNode, dir) {
      if (!clientNode) { return null; }
      var vizNode = _getVizNode(clientNode);
      if (vizNode) {
        if (vizParentNode) {
          vizNode.setPosCX(vizParentNode.getPosCX() + dir * _xOffset);
          vizNode.setPosCY(vizParentNode.getPosCY() + _yOffset);
          _positionEdge(vizParentNode, vizNode);
        } else if (vizNode.isDisplayNode && !_root) {
          vizNode.setPosCX(_rootPos.cx);
          vizNode.setPosCY(_rootPos.cy);
          _root = vizNode;
        }
      } else {
        vizNode = _createNewNode(clientNode, _rootPos.cx, _rootPos.cy);
        if (vizParentNode) {
          vizNode.setPosCX(vizParentNode.getPosCX() + dir * _xOffset);
          vizNode.setPosCY(vizParentNode.getPosCY() + _yOffset);
          vizNode.setSpCX(vizNode.getPosCX());
          vizNode.setSpCY(vizNode.getPosCY());
          _positionNodeLabel(vizNode);
          _createNewEdge(vizParentNode, vizNode);
        } else {
          _root = vizNode;
        }
      }
      vizNode.isDisplayNode = false;
      vizNode.lChild = _buildTree(clientNode.lChild(), vizNode, -1);
      vizNode.rChild = _buildTree(clientNode.rChild(), vizNode, 1);
      return vizNode;
    }

    /**
     * Get the height of the tree rooted at node.
     * @param {undefined|Object} node - Root of the subtree.
     */
    function _getHeight(node) {
      var height = 0;
      if (node) {
        height = _getHeight(node.lChild) + _getHeight(node.rChild);
      }
      return height;
    }

    /**
     * Add a visualization node to the visualization's tree that
     * corresponds to a client's node.
     * @param {Object} clientNode - Client's tree node object.
     * @param {Object} vizNode - A visualization node.
     */
    function _addVizNode(clientNode, vizNode) {
      _nodeMap[clientNode.id()] = vizNode;
    }

    /**
     * Get the visualization node corresponding to the client
     * node.
     * @param {Object} clientNode - Client's tree node object.
     * @return vizNode - Visualization node.
     */
    function _getVizNode(clientNode) {
      return _nodeMap[clientNode.id()];
    }

    /**
     * Remove a node from the visualization.
     * @param {Object} clientNode - Client's tree node object.
     */
    function _removeVizNode(clientNode) {
      delete _nodeMap[clientNode.id()];
    }

    /**
     * Get or create an id for the edge between the parent and child nodes.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     * @return id - Id of the edge.
     */
    function _edgeID(vizParent, vizChild) {
      var n1 = vizParent.getID();
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
      _edgeMap[_edgeID(vizParent, vizChild)] = edge;
    }

    /**
     * Get the visualization edge between the parent and child nodes.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     * @return edge - Visualization edge between parent and child.
     */
    function _getEdge(vizParent, vizChild) {
      return _edgeMap[_edgeID(vizParent, vizChild)];
    }

    /**
     * Remove an edge from the tree visualization.
     * @param {Object} vizParent - Visualization parent node.
     * @param {Object} vizChild - Visualization child node.
     */
    function _removeEdge(vizParent, vizChild) {
      delete _edgeMap[_edgeID(vizParent, vizChild)];
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
      if (_labelBbox === null)
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
    }

    /**
     * Reposition all nodes in the tree.
     * @param {undefined|Object} root - The root of the subtree to reposition.
     */
    function _repositionNodes(node, dir) {
      var leafCount = _getLeafCount(node);
      if (node.lChild) {
        node.lChild.setPosCX((node.getPosCX() - _radius - _someSpace) -
                      ((_getHeight(_root) - _getHeight(node.lChild)) *
                                  _W * (leafCount-1)/2));
        _repositionNodes(node.lChild, -1);
      }
      if (node.rChild) {
        node.rChild.setPosCX((node.getPosCX() + _radius + _someSpace) +
                      ((_getHeight(_root) - _getHeight(node.rChild)) *
                                  _W * (leafCount-1)/2));
        _repositionNodes(node.rChild, 1);
      }
      node.setSpCX(node.getPosCX());
      _positionNodeLabel(node);
    }

    /**
     * Reposition all edges in the tree.
     * @param {undefined|Object} root - The root of the subtree to reposition.
     */
    function _repositionEdges(node, vizParentNode) {
      if (!node) { return; }
      else if (vizParentNode) { _positionEdge(vizParentNode, node); }
      _repositionEdges(node.lChild, node);
      _repositionEdges(node.rChild, node);
    }

    /**
     * Reposition the tree based on the size of the canvas, height of
     * the tree, number of nodes in the tree, and the number of leaves
     * in the tree.
     * @param {undefined|Object} root - The root of the subtree to reposition.
     */
    function _reposition(node) {
      if (!node) { return; }
      _repositionNodes(node);
      _repositionEdges(node);
    }


    ////////////////////////////////////////////////////////////////////////////
    //  public methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Build a tree given a node to be treated as the root of the tree.
     * @param {Object} clientNode - The node to make the root of the tree.
     */
    function buildTree(clientNode) {
      var vizNode = _getVizNode(clientNode);
      if (vizNode) {
        _buildTree(clientNode);
      } else if (!_root) {
        _root = _buildTree(clientNode);
      }
      _reposition(_root);
      // if clientNode does not have a corresponding node on the svg
      // canvas and there is already a root node on the canvas then
      // we ignore this call (we don't want to draw two root nodes)
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
      while (clientParentChildPairs.length > 0) {
        var vizParent = _getVizNode(clientParentChildPairs.shift());
        var vizChild = _getVizNode(clientParentChildPairs.shift());
        if (vizParent && vizChild) {
          _getEdge(vizParent, vizChild).setStroke(color);
        }
      }
    }

    /**
     * Display the next node being added to the tree.
     * @param {Object} clientNode - The node being added to the tree.
     */
    function dispNextNode(clientNode) {
      var node = _getVizNode(clientNode);
      if (!node) {
        node = _createNewNode(clientNode, _nextNodePos.cx, _nextNodePos.cy);
      }
      node.isDisplayNode = true;
    }

    /**
     * Set the fill attribute of a node.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {string} color - The new fill color of the nodes.
     */
    function setFill(clientNodes, color) {
      clientNodes.forEach(function(clientNode) {
        _getVizNode(clientNode).setFill(color);
      });
    }

    /**
     * Set the outline attribute of an node.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {string} color - The new outline color of the nodes.
     */
    function setOutline(clientNodes, color) {
      clientNodes.forEach(function(clientNode) {
        _getVizNode(clientNode).setStroke(color);
      });
    }

    /**
     * Emphasize nodes.
     * @param {Object[]} clientNodes - The nodes to emphasize.
     */
    function emphasize(clientNodes) {
      clientNodes.forEach(function(clientNode) {
        var vizNode = _getVizNode(clientNode);
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
      });
    }

    /**
     * Move emphasis circle.
     * @param {Object} clientNode1 - The currently emphasized node.
     * @param {Object} clientNode2 - The next node to emphasize.
     */
    function moveEmphasis(clientNode1, clientNode2) {
      var vizNode1 = _getVizNode(clientNode1);
      var vizNode2 = _getVizNode(clientNode2);
      var emphasis = vizNode1.emphasis;
      if (emphasis) {
        vizNode1.emphasis = null;
        emphasis.setPosCX(vizNode2.getPosCX());
        emphasis.setPosCY(vizNode2.getPosCY());
      }
    }

    /**
     * De-emphasize nodes.
     * @param {Object[]} clientNodes - The nodes to de-emphasize.
     */
    function deemphasize(clientNodes) {
      clientNodes.forEach(function(clientNode) {
        var vizNode = _getVizNode(clientNode);
        var emphasis = vizNode.emphasis;
        if (emphasis) {
          redraw.removeElem(emphasis.getID());
          vizNode.emphasis = null;
        }
      });
    }

    /**
     * Create or change nodes' labels.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {number|string} newLabel - The nodes' new text label.
     */
    function setLabels(clientNodes, newLabel) {
      clientNodes.forEach(function(clientNode) {
        _getVizNode(clientNode).getLabel().setVal(newLabel);
      });
    }

    /**
     * Set nodes' text label fill colors.
     * @param {Object[]} clientNodes - The nodes to modify.
     * @param {string} color - The new text color for these nodes.
     */
    function setLabelFill(clientNodes, color) {
      clientNodes.forEach(function(clientNode) {
        _getVizNode(clientNode).getLabel().setFill(color);
      });
    }

    /**
     * Get a list of nodes in the tree.
     * The nodes returned are deep copies.
     */
    function getNodes() {
      var nodes = [];
      for (var key in _nodeMap) {
        if (_nodeMap.hasOwnProperty(key)) {
          nodes.push(_nodeMap[key].copy());
        }
      }
      return nodes;
    }

    /**
     * Get a list of edges in the tree.
     * The edges returned are deep copies.
     */
    function getEdges() {
      var edges = [];
      for (var key in _edgeMap) {
        if (_edgeMap.hasOwnProperty(key)) {
          edges.push(_edgeMap[key].copy());
        }
      }
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
      for (var key in _nodeMap) {
        if (_nodeMap.hasOwnProperty(key)) {
          text.push(_nodeMap[key].getLabel());
        }
      }
      return text;
    }

    /**
     * Gather all circles used in this visualization.
     * Used to get a list of all circles to draw on the canvas.
     */
    function getCircles() {
      var circs = [];
      for (var key in _nodeMap) {
        if (_nodeMap.hasOwnProperty(key)) {
          circs.push(_nodeMap[key]);
          if (_nodeMap[key].emphasis) {
            circs.push(_nodeMap[key].emphasis);
          }
        }
      }
      return circs;
    }

    /**
     * Gather all lines used in this visualization.
     * Used to get a list of all lines to draw on the canvas.
     */
    function getLines() {
      var lines = [];
      for (var key in _edgeMap) {
        if (_edgeMap.hasOwnProperty(key)) {
          lines.push(_edgeMap[key]);
        }
      }
      return lines;
    }

    ////////////////////////////////////////////////////////////////////////////
    //  return public methods
    ////////////////////////////////////////////////////////////////////////////
    return {
      buildTree:buildTree,
      setEdgesColor:setEdgesColor,
      dispNextNode:dispNextNode,
      setFill:setFill,
      setOutline:setOutline,
      emphasize:emphasize,
      moveEmphasis:moveEmphasis,
      deemphasize:deemphasize,
      getNodes:getNodes,
      getEdges:getEdges,
      setLabelFill:setLabelFill,
      setLabels:setLabels,
      getRects:getRects,
      getText:getText,
      getCircles:getCircles,
      getLines:getLines
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
