// dependencies: all algorithm files

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
   rects.forEach(function(e) {
     if (e.className && e.className() === 'rect') { r.push(e); }
     else if ( Array.isArray(e) ) { r = r.concat(e); }
   });
   // sort the array by e.getID()
   r.sort(function(a, b) {
     return a.getID() < b.getID() ? -1 : a.getID() > b.getID() ? 1 : 0;
   });
   return r;
 };

  //////////////////////////////////////////////////////////////////////////////

  /**
  * Return an ordered array of all rect elements.
  * @param {...Object} rects - All rect arrays/elements in this algorithm.
  */
  var getCircles = function(...circles) {
   var c = [];
   // collect argument elements and elements from argument array in one array
   circles.forEach(function(e) {
     if (e.className && e.className() === 'circle') { c.push(e); }
     else if ( Array.isArray(e) ) { c = c.concat(e); }
   });
   // sort the array by e.getID()
   c.sort(function(a, b) {
     return a.getID() < b.getID() ? -1 : a.getID() > b.getID() ? 1 : 0;
   });
   return c;
 };

  /**
  * Return an ordered array of all line elements.
  */
  var getLines = function(...lines) {
    var l = [];
    // collect argument elements and elements from argument array in one array
    lines.forEach(function(e) {
      if (e.className && e.className() === 'line') { l.push(e); }
      else if ( Array.isArray(e) ) { l = l.concat(e); }
    });
    // sort the array by line id
    l.sort(function(a, b) {
      return a.getID() < b.getID() ? -1 : a.getID() > b.getID() ? 1 : 0;
    });
    return l;
  };

  /**
  * Return an ordered array of all text elements.
  */
  var getText = function(...text) {
    var t = [];
    // collect argument elements and elements from argument array in one array
    text.forEach(function(e) {
      if (e.className && e.className() === 'text') { t.push(e); }
      else if ( Array.isArray(e) ) { t = t.concat(e); }
    });
    // sort the array by text e.getID()
    t.sort(function(a, b) {
      return a.getID() < b.getID() ? -1 : a.getID() > b.getID() ? 1 : 0;
    });
    return t;
  };

  var get_selection = function(elements, svgW, svgH) {
    return selection(elements, svgW, svgH);
  };

  var get_insertion = function(elements, svgW, svgH) {
    return insertion(elements, svgW, svgH);
  };

  var get_linkedbag = function(elements, svgW, svgH) {
    return linkedbag(elements, svgW, svgH);
  }

  var get_bst = function(root, svgW, svgH) {
    return bst(root, svgW, svgH);
  };

  var get_shuffle = function(elements, svgW, svgH) {
    return shuffle(elements, svgW, svgH);
  };

  //////////////////////////////////////////////////////////////////////////////
  //  return public methods
  //////////////////////////////////////////////////////////////////////////////
  return {
    getRects:getRects,
    getCircles:getCircles,
    getLines:getLines,
    getText:getText,
    get_selection:get_selection,
    get_insertion:get_insertion,
    get_linkedbag:get_linkedbag,
    get_bst:get_bst,
    get_shuffle:get_shuffle
  };

})();
