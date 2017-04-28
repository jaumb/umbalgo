/**
 * linkedbag.java
 * linked bag visualization object.
 * @param {Object} root - The root of any initial linked nodes upon LL creation.
 * @param {number} svgW - Width of the svg canvas.
 * @param {number} svgH - Height of the svg canvas.
 */
var linkedbag = (function(root, svgW, svgH) {

  // initialize the canvas with element groups
  redraw.initCanvas(svgCanvasName);

  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var _boundingBox = {
    p1:{x:0, y:0},
    p2:{x:svgW, y:svgH}
  };

  var _LL = ll_factory.get_LL(root, _boundingBox);


  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////


  //element array getters///////////////////////////////////////////////////////
  var getRects = function() {
    return vizlib.getRects(_LL.getRects());
  };

  var getCircles = function() {
    return vizlib.getCircles(_LL.getCircles());
  };

  var getLines = function() {
    return vizlib.getLines(_LL.getLines());
  };

  var getText = function() {
    return vizlib.getText(_LL.getText());
  };
  //end of element array getters////////////////////////////////////////////////

  var showFirst = function() {
    return redraw.addOps(function() { _LL.showFirst(); });
  };

  var hideFirst = function() {
    return redraw.addOps(function() { _LL.hideFirst(); });
  };

  var showOldFirst = function() {
    return redraw.addOps(function() { _LL.showOldFirst(); });
  };

  var hideOldFirst = function() {
    return redraw.addOps(function() { _LL.hideOldFirst(); });
  };

  var addNodeFront = function(node) {
    return redraw.addOps(function() { _LL.addNodeFront(node); });
  };

  var shiftRight = function() {
    return function() {
      _LL.moveAllNodes(2, 0);
    };
  };

  /**
   * Change the fill color of elements at specified indices.
   * @param {number[]} nodeIDs - Array of nodeIDs.
   * @param {string} color - New fill color for specified indices.
   */
  var setFill = function(nodeIDs, color) {
    return redraw.addOps(function() { _LL.setFill(nodeIDs, color); });
  };

  var setNFill = function(color) {
    return redraw.addOps(function() { _LL.setNFill(color); });
  };

  var addNode = function(node) {
    return redraw.addOps(function() { _LL.addNode(node); });
  };

  var showNode = function(nodeID) {
    return redraw.addOps(function() { _LL.showNodes(nodeID); });
  };

  var showNodeBox = function(nodeID) {
    return redraw.addOps(function() { _LL.showNodeBox(nodeID); });
  };

  var pointFirstAt = function(nodeID) {
    return redraw.addOps(function() { _LL.pointFirstAt(nodeID); });
  };

  var pointOldFirstAt = function(nodeID) {
    return redraw.addOps(function() { _LL.pointOldFirstAt(nodeID); });
  };

  var pointOldFirstAtFirst = function(nodeID) {
    return redraw.addOps(function() { _LL.pointOldFirstAtFirst(); });
  };

  var showNodeLabel = function(nodeID) {
    return redraw.addOps(function() { _LL.showNodeLabels(nodeID); });
  };

  var showNodeArrow = function(nodeID) {
    return redraw.addOps(function() { _LL.showNodeArrows(nodeID); });
  };

  var pointNodeAtOldfirst = function(nodeID) {
    return redraw.addOps(function() { _LL.pointNodeAtOldfirst(nodeID); });
  };

  var hideNLabel = function() {
    return redraw.addOps(function() { _LL.hideNLabel(); });
  };

  var showNLabel = function() {
    return redraw.addOps(function() { _LL.showNLabel(); });
  };

  var updateN = function() {
    return redraw.addOps(function() { _LL.updateN(); });
  };

  /**
   * Update the canvas with the previously called visualization steps.
   * @param {number} duration - Duration per step (in millis).
   */
  function updateCanvas(duration) {
    redraw.addDraw(this, duration);
  }

  /**
   * Toggle the animation.
   */
  function playpause() {
    redraw.toggleAnimation();
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
    addNodeFront:addNodeFront,
    showNode:showNode,
    showNodeBox:showNodeBox,
    showNodeLabel:showNodeLabel,
    showNodeArrow:showNodeArrow,
    pointNodeAtOldfirst:pointNodeAtOldfirst,
    pointFirstAt:pointFirstAt,
    pointOldFirstAt:pointOldFirstAt,
    pointOldFirstAtFirst:pointOldFirstAtFirst,
    showFirst:showFirst,
    hideFirst:hideFirst,
    showOldFirst:showOldFirst,
    hideOldFirst:hideOldFirst,
    hideNLabel:hideNLabel,
    showNLabel:showNLabel,
    updateN:updateN,
    shiftRight:shiftRight,
    setFill:setFill,
    setNFill:setNFill,
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    updateCanvas:updateCanvas,
    playpause:playpause,
    step:step
  };

});
