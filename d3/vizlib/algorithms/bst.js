/**
 * bst.java
 * Binary search tree visualization object.
 * @param {Object|null} root - Root node of a binary tree (optional).
 * @param {number} svgW - Width of the svg canvas.
 * @param {number} svgH - Height of the svg canvas.
 */
var bst = (function(root, svgW, svgH) {

  // initialize the svg canvas with groups for svg elements
  redraw.initCanvas(svgCanvasName);

  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var _boundingBox = {
    p1:{x:0, y:0},
    p2:{x:svgW, y:svgH}
  }

  var _tree = tree_factory.get_binary_tree(root, _boundingBox);

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
   * Resize the visualization based on the svg canvas size.
   * @param {number} root - Root node of the client tree.
   * @param {number} root - Root node of the client tree.
   */
  var resize = function(svgW, svgH) {
    _boundingBox = {
      p1:{x:0, y:0},
      p2:{x:svgW, y:svgH}
    }
    _tree.resize(_boundingBox);
  }

  /**
   * Build the tree rooted at root.
   * @param {Object} root - Root node of the client tree.
   */
  var buildTree = function(root) {
    _tree.buildTree(root);
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
    _tree.setEdgesColor(nodePairs, color);
  }

  /**
   * Display the next node to be inserted into the tree. It
   * is displayed in the top left of the bounding box.
   * @param {Object} node - Node to display.
   */
  var dispNextNode = function(node) {
    _tree.dispNextNode(node);
  }

  /**
   * Set the fill of nodes.
   * @param {Object[]} nodes - Nodes to modify.
   * @param {string} color - New color of nodes.
   */
  var setFill = function(nodes, color) {
    _tree.setFill(nodes, color);
  }

  /**
   * Set the outline of nodes.
   * @param {Object[]} nodes - Nodes to modify.
   * @param {string} color - New color of nodes.
   */
  var setOutline = function(nodes) {
    _tree.setOutline(nodes, color);
  }

  /**
   * Emphasize tree nodes.
   * @param {Object[]} nodes - The nodes to emphasize.
   */
  var emphasize = function(nodes) {
    _tree.emphasize(nodes);
  }

  /**
   * Move emphasis.
   * @param {Object} node1 - The node currently emphasized.
   * @param {Object} node2 - The next node to emphasize.
   * @param {-1|1} dir - Direction of x shift if node2 is undefined.
   */
  var moveEmphasis = function(node1, node2, dir) {
    _tree.moveEmphasis(node1, node2, dir);
  }

  /**
   * Clear all emphases on tree nodes.
   */
  var clearEmphases = function() {
    _tree.clearEmphases();
  }

  /**
   * De-emphasize array slots.
   * @param {Object[]} nodes - The nodes to de-emphasize.
   */
  var deemphasize = function(nodes) {
    _tree.deemphasize(nodes);
  }

  /**
   * Update the canvas with the previously called visualization steps.
   * @param {number} duration - Duration per step (in millis).
   */
  function updateCanvas(duration) {
    redraw.addDraw(this, duration);
  }

  /**
   * Play the animation.
   */
  function play() {
    redraw.playAnimation();
  }

  /**
   * Pause the animation.
   */
  function pause() {
    redraw.pauseAnimation();
  }

  /**
   * Take the next step in the animation.
   */
  function step() {
    redraw.stepAnimation();
  }


  //////////////////////////////////////////////////////////////////////////////
  // exposed methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    resize:resize,
    buildTree:buildTree,
    setEdgesColor:setEdgesColor,
    dispNextNode:dispNextNode,
    setFill:setFill,
    setOutline:setOutline,
    emphasize:emphasize,
    moveEmphasis:moveEmphasis,
    deemphasize:deemphasize,
    clearEmphases:clearEmphases,
    getRects:getRects,
    getText:getText,
    getCircles:getCircles,
    getLines:getLines,
    updateCanvas:updateCanvas,
    play:play,
    pause:pause,
    step:step
  }

});
