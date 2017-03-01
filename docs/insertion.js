// this functions creates and returns an insertion sort
// visualization object
// list is the list of elements to be sorted
function insertionSortViz(list) {
  var dur = 200; // animation transition duration
  var boxSize = 80; // size of each array slot
  var fontSize = 50; // array element font size
  var svgW = 958, svgH = 460; // svg canvas size
  var insertion = {}; // insertion sort visualization
  var intervalID = undefined; // for storing interval timer's ID
  var q = []; // queue for storing actions on the visualization

  // default to 10 elements if no list is provided
  if (!list || list.length < 1 || list.length > 10) {
    insertion.N = 10;
    list = d3.range(1,insertion.N);
    d3.shuffle(list);
  } else {
    insertion.N = list.length;
  }

  // create lists of array slots and elements
  insertion.slots = [];
  insertion.X = (svgW - insertion.N * boxSize + boxSize) / 2;
  insertion.Y = (svgH - boxSize) / 2;
  list.forEach(function(e, i) {
    insertion.slots.push({
      pos:{x:insertion.X + i * boxSize, y:insertion.Y},
      elem:{val:e, seq:i,
            pos:{x:insertion.X + i * boxSize, y:insertion.Y},
            sp:{x:insertion.X + i * boxSize, y:insertion.Y}
           },
      fill:'white'
    });
  });

  // initialize boundary marking sorted elements
  insertion.bound = {
    pos:{x1:insertion.X - boxSize / 2,
         y1:insertion.Y - boxSize / 2 - 20,
         x2:insertion.X - boxSize / 2,
         y2:insertion.Y + boxSize / 2 + 20}
  };

  // highlight elements at indices
  insertion.highlight = function(indices) {
    q.push(function() {
      indices.forEach(function(i) {
        insertion.slots[i].fill = 'lime';
      });
    });
  }

  // clear the highlighting of elements at indices
  insertion.unhighlight = function(indices) {
    q.push(function() {
      indices.forEach(function(i) {
        insertion.slots[i].fill = 'white';
      });
    });
  }

  // swap elements at specified indices
  insertion.swap = function(i, j) {
    q.push(function() {
      // ensure starting position is current position
      insertion.slots[i].elem.sp.x = insertion.slots[i].pos.x;
      insertion.slots[j].elem.sp.x = insertion.slots[j].pos.x;
      // update position to new position
      insertion.slots[i].elem.pos.x = insertion.slots[j].pos.x;
      insertion.slots[j].elem.pos.x = insertion.slots[i].pos.x;
      var tmp = insertion.slots[i].elem;
      insertion.slots[i].elem = insertion.slots[j].elem;
      insertion.slots[j].elem = tmp;
    });
  }

  // update sorted boundary to the right of index i
  insertion.updateBoundary = function(i) {
    q.push(function() {
      insertion.bound.pos.x1 = insertion.X - boxSize / 2 +
        boxSize * (i + 1);
      insertion.bound.pos.x2 = insertion.bound.pos.x1;
    });
  }

  // take the next step in the algorithm
  // (executes every dur milliseconds)
  insertion.step = function() {
    if (q.length > 0) {
      var callback = q.shift();
      callback();
      redraw();
    }
  }

  // take all queued steps in the algorithm
  // (executes every dur milliseconds)
  insertion.stepall = function() {
    while (q.length > 0) {
      var callback = q.shift();
      callback();
      redraw();
    }
  }

  // get the list of elements in original sequence order
  var getAllElems = function() {
    elements = [];
    insertion.slots.forEach(function(slot) {
      elements.push(slot.elem);
    });
    return elements.sort(function(a, b) { return a.seq - b.seq; });
  }

  // draw the array and its elements
  redraw = function() {
    // draw all array slots
    var rects = d3.select("#g_arrelems")
        .selectAll('rect')
        .data(insertion.slots);

    rects.transition().duration(dur)
      .attr('x', function(d) { return d.pos.x - boxSize / 2; })
      .attr('y', function(d) { return d.pos.y - boxSize / 2; })
      .attr('width', function(d) { return boxSize; })
      .attr('height', function(d) { return boxSize; })
      .attr('fill', function(d) { return d.fill; });

    rects.enter()
      .append('rect')
      .attr('x', function(d) { return d.pos.x - boxSize / 2; })
      .attr('y', function(d) { return d.pos.y - boxSize / 2; })
      .attr('width', function(d) { return boxSize; })
      .attr('height', function(d) { return boxSize; })
      .attr('fill', 'white')
      .transition().duration(dur)
      .attr('fill', function(d) { return d.fill; })
      .attr('x', function(d) { return d.pos.x - boxSize / 2; })
      .attr('y', function(d) { return d.pos.y - boxSize / 2; });

    // draw all elements
    var elems = d3.select("#g_labels")
        .selectAll('text')
        .data(getAllElems());

    elems.text(function(d) { return d.val; })
      .transition().duration(dur)
      .attr('x', function(d) { return d.pos.x; })
      .attr('y', function(d) { return d.pos.y + 1/3 * fontSize; });

    elems.enter()
      .append('text')
      .attr('x', function(d) { return d.sp.x; })
      .attr('y', function(d) { return d.sp.y + 1/3 * fontSize; })
      .attr('fill', 'blue')
      .attr('font-size', fontSize)
      .text(function(d) { return d.val; })
      .transition().duration(dur)
      .attr('x', function(d) { return d.pos.x; })
      .attr('y', function(d) { return d.pos.y + 1/3 * fontSize; });

    // draw sorted boundary
    d3.select("#g_boundary")
      .transition().duration(dur)
      .attr('x1', insertion.bound.pos.x1)
      .attr('x2', insertion.bound.pos.x2)
      .attr('y1', insertion.bound.pos.y1)
      .attr('y2', insertion.bound.pos.y2);
  }

  // initialize the visualization layout
  initialize = function() {
    // append svg header bar
    d3.select("body")
      .append("div")
      .attr('id','navdiv');

    // append the svg canvas
    d3.select("body")
      .append("svg")
      .attr("width", svgW)
      .attr("height", svgH)
      .attr('id','insertionsvg');

    // append element for holding array elements
    d3.select("#insertionsvg")
      .append('g')
      .attr('id','g_arrelems');

    // append element for holding array element labels
    d3.select("#insertionsvg")
      .append('g')
      .attr('id','g_labels');

    // append element for holding sorted boundary line
    d3.select("#insertionsvg")
      .append('line')
      .attr('id','g_boundary')
      .attr('stroke','black');

    // display initial array
    redraw();
  }
  initialize();
  return insertion;
}