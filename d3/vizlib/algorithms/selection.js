/**
 * Selection.java
 * Selection Sort visualization object.
 * @param {Object} input - Object containing data and canvas constraints.
 */
var selection = (function(elems, bounding_box) {
  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var min = element_factory.getRect();
  var array = array_factory.get_array(elems, bounding_box);

  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////

  var _initializeMin = function() {
    var first = array.getSlots()[0];
    min.setPosX(first.getPosX());
    min.setPosY(first.getPosY() + first.getHeight());
    min.setSpX(min.getPosX());
    min.setSpY(min.getPosY());
    min.setHeight(first.getHeight());
    min.setWidth(first.getWidth());

    // initialize min label
    var minLabel = min.getLabel();
    var firstLabel = first.getLabel();
    minLabel.setVal(firstLabel.getVal());
    minLabel.setSpX(minLabel.getPosX());
    minLabel.setSpY(minLabel.getPosY());
    minLabel.setFontSize(.7 * first.getWidth() + 'px');
    minLabel.setPosX(min.getPosX() + .5 * min.getWidth());
    minLabel.setPosY(min.getPosY() + .72 * min.getWidth());
  }

  /**
   * Set the value of the min element's label.
   * @param {string} newVal - new
   */
  var _setMinLabel = function(new_Val) {
    min.getLabel().setVal(new_Val);
  }

  /**
   * Set the coordinates of the min element.
   * @param {object} array_index - Array element to align min with.
   */
  var _setMinPos = function(array_index) {
    var elem = array.getSlots()[array_index];
    min.setPosX(elem.getPosX());
    min.getLabel().setPosX(elem.getPosX() + .5 * min.getWidth());
  }

  /**
   * Set the fill color of the min element.
   * @param {string} new_color - New fill color of min element.
   */
  var _setMinFill = function(new_color) {
    min.setFill(new_color);
  }

  /**
   * Emphasize (thicken border of) a rect element.
   * @param {number[]} indices - Array of indices to emphasize.
   * @param {string} color - Color for emphasis border.
   */
   var _emphasize = function(indices) {
     array.emphasize(indices);
   }

  /**
   * Demphasize (remove thick border around) a rect element.
   * @param {number[]} indices - Array of indices to deemphasize.
   */
  var _deemphasize = function(indices) {
    array.deemphasize(indices);
  }

  /**
   * Use array's swap function to swap two elements in the array.
   * @param {number} index1 - Index of first element to swap.
   * @param {number} index2 - Index of second element to swap.
   */
  var _swap = function(index1, index2) {
    array.swap(index1, index2);
  }

  /**
   * Change the fill color of elements at specified indices.
   * @param {number[]} elements - Array of element indices.
   * @param {string} new_color - New fill color for specified indices.
   */
  var _setFill = function(elements, new_color) {
    array.setFill(elements, new_color);
  }

  /**
   * Set val of label property for elements at specified indices.
   * @param {number[]} indices - Indices of elements to get new val.
   * @param {string} val - Value to give to elements at specified indexes.
   */
  var _setLabels = function(indices, val) {
    array.setLabels(elements, val);
  }


  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////


  //element array getters///////////////////////////////////////////////////////
  var getRects = function() {
    return vizlib.getRects(array.getRects(), min);
  }

  var getCircles = function() {
    return vizlib.getCircles();
  }

  var getLines = function() {
    return vizlib.getLines();
  }

  var getText = function() {
    text = []
    array.getRects().forEach(function(rect) {
      text.push(rect.getLabel());
    });
    text.push(min.getLabel());
    return vizlib.getText(text);
  }
  //end of element array getters////////////////////////////////////////////////

  /**
   * Set the value of the min element's label.
   * @param {string} newVal - new
   */
  var setMinLabel = function(new_val) {
    redraw.addOp(function() {
      _setMinLabel(new_val);
    });
  }

  /**
   * Set the coordinates of the min element.
   * @param {object} array_element - Array element to align min with.
   */
  var setMinPos = function(array_element) {
    redraw.addOp(function() {
      _setMinPos(array_element);
    });
  }

  /**
   * Set the fill color of the min element.
   * @param {string} new_color - New fill color of min element.
   */
  var setMinFill = function(new_color) {
    redraw.addOp(function() {
      _setMinFill(new_color);
    });
  }

  /**
   * Emphasize (thicken border of) a rect element.
   * @param {number[]} indices - Array of indices to emphasize.
   * @param {string} color - Color for emphasis border.
   */
  var emphasize = function(indices, color) {
    redraw.addOp(function() {
      _emphasize(indices, color);
    });
  }

  /**
   * Demphasize (remove thick border around) a rect element.
   * @param {number[]} indices - Array of indices to deemphasize.
   */
  var deemphasize = function(indices) {
    redraw.addOp(function() {
      _deemphasize(indices);
    });
  }

  /**
   * Use array's swap function to swap two elements in the array.
   * @param {number} index1 - Index of first element to swap.
   * @param {number} index2 - Index of second element to swap.
   */
  var swap = function(index1, index2) {
    redraw.addOp(function() {
      _swap(index1, index2);
    });
  }

  /**
   * Change the fill color of elements at specified indices.
   * @param {number[]} elements - Array of element indices.
   * @param {string} new_color - New fill color for specified indices.
   */
  var setFill = function(indices, color) {
    redraw.addOp(function() {
      _setFill(indices, color);
    });
  }

  /**
   * Set val of label property for elements at specified indices.
   * @param {number[]} indices - Indices of elements to get new val.
   * @param {string} val - Value to give to elements at specified indexes.
   */
  var setLabels = function(indices, val) {
    redraw.addOp(function(){
      _setLabels(indices, val);
    });
  }

  var initializeMin = function() {
    redraw.addOp(_initializeMin);

  }



  //////////////////////////////////////////////////////////////////////////////
  // exposed methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    setMinLabel:setMinLabel,
    setMinPos:setMinPos,
    setMinFill:setMinFill,
    emphasize:emphasize,
    deemphasize:deemphasize,
    swap:swap,
    setFill:setFill,
    setLabels:setLabels,
    initializeMin
  }
});
