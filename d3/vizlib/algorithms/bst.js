/**
 * bst.java
 * Binary search tree visualization object.
 * @param {Object|null} root - Root node of a binary tree (optional).
 * @param {number} svgW - Width of the svg canvas.
 * @param {number} svgH - Height of the svg canvas.
 */
var BST = (function(root, svgW, svgH) {
  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var _boundingBox = {
    p1:{x:0, y:0},
    p2:{x:svgW, y:svgH}
  }

  var _tree = tree_factory.get_binary_tree();

  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////

  //element array getters///////////////////////////////////////////////////////
  var getRects = function() {
    return vizlib.getRects(_tree.getRects());
  }

  var getCircles = function() {
    return vizlib.getCircles(_tree.getCircles());
  }

  var getLines = function() {
    return vizlib.getLines(_tree.getLines());
  }

  var getText = function() {
    return vizlib.getText(_tree.getText());
  }
  //end of element array getters////////////////////////////////////////////////

  /**
   * Build the tree rooted at root.
   * @param {Object} root - Root node of the client tree.
   */
  var buildTree = function(root) {
    return function() { _tree.buildTree(root); };
  }

  /**
   * Set the color of the edges in the list. Edges in the list are
   * defined by (parent, child) pairs where the edge from parent to
   * child is modified.
   * The first and second node in the list are assumed to be the first
   * parent child pair, respectively, and so on for all pairs in the
   * list.
   * @param {Object[]} nodePairs - Pairs of nodes identifying edges.
   * @param {string} color - Color to set the edges.
   */
  var setEdgesColor = function(nodePairs, color) {
    return function() { _tree.setEdgesColor(nodePairs, color); };
  }

  /**
   * Display the next node to be inserted into the tree. It
   * is displayed in the top left of the bounding box.
   * @param {Object} node - Node to display.
   */
  var dispNextNode = function(node) {
    return function() { _tree.dispNextNode(node); };
  }

  /**
   * Set the fill of nodes.
   * @param {Object[]} nodes - Nodes to modify.
   * @param {string} color - New color of nodes.
   */
  var setFill = function(nodes, color) {
    return function() { _tree.setFill(nodes, color); };
  }

  /**
   * Set the outline of nodes.
   * @param {Object[]} nodes - Nodes to modify.
   * @param {string} color - New color of nodes.
   */
  var setOutline = function(nodes) {
    return function() { _tree.setOutline(nodes, color); };
  }

  /**
   * Emphasize tree nodes.
   * @param {Object[]} nodes - The nodes to emphasize.
   */
  var emphasize = function(nodes) {
    return function() { _tree.emphasize(nodes); };
  }

  /**
   * Move emphasis.
   * @param {Object} node1 - The node currently emphasized.
   * @param {Object} node2 - The next node to emphasize.
   */
  var moveEmphasis = function(node1, node2) {
    return function() { _tree.moveEmphasis(node1, node2); };
  }

  /**
   * De-emphasize array slots.
   * @param {Object[]} nodes - The nodes to de-emphasize.
   */
  var deemphasize = function(nodes) {
    return function() { _tree.deemphasize(nodes); };
  }


  //////////////////////////////////////////////////////////////////////////////
  // exposed methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    buildTree:buildTree,
    setEdgesColor:setEdgesColor,
    dispNextNode:dispNextNode,
    setFill:setFill,
    setOutline:setOutline,
    emphasize:emphasize,
    moveEmphasis:moveEmphasis,
    deemphasize:deemphasize,
    getRects:getRects,
    getText:getText,
    getCircles:getCircles,
    getLines:getLines,
  }

});
