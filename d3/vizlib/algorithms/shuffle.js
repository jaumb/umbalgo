/**
 * Shuffle.java
 * Shuffle visualization object.
 * @param {number[]|string[]} elems - Elements to shuffle.
 * @param {number} svgW - Width of the svg canvas.
 * @param {number} svgH - Height of the svg canvas.
 */
var shuffle = (function(elems, svgW, svgH) {

  // initialize the canvas with element groups
  redraw.initCanvas(svgCanvasName);

  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var _boundingBox = {
    p1:{x:0, y:0},
    p2:{x:svgW, y:svgH}
  }
  var _array = array_factory.get_array(elems, _boundingBox);
  var index_i = element_factory.getText();
  index_i.setVal('i');
  index_i.setFont(_array.getSlots()[0].getLabel().getFont());
  index_i.setVisibility('hidden');
  var font_sz = _array.getSlots()[0].getLabel().getFontSize().split('p')[0];
  index_i.setFontSize(0.7 * parseFloat(font_sz));

  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////



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
    return vizlib.getLines(_array.getLines());
  }

  var getText = function() {
    return vizlib.getText(index_i, _array.getText());
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
      index_i.setSpY(pos.y + h + 1 / 5 * h + 1 / 2 * bb.height);
      index_i.setPosX(index_i.getSpX());
      index_i.setPosY(index_i.getSpY());
      index_i.setVisibility('visible');
    });
  }

  /**
   * Remove i from the canvas.
   */
  var removeI = function() {
    redraw.addOps(function() { index_i.setFillOpacity(0); });
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
    setI:setI,
    removeI:removeI,
    swap:swap,
    setFill:setFill,
    emphasize:emphasize,
    moveEmphasis:moveEmphasis,
    deemphasize:deemphasize,
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
