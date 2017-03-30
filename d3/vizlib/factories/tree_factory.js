
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
    var map = {};
    var _radius = 1 / 2 * _W / 16;
    var _root = null;
    var _rootPos = {cx:_W / 2, cy:_Y1 + 1.5 * _radius};
    var _nextNodePos = {cx:_X1 + 1.5 * _radius, cy:_Y1 + 1.5 * _radius};

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
      map[clientNode.id()] = newNode;
      newNode.setStrokeWidth('.3vw');
      newNode.getLabel().setVal(clientNode.val());
      newNode.getLabel().setFontSize((1.2 * _radius) + 'px');
      newNode.setPos(cx, cy);
      newNode.setSpCX(newNode.getPosCX());
      newNode.setSpCY(newNode.getPosCY());
      var labelBbox = redraw.getBBox(newNode.getLabel());
      newNode.getLabel().setPosX(newNode.getPosCX());
      newNode.getLabel().setPosY(newNode.getPosCY() + 1/2 * labelBbox.height);
      newNode.getLabel().setSpX(newNode.getLabel().getPosX());
      newNode.getLabel().setSpY(newNode.getLabel().getPosY());
      return newNode;
    }

    /**
     * Create a new binary tree given the root of a subtree.
     * @param {Object} clientNode - Root of the subtree.
     * @param {Object} vizParentNode - Parent node of the root of this subtree.
     */
    function _buildTree(clientNode, vizParentNode) {
      var root = map[clientNode.id()];
      if (root) {
        root = _createNode(clientNode);
        if (vizParentNode) {
          root.setPosCX(vizParentNode.getPosCX() + xOffset);
          root.setPosCY(vizParentNode.getPosCY() + 3 * _radius);
        } else {
          root.setPosCX(_rootPos.cx);
          root.setPosCY(_rootPos.cy);
        }
        if (clientNode.lChild && clientNode.lChild()) {
          root.lChild = _buildTree(clientNode.lChild(), root, -2 * _radius);
        }
        if (clientNode.rChild && clientNode.rChild()) {
          root.rChild = _buildTree(clientNode.rChild(), root, 2 * _radius);
        }
      } else if (!vizParentNode) {

      } else {
        root = _createNewNode(clientNode, vizParentNode.getPosCX());
      }
      return root;
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
     * Reposition the tree based on the size of the canvas, height of
     * the tree, number of nodes in the tree, and the number of leaves
     * in the tree.
     * @param {undefined|Object} root - The root of the subtree to reposition.
     */
    function _reposition(node) {
      if (!node) { return; }

      var leafCount = _getLeafCount(node);
      if (node.lChild) {
        node.lChild.setPosCX((node.getPosX() - _radius) -
        (_getHeight(_root) - _getHeight(node.lChild)) * _W * (leafCount-1)/2);
        _reposition(node.lChild);
      }
      if (node.rChild) {
        node.rChild.setPosCX((node.getPosX() + _radius) +
        (_getHeight(_root) - _getHeight(node.rChild)) * _W * (leafCount-1)/2);
        _reposition(node.rChild);
      }
    }


    ////////////////////////////////////////////////////////////////////////////
    //  public methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Build a tree given a node to be treated as the root of the tree.
     * Does nothing if this tree already has a root.
     * @param {Object} clientNode - The node to make the root of the tree.
     */
    function addRoot(clientNode) {
      if (!_root) {
        _root = _buildTree(clientNode);
      }
    }

    /**
     * Make child the right child of node.
     * @param {Object} clientNode - The node getting a child.
     * @param {Object} clientChildNode - The child node to add.
     */
    function addRChild(clientNode, clientChildNode) {
      if 
    }

    /**
     * Make child the left child of node.
     * @param {Object} clientNode - The node getting a child.
     * @param {Object} clientChildNode - The child node to add.
     */
    function addLChild(clientNode, clientChildNode) {
    }

    /**
     * Display the next node being added to the tree.
     * @param {Object} clientNode - The node being added to the tree.
     */
    function dispNextNode(clientNode) {
    }

    /**
     * Set the fill attribute of a node.
     * @param {Object[]} nodes - The nodes to modify.
     * @param {string} color - The new fill color of the nodes.
     */
    function setFill(nodes, color) {
      nodes.forEach(function(clientNode) {
      });
    }

    /**
     * Set the outline attribute of an node.
     * @param {Object[]} nodes - The nodes to modify.
     * @param {string} color - The new outline color of the nodes.
     */
    function setOutline(nodes, color) {
      nodes.forEach(function(clientNode) {
      });
    }

    /**
     * Emphasize nodes.
     * @param {Object[]} nodes - The nodes to emphasize.
     */
    function emphasize(nodes) {
      nodes.forEach(function(clientNode) {
      });
    }

    /**
     * Move emphasis circle.
     * @param {Object} node1 - The currently emphasized node.
     * @param {Object} node2 - The next node to emphasize.
     */
    function moveEmphasis(node1, node2) {
    }

    /**
     * De-emphasize nodes.
     * @param {Object[]} nodes - The nodes to de-emphasize.
     */
    function deemphasize(nodes) {
      nodes.forEach(function(clientNode) {
      });
    }

    /**
     * Get a list of nodes in the tree.
     * The nodes returned are deep copies.
     */
    function getNodes() {
      var nodes = [];
      return nodes;
    }

    /**
     * Get a list of edges in the tree.
     * The edges returned are deep copies.
     */
    function getEdges() {
      var edges = [];
      return edges;
    }

    /**
     * Create or change a nodes' labels.
     * @param {Object[]} nodes - The nodes to modify.
     * @param {number|string} new_label - The nodes' new text label.
     */
    function setLabels(nodes, new_label) {
      nodes.forEach(function(clientNode) {
      });
    }

    /**
     * Set nodes' text label fill colors.
     * @param {Object[]} nodes - The nodes to modify.
     * @param {string} color - The new text color for these nodes.
     */
    function setLabelFill(nodes, color) {
      nodes.forEach(function(clientNode) {
      });
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
      return text;
    }

    /**
     * Gather all circles used in this visualization.
     * Used to get a list of all circles to draw on the canvas.
     */
    function getCircles() {
      var circs = [];
      return circs;
    }

    /**
     * Gather all lines used in this visualization.
     * Used to get a list of all lines to draw on the canvas.
     */
    function getLines() {
      var lines = [];
      return lines;
    }

    ////////////////////////////////////////////////////////////////////////////
    //  return public methods
    ////////////////////////////////////////////////////////////////////////////
    return {
      addRoot:addRoot,
      addRChild:addRChild,
      addLChild:addLChild,
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
      getLines:getLines,
    };

  }

  //////////////////////////////////////////////////////////////////////////////
  //  public tree_factory methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Get a new binary tree visualization object.
   * @param {undefined|Object} treeRoot - Root of the existing binary tree.
   * @param {Object} bounding_box - The box inside of which to center the tree.
   */
  function get_binary_tree(treeRoot, bounding_box) {
    return new Binary_Tree(treeRoot, bounding_box);
  }

  // return public tree_factory methods
  return {
    get_binary_tree:get_binary_tree
  };

})();
