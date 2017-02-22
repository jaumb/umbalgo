

var vizlib = (function() {
  /****************************************************************************
   *  private variables
   ****************************************************************************/
  var array = [];     // input array of numbers
  var elements;  // array of objects created from input numbers

  var svgW;  // svg canvas width
  var svgH;  // svg canvas height

  var box_size;  // length of one side of one element

  var min_element;  // the min element for selectionsort

  var bindTo;  // the DOM element visualization will be appended to

  var dur = 250;  // duration of transition

  var q = [];  // queue for vizualization actions
  var intervalID = undefined; // for storing interval timer's ID


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
                                 (i + 1) * box_size,      // x coord
                                 (svgH - box_size) / 2,   // y coord
                                 box_size,
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
    array = arr;  // assign array member to input array
    // set window dimensions
    // TODO: bootstrap?
    svgW = window.innerWidth;
    svgH = window.innerHeight;
    console.log("  current window dims: " + svgW +", " + svgH);
    // scale box size based on window size, room for one box on left/right
    box_size = (svgW / (array.length + 2));

    /*
    Create element objects for array and min
    */
    elements = _arrayToElements(array);
    min_element = [_createElement(elements[0].current.val,
                                 box_size,
                                 (svgH - box_size) / 2 + box_size,
                                 box_size,
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
      .attr("width", svgW)
      .attr("height", svgH)
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
      .data(elements)
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
      .data(elements)
      .enter()
      .append('text')
      .attr('x', function(d) { return d.current.x + .5 * d.current.size; })
      .attr('y', function(d) { return d.current.y + .8 * d.current.size; })
      .text(function(d) { return d.current.val; })
      .attr('font-size', function() {
        return (box_size * .7) + "px";
      })
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');

    // draw min element
    min.selectAll('rect')
      .data(min_element)
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
      .data(min_element)
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
      .duration(dur)
      .attr('x', function(d) { return d.next.x; })
      .attr('y', function(d) { return d.next.y; })
      .attr('fill', function(d) { return d.next.color; });

    labels.transition()
      .duration(dur)
      .attr('x', function(d) { return d.next.x + .5 * d.current.size; })
      .attr('y', function(d) { return d.next.y + .8 * d.current.size; })
      .text(function(d) { return d.next.val; });

    min.transition()
      .duration(dur)
      .attr('x', function(d) { return d.next.x; })
      .attr('y', function(d) { return d.next.y; })
      .attr('fill', function(d) { return d.next.color; });

    min_label.transition()
      .duration(dur)
      .attr('x', function(d) { return d.next.x + d.current.size * .5; })
      .attr('y', function(d) { return d.next.y + d.current.size * .8; })
      .text(function(d) {return d.next.val; });

    _updateElements(elements);
    _updateElements(min_element);
  }

  /**
   * Change the background color of an element.
   * @param {Object} element - The element to change.
   * @param {string} new_color - The color string for the new background-color.
   */
  var _change_color = function(elements, new_color) {
    q.push(function() {
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
    q.push(function() {
      elements[i].next.x = elements[j].current.x;
      elements[i].next.y = elements[j].current.y;
      elements[i].next.index = j;
      elements[i].next.val = elements[i].current.val;
      elements[j].next.x = elements[i].current.x;
      elements[j].next.y = elements[i].current.y;
      elements[j].next.index = i;
      elements[j].next.val = elements[j].current.val;
    })
  }

  /**
   * Update the value of the min element to the value of an element in the
   * elements array.
   * @param {number} arr_index - The index of the element with min's new value.
   */
  var _change_min = function(arr_index) {
    q.push(function() {
      min_element[0].next.val = elements[arr_index].current.val;
    });
  }

  /**
   * Change the position of the min element based on an element in the
   * elements array.
   * @param {Object} arr_index - The element to move min's x position to.
   */
  var _move_min = function(arr_index) {
    q.push(function() {
      min_element[0].next.x = elements[arr_index].current.x;
    });
  }


  /****************************************************************************
   *  public methods
   ****************************************************************************/

  var initialize = function(array, element) {
    _initialize(array, element);
    q.push(_draw);
    q.push(_redraw);
  }

  /**
   * Update the value of the min element.
   * @param: arr_index - The index of the array element whose value min takes.
   */
  var change_min = function(arr_index) {
    _change_min(arr_index);
    q.push(_redraw);
  }

  /**
   * Update the position of the min element.
   * @param: arr_index - The index in elements min moves beneath.
   */
  var move_min = function(arr_index) {
    _move_min(arr_index);
    q.push(_redraw);
  }

  var array_swap = function(i, j) {
    _array_swap(i, j);
    q.push(_redraw);
  }

  var array_change_color = function(indexes, color) {
    elems = [];
    indexes.forEach(function(index) {
        elems.push(elements[index]);
    })
    _change_color(elems, color);
    q.push(_redraw);
  }

  var min_change_color = function(color) {
    _change_color(min_element, color);
    q.push(_redraw);
  }

  var step = function() {
      if (q.length > 0) {
          var callback = q.shift();
          callback();
      }
  }

  var pauseplay = function() {
      if (intervalID === undefined) {
          intervalID = setInterval(step, dur);
          return;
      }
      clearInterval(intervalID);
      intervalID = undefined;
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
