/**
 * Selection.java
 * Selection Sort visualization object.
 * @param {Object} input - Object containing data and canvas constraints.
 */
var selection = (function(elems, bounding_box) {
  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var min = element_factory.rect();
  var array = array_factory.get_array(elems, bounding_box);

  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////

  var _initializeMin = function() {
    var first = array.getRects()[0];
    min.pos.x = first.pos.x;
    min.pos.y = first.pos.y + first.height;
    min.sp.x = min.pos.x;
    min.sp.y = min.pos.y;
    min.height = min.width = first.width;

    // initialize min label
    min.label.val = first.label.val;
    min.label.pos.x = min.pos.x;
    min.label.pos.y = min.pos.y;
    min.label.sp.x = min.pos.x;
    min.label.sp.y = min.pos.y;
  }

  /**
   * Set the value of the min element's label.
   * @param {string} newVal - new
   */
  var _setMinLabel = function(new_Val) {
    min.label.val = new_Val;
  }

  /**
   * Set the coordinates of the min element.
   * @param {object} array_element - Array element to align min with.
   */
  var _setMinPos = function(array_element) {
    min.pos.x = array_element.pos.x;
    min.pos.y = array_element.pos.y + array_element.height * 1.5;
  }

  /**
   * Set the fill color of the min element.
   * @param {string} new_color - New fill color of min element.
   */
  var _setMinFill = function(new_color) {
    min.fill = new_color;
  }

  /**
   * Emphasize (thicken border of) a rect element.
   * @param {number[]} indices - Array of indices to emphasize.
   * @param {string} color - Color for emphasis border.
   */
  var _emphasize = function(indices, color) {
    array.emphasize(indices, color);
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
      text.push(rect.label);
    });
    text.push(min.label);
    return vizlib.getText(text);
  }
  //end of element array getters////////////////////////////////////////////////

  /**
   * Set the value of the min element's label.
   * @param {string} newVal - new
   */
  var setMinLabel = function(new_val) {
    redraw.addOperation(function() {
      _setMinLabel(new_val);
    });
  }

  /**
   * Set the coordinates of the min element.
   * @param {object} array_element - Array element to align min with.
   */
  var setMinPos = function(array_element) {
    redraw.addOperation(function() {
      _setMinPos(array_element);
    });
  }

  /**
   * Set the fill color of the min element.
   * @param {string} new_color - New fill color of min element.
   */
  var setMinFill = function(new_color) {
    redraw.addOperation(function() {
      _setMinFill(new_color);
    });
  }

  /**
   * Emphasize (thicken border of) a rect element.
   * @param {number[]} indices - Array of indices to emphasize.
   * @param {string} color - Color for emphasis border.
   */
  var emphasize = function(indices, color) {
    redraw.addOperation(function() {
      _emphasize(indices, color);
    });
  }

  /**
   * Demphasize (remove thick border around) a rect element.
   * @param {number[]} indices - Array of indices to deemphasize.
   */
  var deemphasize = function(indices) {
    redraw.addOperation(function() {
      _deemphasize(indices);
    });
  }

  /**
   * Use array's swap function to swap two elements in the array.
   * @param {number} index1 - Index of first element to swap.
   * @param {number} index2 - Index of second element to swap.
   */
  var swap = function(index1, index2) {
    redraw.addOperation(function() {
      _swap(index1, index2);
    });
  }

  /**
   * Change the fill color of elements at specified indices.
   * @param {number[]} elements - Array of element indices.
   * @param {string} new_color - New fill color for specified indices.
   */
  var setFill = function(indices, color) {
    redraw.addOperation(function() {
      _setFill(indices, color);
    });
  }

  /**
   * Set val of label property for elements at specified indices.
   * @param {number[]} indices - Indices of elements to get new val.
   * @param {string} val - Value to give to elements at specified indexes.
   */
  var setLabels = function(indices, val) {
    redraw.addOperation(function(){
      _setLabels(indices, val);
    });
  }

  var initializeMin = function() {
    redraw.addOperation(_initializeMin);

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
