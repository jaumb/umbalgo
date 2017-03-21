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
     if (element.constructor.name == 'Rect') { r.push(element); }
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
     if (element.constructor.name == 'Circle') { c.push(element); }
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
  var getLines = function(...lines) {
    var l = [];
    // collect argument elements and elements from argument array in one array
    lines.forEach(function(e) {
      if (e.constructor.name == 'Line') { l.push(e); }
      else if ( Array.isArray(e) ) { l = l.concat(e); }
    });
    // sort the array by line id
    return l.sort(function(a, b) { return a.id - b.id; });
  }

  /**
  * Return an ordered array of all text elements.
  */
  var getText = function(...text) {
    var t = [];
    // collect argument elements and elements from argument array in one array
    text.forEach(function(e) {
      if (e.constructor.name == 'Text') { t.push(e); }
      else if ( Array.isArray(e) ) { t = t.concat(e); }
    });
    // sort the array by text element id
    return t.sort(function(a, b) { return a.id - b.id; });
  }

  var get_selection = function(elements, bounding_box) {
    return selection(elements, bounding_box);
  }

  var get_insertion = function(elements, svgW, svgH) {
    return insertion(elements, svgW, svgH);
  }

  //////////////////////////////////////////////////////////////////////////////
  //  return public methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    get_selection:get_selection,
    get_insertion:get_insertion
  };

})();
