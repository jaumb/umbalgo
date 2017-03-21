
var redraw = (function() {

  /****************************************************************************
   *  private variables
   ****************************************************************************/
  // queue of functions to update the canvas
  var _q = [];
  var _intervalID = null;


  /****************************************************************************
   *  private methods
   ****************************************************************************/

  /**
   * Execute the next function on the queue.
   * @param {Object} viz - The visualization object for a specific algorithm.
   * @param {number} dur - Duration of the function's execution in milliseconds.
   */
  function _next(viz, dur) {
    var f = _q.shift();
    if ( f ) { f(); }
    _draw(viz, dur);
    if (_q.length <= 0) {
      clearInterval(_intervalID);
      _intervalID = null;
    }
  }

  /**
   * Update the svg canvas.
   * @param {Object} viz - The visualization object for a specific algorithm.
   * @param {number} dur - Num. of milliseconds to spend updating the canvas.
   */
  function _draw(viz, dur) {

    // draw all rectangles
    var rects = d3.select("#g_rects")
      .selectAll('rect')
      .data(viz.getRects());

    rects.transition().duration(dur)
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x', function(d) { return d.getPosX(); })
      .attr('y', function(d) { return d.getPosY(); })
      .attr('width', function(d) { return d.getWidth(); })
      .attr('height', function(d) { return d.getHeight(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); });

    rects.enter()
      .append('rect')
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x', function(d) { return d.getSpX(); })
      .attr('y', function(d) { return d.getSpY(); })
      .attr('width', function(d) { return d.getWidth(); })
      .attr('height', function(d) { return d.getHeight(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); })
      .transition().duration(dur)
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('width', function(d) { return d.getWidth(); })
      .attr('height', function(d) { return d.getHeight(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); })
      .attr('x', function(d) { return d.getPosX(); })
      .attr('y', function(d) { return d.getPosY(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); });

    // draw all circles
    var circles = d3.select("#g_circles")
      .selectAll('circle')
      .data(viz.getCircles());

    circles.transition().duration(dur)
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('cx', function(d) { return d.getPosCX(); })
      .attr('cy', function(d) { return d.getPosCY(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); })
      .attr('r', function(d) { return d.getR(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); });

    circles.enter()
      .append('circle')
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('cx', function(d) { return d.getSpCX(); })
      .attr('cy', function(d) { return d.getSpCY(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); })
      .attr('r', function(d) { return d.getR(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); })
      .transition().duration(dur)
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('cx', function(d) { return d.getPosCX(); })
      .attr('cy', function(d) { return d.getPosCY(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); })
      .attr('r', function(d) { return d.getR(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); });

    // draw all lines
    var lines = d3.select("#g_lines")
      .selectAll('line')
      .data(viz.getLines());

    lines.transition().duration(dur)
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x1', function(d) { return d.getPosX1(); })
      .attr('y1', function(d) { return d.getPosY1(); })
      .attr('x2', function(d) { return d.getPosX2(); })
      .attr('y2', function(d) { return d.getPosY2(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); });

    lines.enter()
      .append('line')
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x1', function(d) { return d.getSpX1(); })
      .attr('y1', function(d) { return d.getSpY1(); })
      .attr('x2', function(d) { return d.getSpX2(); })
      .attr('y2', function(d) { return d.getSpY2(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); })
      .transition().duration(dur)
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x1', function(d) { return d.getPosX1(); })
      .attr('y1', function(d) { return d.getPosY1(); })
      .attr('x2', function(d) { return d.getPosX2(); })
      .attr('y2', function(d) { return d.getPosY2(); })
      .attr('stroke', function(d) { return d.getStroke(); })
      .attr('stroke-width', function(d) { return d.getStrokeWidth(); })
      .attr('stroke-opacity', function(d) { return d.getStrokeOpacity(); });

    // draw all text elements
    var text = d3.select("#g_text")
      .selectAll('text')
      .data(viz.getText());

    text.text(function(d) { return d.getVal(); })
      .transition().duration(dur)
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x', function(d) { return d.getPosX(); })
      .attr('y', function(d) { return d.getPosY(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); })
      .attr('font', function(d) { return d.getFont(); })
      .attr('font-size', function(d) { return d.getFontSize(); })
      .attr('text-anchor', function(d) { return d.getTextAnchor(); });

    text.enter()
      .append('text')
      .text(function(d) { return d.getVal(); })
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x', function(d) { return d.getSpX(); })
      .attr('y', function(d) { return d.getSpY(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); })
      .attr('font', function(d) { return d.getFont(); })
      .attr('font-size', function(d) { return d.getFontSize(); })
      .attr('text-anchor', function(d) { return d.getTextAnchor(); })
      .transition().duration(dur)
      .text(function(d) { return d.getVal(); })
      .attr('id', function(d) { return 'elem_' + d.getID(); })
      .attr('x', function(d) { return d.getPosX(); })
      .attr('y', function(d) { return d.getPosY(); })
      .attr('fill', function(d) { return d.getFill(); })
      .attr('fill-opacity', function(d) { return d.getFillOpacity(); })
      .attr('font', function(d) { return d.getFont(); })
      .attr('font-size', function(d) { return d.getFontSize(); })
      .attr('text-anchor', function(d) { return d.getTextAnchor(); });

  }


  /****************************************************************************
   *  public methods
   ****************************************************************************/

  /**
   * Public method to execute all functions currently in the queue and then
   * update the svg canvas.
   * @param {Object} viz - The visualization object for a specific algorithm.
   * @param {number} dur - Duration of the entire redraw in milliseconds.
   */
  function draw(viz, dur) {
    // TODO: Revisit how to allocate time per redraw component.
    if ( _q.length ) {
      
      var durPerFunction = dur / _q.length;
      if (_intervalID) { clearInterval(_intervalID); }
      _intervalID = setInterval(_next,
                               durPerFunction,
                               viz,               // next arg 1
                               durPerFunction);   // next arg 2
    } else {
      _draw(viz, dur);
    }
  }

  /**
   * Add a function to the queue. Any changes this function makes to the
   * visualization's elements will be reflected the next time redraw() is
   * called.
   * @param {Object} op - A function object to be added to the queue.
   */
  function addOp(op) {
    _q.push(op);
  }

  /**
   * Add a function to the queue and immediately redraw the canvas.
   * This is a convenience function.
   * @param {Object} viz - The visualization object for a specific algorithm.
   * @param {number} dur - Duration of the entire redraw in milliseconds.
   * @param {Object} op - A function object to be added to the queue.
   */
  function addOpAndDraw(viz, dur, op) {
    _q.push(op);
    draw(viz, dur);
  }

  /**
   * Remove an svg element from the canvas.
   * @param {number} id - The id of the element to remove.
   */
  function removeElem(id) {
    d3.select('#elem_' + id).remove();
  }

  /**
   * Initialize the visualization layout by appending group elements to the
   * svg canvas for each type of element (rect, circle, line, text).
   */
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

    // append group element for text elements
    d3.select("#svgcanvas")
      .append('g')
      .attr('id','g_text');
  }


  /****************************************************************************
   *  return public methods
   ****************************************************************************/
  return {
    draw:draw,
    addOp:addOp,
    addOpAndDraw:addOpAndDraw,
    removeElem:removeElem,
    initialize:initialize
  };

})();
