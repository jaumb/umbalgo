/**
 * linkedqueue.java
 * linked queue visualization object.
 * @param {number[]|string[]} root - Initial elements in the linked list.
 * @param {number} svgW - Width of the svg canvas.
 * @param {number} svgH - Height of the svg canvas.
 */
var linkedqueue = (function(root, svgW, svgH) {

  // initialize the svg canvas with svg element groups (rects, circles, etc.)
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

  var showLast = function() {
    return redraw.addOps(function() { _LL.showLast(); });
  };

  var hideLast = function() {
    return redraw.addOps(function() { _LL.hideLast(); });
  };

  var showOldLast = function() {
    return redraw.addOps(function() { _LL.showOldLast(); });
  };

  var hideOldLast = function() {
    return redraw.addOps(function() { _LL.hideOldLast(); });
  };

  var addNodeLeft = function(node) {
    return redraw.addOps(function() { _LL.addNodeLeft(node); });
  };

  var addNodeRight = function(node) {
    return redraw.addOps(function() { _LL.addNodeRight(node); });
  };

  var removeFirstNode = function() {
    return redraw.addOps(function() { _LL.removeFirstNode(); });
  };

  var shiftRight = function() {
    return function() {
      _LL.moveAllNodes(2, 0);
    };
  };

  var shiftLeft = function() {
    return function() {
      _LL.moveAllNodes(-2, 0);
    }
  }

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

  var hideNode = function(nodeID) {
    return redraw.addOps(function() { _LL.hideNodes(nodeID); });
  };

  var showNodeBox = function(nodeID) {
    return redraw.addOps(function() { _LL.showNodeBox(nodeID); });
  };

  var pointFirstAt = function(nodeID) {
    return redraw.addOps(function() { _LL.pointFirstAt(nodeID); });
  };

  var pointLastAt = function(nodeID) {
    return redraw.addOps(function() { _LL.pointLastAt(nodeID); });
  };

  var pointOldFirstAt = function(nodeID) {
    return redraw.addOps(function() { _LL.pointOldFirstAt(nodeID); });
  };

  var pointOldLastAt = function(nodeID) {
    return redraw.addOps(function() { _LL.pointOldLastAt(nodeID); });
  };

  var pointOldFirstAtFirst = function(nodeID) {
    return redraw.addOps(function() { _LL.pointOldFirstAtFirst(); });
  };

  var pointOldLastAtLast = function(nodeID) {
    return redraw.addOps(function() { _LL.pointOldLastAtLast(); });
  };

  var showNodeLabel = function(nodeID) {
    return redraw.addOps(function() { _LL.showNodeLabels(nodeID); });
  };

  var showNodeArrow = function(nodeID) {
    return redraw.addOps(function() { _LL.showNodeArrows(nodeID); });
  };

  var hideNodeArrow = function(nodeID) {
    return redraw.addOps(function() { _LL.hideNodeArrows(nodeID); });
  }

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
    showNode:showNode,
    hideNode:hideNode,
    showNodeBox:showNodeBox,
    showNodeLabel:showNodeLabel,
    showNodeArrow:showNodeArrow,
    hideNodeArrow:hideNodeArrow,
    pointNodeAtOldfirst:pointNodeAtOldfirst,
    pointFirstAt:pointFirstAt,
    pointLastAt:pointLastAt,
    pointOldFirstAt:pointOldFirstAt,
    pointOldLastAt:pointOldLastAt,
    pointOldFirstAtFirst:pointOldFirstAtFirst,
    pointOldLastAtLast:pointOldLastAtLast,
    showFirst:showFirst,
    hideFirst:hideFirst,
    showOldFirst:showOldFirst,
    hideOldFirst:hideOldFirst,
    showLast:showLast,
    hideLast:hideLast,
    showOldLast:showOldLast,
    hideOldLast:hideOldLast,
    addNodeLeft:addNodeLeft,
    addNodeRight:addNodeRight,
    removeFirstNode:removeFirstNode,
    hideNLabel:hideNLabel,
    showNLabel:showNLabel,
    updateN:updateN,
    shiftRight:shiftRight,
    shiftLeft:shiftLeft,
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
