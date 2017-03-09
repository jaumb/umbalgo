
var array_factory = (function(){

  /****************************************************************************
   *  private array_factory methods
   ****************************************************************************/
  /**
   * Create a new array visualization on the canvas.
   * @param {number[]|string[]} elems - Elements occupying array slots
   * @param {Object} bounding_box - The box inside of which to center the array
   */
  function Array_viz(elems, bounding_box) {
    var _X1 = bounding_box.p1.x;
    var _Y1 = bounding_box.p1.y;
    var _X2 = bounding_box.p2.x;
    var _Y2 = bounding_box.p2.y;
    var _W = _X2 - _X1;
    var _H = _Y2 - _Y1;
    var _elems = [];

    var _boxSize = _W / (elems.length + 2);
    var _firstPos = {x:_X1 + _boxSize, y:_Y1 + (_H - _boxSize) / 2};

    // create the initial array of elements
    elems.forEach(function(e, i) {
      var rect = element_factory.rect();
      rect.pos.x = _firstPos.x + i * _boxSize;
      rect.pos.y = _firstPos.y;
      rect.sp.x = rect.pos.x;
      rect.sp.y = rect.pos.y;
      rect.width = _boxSize;
      rect.height = _boxSize;
      rect.stroke_width = '.3vw';
      rect.label.val = e;
      rect.label.font_size = (.7 * _boxSize) + 'px';
      rect.label.pos.x = rect.pos.x + 1/2 * _boxSize;
      rect.label.pos.y = rect.pos.y + .72 * _boxSize;
      rect.label.sp.x = rect.label.pos.x;
      rect.label.sp.y = rect.label.pos.y;
      _elems.push(rect);
    });

    /**************************************************************************
     *  public Array_viz methods
     **************************************************************************/
    /**
     * Set the fill attribute of an array slot.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {string} color - The new fill color of these array slots.
     */
    function setFill(indices, color) {
      indices.forEach(function(i) {
        _elems[i].fill = color;
      });
    }

    /**
     * Set the outline attribute of an array slot.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {string} color - The new outline color of these array slots.
     */
    function setOutline(indices, color) {
      indices.forEach(function(i) {
        _elems[i].stroke = color;
      });
    }

    /**
     * Swap two elements.
     * @param {number} i - The index of element 1.
     * @param {number} j - The index of element 2.
     */
    function swap(i, j) {
      _elems[i].label.pos.x = _elems[j].pos.x + 1/2 * _boxSize;
      _elems[j].label.pos.x = _elems[i].pos.x + 1/2 * _boxSize;
      _elems[i].label.pos.y = _elems[j].pos.y + .72 * _boxSize;
      _elems[j].label.pos.y = _elems[i].pos.y + .72 * _boxSize;
      var tmp = _elems[i].label;
      _elems[i].label = _elems[j].label;
      _elems[j].label = tmp;
    }

    /**
     * Emphasize array slots.
     * @param {number[]} indices - The indices of the slots to emphasize.
     */
    function emphasize(indices) {
      indices.forEach(function(i) {
        if (_elems[i].emphasis) {
          _elems[i].emphasis.stroke = colors.EMPHASIZE;
          _elems[i].emphasis.stroke_opacity = .3;
        } else {
          var rect = element_factory.rect();
          rect.pos.x = _elems[i].pos.x - 1/10 * _boxSize;
          rect.pos.y = _elems[i].pos.y - 1/10 * _boxSize;
          rect.sp.x = rect.pos.x;
          rect.sp.y = rect.pos.y;
          rect.width = _boxSize + 1/5 * _boxSize;
          rect.height = _boxSize + 1/5 * _boxSize;
          rect.stroke = colors.EMPHASIZE;
          rect.stroke_opacity = .5;
          rect.fill_opacity = 0;
          _elems[i].emphasis = rect;
        }
      });
    }

    /**
     * De-emphasize array slots.
     * @param {number[]} indices - The indices of the slots to de-emphasize.
     */
    function deemphasize(indices) {
      indices.forEach(function(i) {
        if (_elems[i].emphasis) {
          _elems[i].emphasis.stroke = colors.WHITE;
          _elems[i].emphasis.stroke_opacity = 0;
        }
      });
    }

    /**
     * Create or change slots' text label.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {number|string} new_label - The slots' new text label.
     */
    function setLabels(indices, new_label) {
      indices.forEach(function(i) {
        _elems[i].label.val = new_label;
      });
    }

    /**
     * Set slots' text label fill color.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {string} color - The new text color for slot labels.
     */
    function setLabelFill(indices, color) {
      indices.forEach(function(i) {
        _elems[i].label.fill = color;
      });
    }

    /**
     * Get a deep copy of the underlying array.
     * @param {number[]=} indices - The indices of the slots to retrieve.
     */
    function getArray(indices) {
      var copy = [];
      if (indices) {
        indices.forEach(function(i) {
          copy.push(_elems[i].copy());
        });
      } else {
        _elems.forEach(function(e) {
          copy.push(e.copy());
        });
      }
      return copy;
    }

    /**
     * Gather all rectangles used in this visualization.
     * Used to get a list of all rectangles to draw on the canvas.
     */
    function getRects() {
      var emphasis = [];
      _elems.forEach(function(e){
        if (e.emphasis) {
          emphasis.push(e.emphasis);
        }
      });
      return _elems.concat(emphasis);
    }

    // return public functions
    return {
      setFill:setFill,
      setOutline:setOutline,
      swap:swap,
      emphasize:emphasize,
      deemphasize:deemphasize,
      setLabelFill:setLabelFill,
      setLabels:setLabels,
      getRects:getRects
    }
  }


  /****************************************************************************
   *  public Array_viz methods
   ****************************************************************************/
  /**
   * Get a new array visualization object.
   * @param {number[]|string[]} elems - Elements occupying array slots
   * @param {Object} bounding_box - The box inside of which to center the array
   */
  function get_array(elems, bounding_box) {
    return new Array_viz(elems, bounding_box);
  }

  // return public Array_viz methods
  return {
    get_array:get_array
  }

})();
