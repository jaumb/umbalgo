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
     else if ( element.isArray() ) { r.concat(element); }
   });
   // sort the array by element.id
   r.sort(function(a, b) {
     a.id < b.id ? return -1 : a.id > b.id ? return 1 : 0;
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
     else if ( element.isArray() ) { c.concat(element); }
   });
   // sort the array by element.id
   c.sort(function(a, b) {
     a.id < b.id ? return -1 : a.id > b.id ? return 1 : 0;
   });
   return c;
  }

  var selection = function(input) {
    return selection(input);
  }

  //////////////////////////////////////////////////////////////////////////////
  //  return public methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    selection:selection
  };
})();
