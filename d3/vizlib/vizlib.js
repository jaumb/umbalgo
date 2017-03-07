// depencies: all algorithm files

var vizlib = (function() {
  //////////////////////////////////////////////////////////////////////////////
  //  private variables
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  //  private methods
  //////////////////////////////////////////////////////////////////////////////





  //////////////////////////////////////////////////////////////////////////////
  //  public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
  * Return an ordered array of all rect elements.
  * @param {...Object} rects - All rect arrays/elements in this algorithm.
  */
  var getRects = function(...rects) {
   var r = [];
   // collect argument elements and elements from argument array in one array
   rects.forEach(function(element) {
     if (element.hasOwnProperty('width')) { r.push(element); }
     else if ( Array.isArray(element) ) { r = r.concat(element); }
   });
   // sort the array by element.id
   r.sort(function(a, b) {
     return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
   });
   return r;
  }

  //////////////////////////////////////////////////////////////////////////////

  /**
  * Return an ordered array of all rect elements.
  * @param {...Object} rects - All rect arrays/elements in this algorithm.
  */
  var getCircles = function(...circles) {
   var c = [];
   // collect argument elements and elements from argument array in one array
   circles.forEach(function(element) {
     if (element.hasOwnProperty('r')) { c.push(element); }
     else if ( Array.isArray(element) ) { c = c.concat(element); }
   });
   // sort the array by element.id
   c.sort(function(a, b) {
     return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
   });
   return c;
  }

  /**
  * Return an ordered array of all line elements.
  */
  var getLines = function() {
    // TODO: to be implemented
    return [];
  }

  /**
  * Return an ordered array of all text elements.
  */
  var getText = function() {
    // TODO: to be implemented
    return [];
  }

  var get_selection = function(elements, bounding_box) {
    return selection(elements, bounding_box);
  }

  //////////////////////////////////////////////////////////////////////////////
  //  return public methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    get_selection:get_selection
  };
})();
