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

  // the contentBox of the first node in the LL
  var _first = _LL.getSlots()[0].contentBox;
  var _boxSize = _first.getHeight();

  // assemble the object "first" which points to the first node in the LL///////
  var fText = element_factory.getText();
  fText.setVal('first');
  fText.setPosX()


  var fContent = element_factory.getRect();
  fContent.getLabel().setVal('first');
  fContent.setHeight(_boxSize);
  fContent.setWidth(_boxSize);
  fContent.setPosX(_first.getPosX());
  fContent.setPosY(_first.getPosY() - 2 * _boxSize);
  // TODO: use getBBox to determine font size here?
  fContent.getLabel().setFontSize((0.5 * fContent.getWidth()) + 'px');
  fContent.getLabel().setPosX(fContent.getPosX() + 0.5 * _boxSize);
  fContent.getLabel().setPosY(fContent.getPosY() + 0.72 * _boxSize);

  // the ref arrow box
  var fRef = element_factory.getRect();
  fRef.setPosX(fContent.getPosX());
  fRef.setPosY(fContent.getPosY() + _boxSize);
  fRef.setSpX(fRef.getPosX());
  fRef.setSpY(fRef.getPosY());
  fRef.setWidth(_boxSize);
  fRef.setHeight(0.5 * _boxSize);
  fRef.setStrokeWidth('.3vw');
  fRef.getLabel().setVisibility('hidden');

  var fArrow = element_factory.getLine();
  fArrow.setPosX1(fRef.getCenter().x);
  fArrow.setPosY1(fRef.getCenter().y);
  fArrow.setSpX1(fArrow.getPosX1());
  fArrow.setSpY1(fArrow.getPosY1());
  fArrow.setPosX2(_LL.getSlots()[0].contentBox.getCenter().x);
  fArrow.setPosY2(_LL.getSlots()[0].contentBox.getCenter().y - 0.5 * _boxSize);
  fArrow.setSpX2(fArrow.getPosX2());
  fArrow.setSpY2(fArrow.getPosY2());

  var firstNode = {
    id:'first',
    nextID: 1,
    contentBox:fContent,
    refBox:fRef,
    refArrow:fArrow
  };
  // end creation of "first" node //////////////////////////////////////////////

  // assemble the node "oldfirst" which points to the first node in the LL//////
  var oldfContent = element_factory.getRect();
  oldfContent.getLabel().setVal('oldf');
  oldfContent.setHeight(_boxSize);
  oldfContent.setWidth(_boxSize);
  oldfContent.setPosX(_first.getPosX() + 2 * _boxSize);
  oldfContent.setPosY(firstNode.contentBox.getPosY());
  // TODO: use getBBox to determine font size here?
  oldfContent.getLabel().setFontSize((0.5 * fContent.getWidth()) + 'px');
  oldfContent.getLabel().setPosX(oldfContent.getCenter().x);
  oldfContent.getLabel().setPosY(oldfContent.getPosY() + 0.72 * _boxSize);
  oldfContent.getLabel().setFillOpacity(0);
  oldfContent.getLabel().setStrokeOpacity(0);
  oldfContent.setFillOpacity(0);
  oldfContent.setStrokeOpacity(0);

  // the ref arrow box
  var oldfRef = element_factory.getRect();
  oldfRef.setPosX(oldfContent.getPosX());
  oldfRef.setPosY(oldfContent.getPosY() + _boxSize);
  oldfRef.setSpX(oldfRef.getPosX());
  oldfRef.setSpY(oldfRef.getPosY());
  oldfRef.setWidth(_boxSize);
  oldfRef.setHeight(0.5 * _boxSize);
  oldfRef.setStrokeWidth('.3vw');
  oldfRef.setFillOpacity(0);
  oldfRef.setStrokeOpacity(0);

  var oldfArrow = element_factory.getLine();
  oldfArrow.setPosX1(oldfRef.getCenter().x);
  oldfArrow.setPosY1(oldfRef.getCenter().y);
  oldfArrow.setSpX1(oldfArrow.getPosX1());
  oldfArrow.setSpY1(oldfArrow.getPosY1());
  oldfArrow.setPosX2(_LL.getSlots()[0].contentBox.getCenter().x + 0.5 * _boxSize);
  oldfArrow.setPosY2(_LL.getSlots()[0].contentBox.getCenter().y - 0.5 * _boxSize);
  oldfArrow.setSpX2(oldfArrow.getPosX2());
  oldfArrow.setSpY2(oldfArrow.getPosY2());
  oldfArrow.setOpacity(0);

  var oldfirstNode = {
    id:'oldfirst',
    nextID:1,
    contentBox:oldfContent,
    refBox:oldfRef,
    refArrow:oldfArrow
  };
  // end creation of "oldfirst" node ///////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////


  //element array getters///////////////////////////////////////////////////////
  var getRects = function() {
    return vizlib.getRects(_LL.getRects(),
                           firstNode.contentBox,
                           firstNode.refBox,
                           oldfirstNode.contentBox,
                           oldfirstNode.refBox);
  };

  var getCircles = function() {
    return vizlib.getCircles(_LL.getCircles());
  };

  var getLines = function() {
    return vizlib.getLines(_LL.getLines(),
                           firstNode.refArrow,
                           oldfirstNode.refArrow);
  };

  var getText = function() {
    var text = [];
    return vizlib.getText(_LL.getText(),
                          firstNode.contentBox.getLabel(),
                          oldfirstNode.contentBox.getLabel());
  };
  //end of element array getters////////////////////////////////////////////////

  var showOldFirst = function() {
    return function() {
      oldfirstNode.contentBox.setStrokeOpacity(1);
      oldfirstNode.contentBox.setFillOpacity(1);
      oldfirstNode.contentBox.getLabel().setFillOpacity(1);
      oldfirstNode.contentBox.getLabel().setStrokeOpacity(1);
      oldfirstNode.refBox.setStrokeOpacity(1);
      oldfirstNode.refBox.setFillOpacity(1);
      oldfirstNode.refArrow.setOpacity(1);
    };
  };

  var hideOldFirst = function() {
    return function() {
      oldfirstNode.contentBox.setStrokeOpacity(0);
      oldfirstNode.contentBox.setFillOpacity(0);
      oldfirstNode.contentBox.getLabel().setFillOpacity(0);
      oldfirstNode.contentBox.getLabel().setStrokeOpacity(0);
      oldfirstNode.refBox.setStrokeOpacity(0);
      oldfirstNode.refBox.setFillOpacity(0);
      oldfirstNode.refArrow.setOpacity(0);
    };
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


  //////////////////////////////////////////////////////////////////////////////
  // exposed methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    showOldFirst:showOldFirst,
    hideOldFirst:hideOldFirst,
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
