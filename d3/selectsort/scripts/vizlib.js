

var vizlib = (function() {
  /****************************************************************************
   *  private variables
   ****************************************************************************/
  var _array = [];     // input array of numbers
  var _elements;  // array of objects created from input numbers

  var _svgW;  // svg canvas width
  var _svgH;  // svg canvas height

  var _box_size;  // length of one side of one element

  var _min_element;  // the min element for selectionsort

  var _dur = 250;  // duration of transition

  var _q = [];  // queue for vizualization actions
  var _intervalID = undefined; // for storing interval timer's ID


  /****************************************************************************
   *  private methods
   ****************************************************************************/
  /**
   * Create a visualization "element" -- an object with the information
   * required to draw a building block of a visualization.
   * @param: {number} val - The value the element holds (a number).
   * @param: {number} x - The initial x coordinate of this element.
   * @param: {number} y - The initial y coordinate of this element.
   * @param: {number} size - The side length of the square representing this element.
   * @param: {number} index - This element's position in an array.
   */
  var _createElement = function(val, x, y, size, index) {
    return {
      current:{
        x:x,
        y:y,
        val:val,
        size:size,
        index:index,
        color:'#eeeeee',
      },
      next:{
        x:x,
        y:y,
        val:val,
        size:size,
        index:index,
        color:'#eeeeee',
      }
    }
  };

  /**
   * Converts an array of numbers into an array of elements with those
   * numbers as each element's value.
   * @param {Object} array - An input array of numbers.
   */
  var _arrayToElements = function(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result.push(_createElement(array[i],                // value
                                 (i + 1) * _box_size,      // x coord
                                 (_svgH - _box_size) / 2,   // y coord
                                 _box_size,
                                 i));
    }
    return result;
  };

  /**
   * Update "current" values to "next" values. Reorder array based on index.
   * @param {Object} elements - An array of element objects.
   */
  var _updateElements = function(elements) {
    elements.forEach(function(element) {
      element.current.x = element.next.x;
      element.current.y = element.next.y;
      element.current.color = element.next.color;
      element.current.index = element.next.index;
      element.current.val = element.next.val;
    });
    elements.sort(function(a, b) {
      return a.current.index - b.current.index;
    });
  }

  /**
   * Initialize the visualization object's values.
   * @param {Object} arr - The array of number values to sort.
   * @param {Object} element - The dom element to append the svg canvas to.
   */
  var _initialize = function(arr, element) {
    console.log("Initializing values/coords...");
    _array = arr;  // assign array member to input array
    // set window dimensions
    // TODO: bootstrap?
    _svgW = window.innerWidth;
    _svgH = window.innerHeight;
    console.log("  current window dims: " + _svgW +", " + _svgH);
    // scale box size based on window size, room for one box on left/right
    _box_size = (_svgW / (_array.length + 2));

    /*
    Create element objects for array and min
    */
    _elements = _arrayToElements(_array);
    _min_element = [_createElement(_elements[0].current.val,
                                 _box_size,
                                 (_svgH - _box_size) / 2 + _box_size,
                                 _box_size,
                                 0)];

    /*
    Set up containers for buttons and visualization elements
    TODO: generalize
    */
    // append svg header bar
    d3.select(element)
      .append("div")
      .attr('id','navdiv');
    // add start button to header bar
    d3.select("#navdiv")
      .append("button")
      .attr('type','button')
      .text('Pause/Play')
      .on('click', function(d) { pauseplay(); });
    // add next button to header bar
    d3.select("#navdiv")
      .append("button")
      .attr('type','button')
      .text('Next')
      .on('click', function(d) { step(); });
    // append the svg canvas
    d3.select(element)
      .append("svg")
      .attr("width", _svgW)
      .attr("height", _svgH)
      .attr('id','svg_canvas');
    // append element for holding array elements
    d3.select("#svg_canvas")
      .append('g')
      .attr('id','g_arr_elems');
    // append element for holding array element labels
    d3.select("#svg_canvas")
      .append('g')
      .attr('id','g_labels');
    // append element to hold min element rect
    d3.select("#svg_canvas")
      .append('g')
      .attr('id', 'min_elem');
    // append element to hold min element label
    d3.select("#svg_canvas")
      .append('g')
      .attr('id', 'min_label');

    console.log("Initialization complete.");
  }

  /**
   * Draws the initial visualization after initialization.
   */
  var _draw = function() {
    var rects = d3.select("#g_arr_elems");     // array boxes  group d3 selection
    var labels = d3.select("#g_labels");       // array labels group d3 selection
    var min = d3.select("#min_elem");          // min element box group d3 selection
    var min_label = d3.select("#min_label");   // min element label group d3 selection

    // draw the array boxes
    rects.selectAll('rect')
      .data(_elements)
      .enter()
      .append('rect')
      .attr('x', function(d) { return d.current.x; })
      .attr('y', function(d) { return d.current.y; })
      .attr('width', function(d) {return d.current.size; })
      .attr('height', function(d) {return d.current.size; })
      .attr('fill', function(d) { return d.current.color; })
      .attr('stroke-width', 3)
      .attr('stroke', 'black');

    // draw array element labels
    labels.selectAll('text')
      .data(_elements)
      .enter()
      .append('text')
      .attr('x', function(d) { return d.current.x + .5 * d.current.size; })
      .attr('y', function(d) { return d.current.y + .8 * d.current.size; })
      .text(function(d) { return d.current.val; })
      .attr('font-size', function() {
        return (_box_size * .7) + "px";
      })
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');

    // draw min element
    min.selectAll('rect')
      .data(_min_element)
      .enter()
      .append('rect')
      .attr('x', function(d) { return d.current.x; })
      .attr('y', function(d) { return d.current.y; })
      .attr('width', function(d) {return d.current.size; })
      .attr('height', function(d) {return d.current.size; })
      .attr('fill', function(d) { return d.current.color; })
      .attr('stroke-width', 3)
      .attr('stroke', 'black');

    // draw min label
    min_label.selectAll('text')
      .data(_min_element)
      .enter()
      .append('text')
      .attr('x', function(d) { return d.current.x + d.current.size * .5; })
      .attr('y', function(d) { return d.current.y + d.current.size * .8; })
      .text(function(d) {return d.current.val; })
      .attr('font-size', function(d) {
        return (d.current.size * .7) + "px";
      })
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');
  };

  /**
   * Redraws the visualization using transitions.
   */
  var _redraw = function() {
    var rects = d3.select('#g_arr_elems').selectAll('rect');
    var labels = d3.select('#g_labels').selectAll('text');
    var min = d3.select('#min_elem').selectAll('rect');
    var min_label = d3.select('#min_label').selectAll('text');

    rects.transition()
      .duration(_dur)
      .attr('x', function(d) { return d.next.x; })
      .attr('y', function(d) { return d.next.y; })
      .attr('fill', function(d) { return d.next.color; });

    labels.transition()
      .duration(_dur)
      .attr('x', function(d) { return d.next.x + .5 * d.current.size; })
      .attr('y', function(d) { return d.next.y + .8 * d.current.size; })
      .text(function(d) { return d.next.val; });

    min.transition()
      .duration(_dur)
      .attr('x', function(d) { return d.next.x; })
      .attr('y', function(d) { return d.next.y; })
      .attr('fill', function(d) { return d.next.color; });

    min_label.transition()
      .duration(_dur)
      .attr('x', function(d) { return d.next.x + d.current.size * .5; })
      .attr('y', function(d) { return d.next.y + d.current.size * .8; })
      .text(function(d) {return d.next.val; });

    _updateElements(_elements);
    _updateElements(_min_element);
  }

  /**
   * Change the background color of an element.
   * @param {Object} element - The element to change.
   * @param {string} new_color - The color string for the new background-color.
   */
  var _change_color = function(elements, new_color) {
    _q.push(function() {
      elements.forEach(function(elem) {
        elem.next.color = new_color;
      })
    });
  }

  /**
   * Swap two elements in the elements array.
   * @param {number} i - The index of one element being swapped.
   * @param {number} j - The index of the other element being swapped.
   */
  var _array_swap = function(i, j) {
    _q.push(function() {
      _elements[i].next.x = _elements[j].current.x;
      _elements[i].next.y = _elements[j].current.y;
      _elements[i].next.index = j;
      _elements[i].next.val = _elements[i].current.val;
      _elements[j].next.x = _elements[i].current.x;
      _elements[j].next.y = _elements[i].current.y;
      _elements[j].next.index = i;
      _elements[j].next.val = _elements[j].current.val;
    })
  }

  /**
   * Update the value of the min element to the value of an element in the
   * elements array.
   * @param {number} arr_index - The index of the element with min's new value.
   */
  var _change_min = function(arr_index) {
    _q.push(function() {
      _min_element[0].next.val = _elements[arr_index].current.val;
    });
  }

  /**
   * Change the position of the min element based on an element in the
   * elements array.
   * @param {Object} arr_index - The element to move min's x position to.
   */
  var _move_min = function(arr_index) {
    _q.push(function() {
      _min_element[0].next.x = _elements[arr_index].current.x;
    });
  }


  /****************************************************************************
   *  public methods
   ****************************************************************************/

  var initialize = function(array, element) {
    _initialize(array, element);
    _q.push(_draw);
    _q.push(_redraw);
  }

  /**
   * Update the value of the min element.
   * @param: arr_index - The index of the array element whose value min takes.
   */
  var change_min = function(arr_index) {
    _change_min(arr_index);
    _q.push(_redraw);
  }

  /**
   * Update the position of the min element.
   * @param: arr_index - The index in elements min moves beneath.
   */
  var move_min = function(arr_index) {
    _move_min(arr_index);
    _q.push(_redraw);
  }

  var array_swap = function(i, j) {
    _array_swap(i, j);
    _q.push(_redraw);
  }

  var array_change_color = function(indexes, color) {
    elems = [];
    indexes.forEach(function(index) {
        elems.push(_elements[index]);
    })
    _change_color(elems, color);
    _q.push(_redraw);
  }

  var min_change_color = function(color) {
    _change_color(_min_element, color);
    _q.push(_redraw);
  }

  var step = function() {
      if (_q.length > 0) {
          var callback = _q.shift();
          callback();
      }
  }

  var pauseplay = function() {
      if (_intervalID === undefined) {
          _intervalID = setInterval(step, _dur);
          return;
      }
      clearInterval(_intervalID);
      _intervalID = undefined;
  }


  /****************************************************************************
   *  return public methods
   ****************************************************************************/
  return {
    initialize:initialize,
    change_min:change_min,
    move_min:move_min,
    array_swap:array_swap,
    array_change_color:array_change_color,
    min_change_color:min_change_color,
    step:step,
    pauseplay:pauseplay

  };
})();
