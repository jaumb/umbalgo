/**
 * Insertion.java
 * Insertion Sort visualization object.
 * @param {number[]|string[]} elems - Elements to sort.
 * @param {number} svgW - Width of the svg canvas.
 * @param {number} svgH - Height of the svg canvas.
 */
var linkedbag = (function(elems, svgW, svgH) {
  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var _boundingBox = {
    p1:{x:0, y:0},
    p2:{x:svgW, y:svgH}
  };

  var _LL = ll_factory.get_LL(elems, _boundingBox);


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

  var showOldFirst = function() {
    return function() { _LL.showOldFirst(); };
  };

  var hideOldFirst = function() {
    return function() { _LL.hideOldFirst(); };
  };

  var addNodeFront = function(node) {
    return function() { _LL.addNodeFront(node); };
  };

  var shiftRight = function() {
    return function() {
      _LL.moveNodes(2 * _boxSize, 0);
      firstNode.refArrow.setPosX2(firstNode.refArrow.getPosX2() + 2 * _boxSize);
      oldfirstNode.refArrow.setPosX2(oldfirstNode.refArrow.getPosX2() + 2 * _boxSize);
    };
  };

  /**
   * Change the fill color of elements at specified indices.
   * @param {number[]} nodeIDs - Array of nodeIDs.
   * @param {string} color - New fill color for specified indices.
   */
  var setFill = function(nodeIDs, color) {
    return function() { _LL.setFill(nodeIDs, color); };
  };

  /**
   * Change the fill color of the "first" node.
   * @param {string} color - New fill color for specified indices.
   */
  var setFirstFill = function(color) {
    return function() {
      firstNode.contentBox.setFill(color);
      firstNode.refBox.setFill(color);
    };
  };

  /**
   * Set val of label property for elements at specified indices.
   * @param {number[]} indices - Indices of elements to get new val.
   * @param {string} val - Value to give to elements at specified indexes.
   */
  var setLabels = function(indices, val) {
    return function() { _LL.setLabels(indices, val); };
  };

  /**
   * Emphasize array slots.
   * @param {number[]} indices - The indices of the slots to emphasize.
   */
  var emphasize = function(indices) {
    return function() { _LL.emphasize(indices); };
  };

  /**
   * Move emphasis box.
   * @param {number} i - The index of the emphasized slot.
   * @param {number} j - The index of the slot to emphasize.
   */
  var moveEmphasis = function(i, j) {
    return function() { _LL.moveEmphasis(i, j); };
  };

  /**
   * De-emphasize array slots.
   * @param {number[]} indices - The indices of the slots to de-emphasize.
   */
  var deemphasize = function(indices) {
    return function() { _LL.deemphasize(indices); };
  };

  var addNode = function(node) {
    return function() { _LL.addNode(node); };
  };

  var showNode = function(nodeID) {
    return function() { _LL.showNode(nodeID); };
  };

  var showNodeBox = function(nodeID) {
    return function() { _LL.showNodeBox(nodeID); };
  };

  var pointFirstAt = function(nodeID) {
    return function() { _LL.pointFirstAt(nodeID); };
  };

  var pointOldFirstAtFirst = function(nodeID) {
    return function() { _LL.pointOldFirstAtFirst(); };
  };

  var showNodeLabel = function(nodeID) {
    return function() { _LL.showNodeLabel(nodeID); };
  };

  var pointNodeAtOldfirst = function(nodeID) {
    return function() { _LL.pointNodeAtOldfirst(nodeID); };
  };

  var hideNLabel = function() {
    return function() { _LL.hideNLabel(); };
  };

  var showNLabel = function() {
    return function() { _LL.showNLabel(); };
  };

  var updateN = function() {
    return function() { _LL.updateN(); };
  };


  //////////////////////////////////////////////////////////////////////////////
  // exposed methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    addNodeFront:addNodeFront,
    showNode:showNode,
    showNodeBox:showNodeBox,
    showNodeLabel:showNodeLabel,
    pointNodeAtOldfirst:pointNodeAtOldfirst,
    pointFirstAt:pointFirstAt,
    pointOldFirstAtFirst:pointOldFirstAtFirst,
    showOldFirst:showOldFirst,
    hideOldFirst:hideOldFirst,
    hideNLabel:hideNLabel,
    showNLabel:showNLabel,
    updateN:updateN,
    shiftRight:shiftRight,
    setFill:setFill,
    setFirstFill:setFirstFill,
    setLabels:setLabels,
    emphasize:emphasize,
    moveEmphasis:moveEmphasis,
    deemphasize:deemphasize,
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText
  };

});
