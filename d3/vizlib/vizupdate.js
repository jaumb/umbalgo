

var vizupdate = (function() {

  /****************************************************************************
   *  private variables
   ****************************************************************************/

  // queue of functions to update the canvas
  var q = [];


  /****************************************************************************
   *  private methods
   ****************************************************************************/

  // execute the next function on the queue
  function next(viz, dur, intervalID) {
    var f = q.shift();
    f();
    draw(viz, dur);
    if (q.length <= 0) {
      clearInterval(intervalID);
    }
  }

  // private function to actually update the svg canvas
  function draw(viz, dur) {

    // draw all rectangles
    var rects = d3.select("#g_rects")
      .selectAll('rect')
      .data(viz.getRects());

    rects.transition().duration(dur)
      .attr('x', function(d) { return d.pos.x; })
      .attr('y', function(d) { return d.pos.y; })
      .attr('width', function(d) { return d.width; })
      .attr('height', function(d) { return d.height; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; })
      .attr('fill', function(d) { return d.fill; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; });

    rects.enter()
      .append('rect')
      .attr('x', function(d) { return d.sp.x; })
      .attr('y', function(d) { return d.sp.y; })
      .attr('width', function(d) { return d.width; })
      .attr('height', function(d) { return d.height; })
      .attr('fill', 'white')
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; })
      .transition().duration(dur)
      .attr('fill', function(d) { return d.fill; })
      .attr('width', function(d) { return d.width; })
      .attr('height', function(d) { return d.height; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; })
      .attr('x', function(d) { return d.pos.x; })
      .attr('y', function(d) { return d.pos.y; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; });

    // draw all circles
    var circles = d3.select("#g_circles")
      .selectAll('circle')
      .data(viz.getCircles());

    circles.transition().duration(dur)
      .attr('cx', function(d) { return d.pos.x; })
      .attr('cy', function(d) { return d.pos.y; })
      .attr('fill', function(d) { return d.fill; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; })
      .attr('r', function(d) { return d.radius; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; });

    circles.enter()
      .append('circle')
      .attr('cx', function(d) { return d.sp.x; })
      .attr('cy', function(d) { return d.sp.y; })
      .attr('fill', function(d) { return d.fill; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; })
      .attr('r', function(d) { return d.radius; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; })
      .transition().duration(dur)
      .attr('cx', function(d) { return d.pos.x; })
      .attr('cy', function(d) { return d.pos.y; })
      .attr('fill', function(d) { return d.fill; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; })
      .attr('r', function(d) { return d.radius; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; });

    // draw all lines
    var lines = d3.select("#g_lines")
      .selectAll('line')
      .data(viz.getLines());

    lines.transition().duration(dur)
      .attr('x1', function(d) { return d.pos.x1; })
      .attr('y1', function(d) { return d.pos.y1; })
      .attr('x2', function(d) { return d.pos.x2; })
      .attr('y2', function(d) { return d.pos.y2; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; });

    lines.enter()
      .append('line')
      .attr('x1', function(d) { return d.sp.x1; })
      .attr('y1', function(d) { return d.sp.y1; })
      .attr('x2', function(d) { return d.sp.x2; })
      .attr('y2', function(d) { return d.sp.y2; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; })
      .transition().duration(dur)
      .attr('x1', function(d) { return d.pos.x1; })
      .attr('y1', function(d) { return d.pos.y1; })
      .attr('x2', function(d) { return d.pos.x2; })
      .attr('y2', function(d) { return d.pos.y2; })
      .attr('stroke', function(d) { return d.stroke; })
      .attr('stroke-width', function(d) { return d.stroke_width; })
      .attr('stroke-opacity', function(d) { return d.stroke_opacity; });

    // draw all labels
    var labels = d3.select("#g_labels")
      .selectAll('text')
      .data(viz.getLabels());

    labels.text(function(d) { return d.val; })
      .transition().duration(dur)
      .attr('x', function(d) { return d.pos.x; })
      .attr('y', function(d) { return d.pos.y; })
      .attr('fill', function(d) { return d.fill; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; })
      .attr('font-size', function(d) { return d.font_size; })
      .attr('text-anchor', function(d) { return d.text_anchor; });

    labels.enter()
      .append('text')
      .text(function(d) { return d.val; })
      .attr('x', function(d) { return d.sp.x; })
      .attr('y', function(d) { return d.sp.y; })
      .attr('fill', function(d) { return d.fill; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; })
      .attr('font-size', function(d) { return d.font_size; })
      .attr('text-anchor', function(d) { return d.text_anchor; })
      .transition().duration(dur)
      .text(function(d) { return d.val; })
      .attr('x', function(d) { return d.pos.x; })
      .attr('y', function(d) { return d.pos.y; })
      .attr('fill', function(d) { return d.fill; })
      .attr('fill-opacity', function(d) { return d.fill_opacity; })
      .attr('font-size', function(d) { return d.font_size; })
      .attr('text-anchor', function(d) { return d.text_anchor; });

  }


  /****************************************************************************
   *  public methods
   ****************************************************************************/

  // exposed method that executes all functions on the queue
  // and updates the canvas
  function redraw(viz, dur) {
    var durPerFunction = dur / q.length;
    var intervalID = setInterval(next, durPerFunction, viz,
                                                 durPerFunction, intervalID);
  }

  // add an operation for visualization next time redraw() is called
  function addOperation(operation) {
    q.push(operation);
  }

  // initialize the visualization layout
  function initialize() {

    // append group element for rectangles
    d3.select("#svgcanvas")
        .append('g')
        .attr('id','g_rects');

    // append group element for circles
    d3.select("#svgcanvas")
        .append('g')
        .attr('id','g_circles');

    // append group element for lines
    d3.select("#svgcanvas")
        .append('g')
        .attr('id','g_lines');

    // append group element for labels
    d3.select("#svgcanvas")
      .append('g')
      .attr('id','g_labels');

  }


  /****************************************************************************
   *  return public methods
   ****************************************************************************/

  return {
    redraw:redraw,
    addOperation:addOperation,
    initialize:initialize
  };

})();
