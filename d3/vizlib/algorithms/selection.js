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
    var array_elems = array.getRects();
    var first = array_elems[0];
    min.label.val = first.label.val;
    min.pos.x = first.pos.x;
    min.pos.y = first.pos.y;
    min.sp = min.pos;
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
    vizupdate.addOperation(function() {
      _setMinLabel(new_val);
    });
  }

  /**
   * Set the coordinates of the min element.
   * @param {object} array_element - Array element to align min with.
   */
  var setMinPos = function(array_element) {
    vizupdate.addOperation(function() {
      _setMinPos(array_element);
    });
  }

  /**
   * Set the fill color of the min element.
   * @param {string} new_color - New fill color of min element.
   */
  var setMinFill = function(new_color) {
    vizupdate.addOperation(function() {
      _setMinFill(new_color);
    });
  }

  /**
   * Emphasize (thicken border of) a rect element.
   * @param {number[]} indices - Array of indices to emphasize.
   * @param {string} color - Color for emphasis border.
   */
  var emphasize = function(indices, color) {
    vizupdate.addOperation(function() {
      _emphasize(indices, color);
    });
  }

  /**
   * Demphasize (remove thick border around) a rect element.
   * @param {number[]} indices - Array of indices to deemphasize.
   */
  var deemphasize = function(indices) {
    vizupdate.addOperation(function() {
      _deemphasize(indices);
    });
  }

  /**
   * Use array's swap function to swap two elements in the array.
   * @param {number} index1 - Index of first element to swap.
   * @param {number} index2 - Index of second element to swap.
   */
  var swap = function(index1, index2) {
    vizupdate.addOperation(function() {
      _swap(index1, index2);
    });
  }

  /**
   * Change the fill color of elements at specified indices.
   * @param {number[]} elements - Array of element indices.
   * @param {string} new_color - New fill color for specified indices.
   */
  var setFill = function(indices, color) {
    vizupdate.addOperation(function() {
      _setFill(indices, color);
    });
  }

  /**
   * Set val of label property for elements at specified indices.
   * @param {number[]} indices - Indices of elements to get new val.
   * @param {string} val - Value to give to elements at specified indexes.
   */
  var setLabels = function(indices, val) {
    vizupdate.addOperation(function(){
      _setLabels(indices, val);
    });
  }

  var initializeMin = function() {
    vizupdate.addOperation(_initializeMin);

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
