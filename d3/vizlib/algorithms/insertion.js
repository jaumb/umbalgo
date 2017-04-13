/**
 * Insertion.java
 * Insertion Sort visualization object.
 * @param {number[]|string[]} elems - Elements to sort.
 * @param {number} svgW - Width of the svg canvas.
 * @param {number} svgH - Height of the svg canvas.
 */
var insertion = (function(elems, svgW, svgH) {

  // initialize the canvas with element groups
  redraw.initCanvas(svgCanvasName);

  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var _boundingBox = {
    p1:{x:0, y:0},
    p2:{x:svgW, y:svgH}
  }
  var _bound = element_factory.getLine();
  _bound.setStroke(colors.BLUE);
  var _array = array_factory.get_array(elems, _boundingBox);
  var index_i = element_factory.getText();
  var index_j = element_factory.getText();
  index_i.setVal('i');
  index_i.setFont(_array.getSlots()[0].getLabel().getFont());
  index_i.setVisibility('hidden');
  var font_sz = _array.getSlots()[0].getLabel().getFontSize().split('p')[0];
  index_i.setFontSize(0.7 * parseFloat(font_sz));
  index_j.setVal('j');
  index_j.setVisibility('hidden');
  index_j.setFont(index_i.getFont());
  index_j.setFontSize(index_i.getFontSize());

  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Set the coordinates of the boundary line.
   * @param {object} elem - Array element to the right of which
   * the boundary line will be drawn.
   */
  var _setBoundPos = function(elem) {
    var x1 = elem.getPosX() + elem.getWidth();
    var y1 = elem.getPosY() - 1/4 * elem.getHeight();
    var x2 = x1;
    var y2 = elem.getPosY() + elem.getHeight() + 1/4 * elem.getHeight();
    _bound.setPos(x1, y1, x2, y2);
    _bound.setSp(x1, y1, x2, y2);
  }


  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////


  //element array getters///////////////////////////////////////////////////////
  var getRects = function() {
    return vizlib.getRects(_array.getRects());
  }

  var getCircles = function() {
    return vizlib.getCircles(_array.getCircles());
  }

  var getLines = function() {
    return vizlib.getLines(_bound, _array.getLines());
  }

  var getText = function() {
    return vizlib.getText(index_i, index_j, _array.getText());
  }
  //end of element array getters////////////////////////////////////////////////

  /**
   * Set the position of i with respect to an array index.
   * @param {number} index - Array element index to align i with.
   */
  var setI = function(index) {
    redraw.addOps(function() {
      var slot = _array.getSlots()[index];
      var pos = slot.getPos();
      var w = slot.getWidth();
      var h = slot.getHeight();
      var bb = redraw.getBBox(index_i);
      index_i.setSpX(pos.x + 1 / 2 * w);
      index_i.setSpY(pos.y + h + 1 / 10 * h + 1 / 2 * bb.height);
      index_i.setPosX(index_i.getSpX());
      index_i.setPosY(index_i.getSpY());
      index_i.setVisibility('visible');
    });
  }

  /**
   * Set the position of j with respect to an array index.
   * @param {number} index - Array element index to align j with.
   */
  var setJ = function(index) {
    redraw.addOpps(function() {
      var slot = _array.getSlots()[index];
      var pos = slot.getPos();
      var w = slot.getWidth();
      var h = slot.getHeight();
      var bb = redraw.getBBox(index_j);
      index_j.setSpX(pos.x + 1 / 2 * w);
      index_j.setSpY(pos.y - 1 / 4 * bb.height);
      index_j.setPosX(index_j.getSpX());
      index_j.setPosY(index_j.getSpY());
      index_j.setVisibility('visible');
    });
  }

  /**
   * Remove i from the canvas.
   */
  var removeI = function() {
    redraw.addOps(function() {
      index_i.setFillOpacity(0);
    });
  }

  /**
   * Remove j from the canvas.
   */
  var removeJ = function() {
    redraw.addOps(function() {
      index_j.setFillOpacity(0);
    });
  }

  /**
   * Set the coordinates of the boundary element.
   * @param {number} index - Array element index to align boundary with.
   */
  var setBoundPos = function(index) {
    redraw.addOps(function() { _setBoundPos(_array.getSlots()[index]) });
  }

  /**
   * Use array's swap function to swap two elements in the array.
   * @param {number} index1 - Index of first element to swap.
   * @param {number} index2 - Index of second element to swap.
   */
  var swap = function(index1, index2) {
    redraw.addOps(function() { _array.swap(index1, index2) });
  }

  /**
   * Change the fill color of elements at specified indices.
   * @param {number[]} elements - Array of element indices.
   * @param {string} color - New fill color for specified indices.
   */
  var setFill = function(indices, color) {
    redraw.addOps(function() { _array.setFill(indices, color) });
  }

  /**
   * Set val of label property for elements at specified indices.
   * @param {number[]} indices - Indices of elements to get new val.
   * @param {string} val - Value to give to elements at specified indexes.
   */
  var setLabels = function(indices, val) {
    redraw.addOps(function() { _array.setLabels(indices, val) });
  }

  /**
   * Emphasize array slots.
   * @param {number[]} indices - The indices of the slots to emphasize.
   */
  var emphasize = function(indices) {
    redraw.addOps(function() { _array.emphasize(indices) });
  }

  /**
   * Move emphasis box.
   * @param {number} i - The index of the emphasized slot.
   * @param {number} j - The index of the slot to emphasize.
   */
  var moveEmphasis = function(i, j) {
    redraw.addOps(function() { _array.moveEmphasis(i, j) });
  }

  /**
   * De-emphasize array slots.
   * @param {number[]} indices - The indices of the slots to de-emphasize.
   */
  var deemphasize = function(indices) {
    redraw.addOps(function() { _array.deemphasize(indices) });
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
    setBoundPos:setBoundPos,
    swap:swap,
    setFill:setFill,
    setLabels:setLabels,
    emphasize:emphasize,
    moveEmphasis:moveEmphasis,
    deemphasize:deemphasize,
    setI:setI,
    setJ:setJ,
    removeI:removeI,
    removeJ:removeJ,
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    updateCanvas:updateCanvas,
    play:play,
    pause:pause,
    step:step
  }

});
