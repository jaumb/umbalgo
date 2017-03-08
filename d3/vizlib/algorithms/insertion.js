/**
 * Insertion.java
 * Insertion Sort visualization object.
 * @param {Object} input - Object containing data and canvas constraints.
 */
var insertion = (function(elems, bounding_box) {
  //////////////////////////////////////////////////////////////////////////////
  // private variables
  //////////////////////////////////////////////////////////////////////////////
  var bound = element_factory.line();
  var array = array_factory.get_array(elems, bounding_box);

  //////////////////////////////////////////////////////////////////////////////
  // private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Set the coordinates of the boundary line.
   * @param {object} elem - Array element to the right of which
   * the boundary line will be drawn.
   */
  var _setBoundPos = function(elem) {
    var x1 = elem.pos.x + elem.width;
    var y1 = elem.pos.y - 1/4 * elem.height;
    var x2 = x1;
    var y2 = elem.pos.y + elem.height + 1/4 * elem.height;
    bound.pos = {x1:x1, y1:y1, x2:x2, y2:y2};
    bound.sp = {x1:x1, y1:y1, x2:x2, y2:y2};
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
    return vizlib.getRects(array.getRects());
  }

  var getCircles = function() {
    return vizlib.getCircles();
  }

  var getLines = function() {
    return vizlib.getLines(bound);
  }

  var getText = function() {
    var text = [];
    array.getRects().forEach(function(e) {
      text.push(e.label);
    });
    return vizlib.getText(text);
  }
  //end of element array getters////////////////////////////////////////////////

  /**
   * Set the coordinates of the boundary element.
   * @param {number} index - Array element index to align boundary with.
   */
  var setBoundPos = function(index) {
    redraw.addOperation(function() {
      _setBoundPos(array.getRects()[index]);
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



  //////////////////////////////////////////////////////////////////////////////
  // exposed methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    setBoundPos:setBoundPos,
    swap:swap,
    setFill:setFill,
    setLabels:setLabels,
  }

});
