
var array_factory = (function(){

  //////////////////////////////////////////////////////////////////////////////
  //  private array_factory methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new array visualization on the canvas.
   * @param {number[]|string[]} elems - Elements occupying array slots
   * @param {Object} bounding_box - The box inside of which to center the array
   */
  function Array_viz(elems, bounding_box) {

    ////////////////////////////////////////////////////////////////////////////
    //  private variables
    ////////////////////////////////////////////////////////////////////////////
    var _X1 = bounding_box.p1.x;
    var _Y1 = bounding_box.p1.y;
    var _X2 = bounding_box.p2.x;
    var _Y2 = bounding_box.p2.y;
    var _W = _X2 - _X1;
    var _H = _Y2 - _Y1;
    var _elems = [];
    var _indexLabels = [];

    var _boxSize = _W / (elems.length + 2);
    var _firstPos = {x:_X1 + _boxSize, y:_Y1 + (_H - _boxSize) / 2};

    // create the initial array of elements
    elems.forEach(function(e, i) {
      var rect = element_factory.getRect();
      rect.setPosX(_firstPos.x + i * _boxSize);
      rect.setPosY(_firstPos.y);
      rect.setSpX(rect.getPosX());
      rect.setSpY(rect.getPosY());
      rect.setWidth(_boxSize);
      rect.setHeight(_boxSize);
      rect.setStrokeWidth('.3vw');
      rect.getLabel().setVal(e);
      rect.getLabel().setFontSize((0.7 * _boxSize) + 'px');
      rect.getLabel().setPosX(rect.getPosX() + 0.5 * _boxSize);
      rect.getLabel().setPosY(rect.getPosY() + 0.72 * _boxSize);
      rect.getLabel().setSpX(rect.getLabel().getPosX());
      rect.getLabel().setSpY(rect.getLabel().getPosY());
      _elems.push(rect);
      // index labels
      var index = element_factory.getText();
      index.setVal(i);
      index.setFontSize(0.25 * rect.getLabel().getFontSize().split('p')[0] +
                                                                      'px');
      index.setTextAnchor('end');
      index.setPosX(rect.getPosX() + 0.9 * rect.getWidth());
      index.setPosY(rect.getPosY() + 0.9 * rect.getHeight());
      _indexLabels.push(index);
    });

    ////////////////////////////////////////////////////////////////////////////
    //  private Array_viz methods
    ////////////////////////////////////////////////////////////////////////////
    /**
     * Fit the emphasis box around an array slot.
     * @param {Object} emphasis - The emphasis rect element.
     * @param {Object} slot - The array slot rect element.
     */
    function _fitEmphasis(emphasis, slot) {
      emphasis.setPosX(slot.getPosX() - 1/10 * slot.getWidth());
      emphasis.setPosY(slot.getPosY() - 1/10 * slot.getHeight());
      emphasis.setWidth(slot.getWidth() + 1/5 * slot.getWidth());
      emphasis.setHeight(slot.getHeight() + 1/5 * slot.getHeight());
    }

    ////////////////////////////////////////////////////////////////////////////
    //  public Array_viz methods
    ////////////////////////////////////////////////////////////////////////////
    /**
     * Set the fill attribute of an array slot.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {string} color - The new fill color of these array slots.
     */
    function setFill(indices, color) {
      indices.forEach(function(i) {
        _elems[i].setFill(color);
      });
    }

    /**
     * Set the outline attribute of an array slot.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {string} color - The new outline color of these array slots.
     */
    function setOutline(indices, color) {
      indices.forEach(function(i) {
        _elems[i].setStroke(color);
      });
    }

    /**
     * Swap two elements.
     * @param {number} i - The index of element 1.
     * @param {number} j - The index of element 2.
     */
    function swap(i, j) {
      var rect1 = _elems[i];
      var rect2 = _elems[j];
      rect1.getLabel().setPosX(rect2.getPosX() + 0.5 * _boxSize);
      rect2.getLabel().setPosX(rect1.getPosX() + 0.5 * _boxSize);
      rect1.getLabel().setPosY(rect2.getPosY() + 0.72 * _boxSize);
      rect2.getLabel().setPosY(rect1.getPosY() + 0.72 * _boxSize);
      var tmp = rect1.getLabel();
      rect1.setLabel(rect2.getLabel());
      rect2.setLabel(tmp);
    }

    /**
     * Emphasize array slots.
     * @param {number[]} indices - The indices of the slots to emphasize.
     */
    function emphasize(indices) {
      indices.forEach(function(i) {
        if (_elems[i].emphasis) {
          _elems[i].emphasis.setStroke(colors.EMPHASIZE);
          _elems[i].emphasis.setStrokeOpacity(0.5);
        } else {
          var rect = element_factory.getRect();
          _fitEmphasis(rect, _elems[i]);
          rect.setSpX(rect.getPosX());
          rect.setSpY(rect.getPosY());
          rect.setStroke(colors.EMPHASIZE);
          rect.setStrokeOpacity(0.5);
          rect.setFillOpacity(0);
          _elems[i].emphasis = rect;
        }
      });
    }

    /**
     * Move emphasis box.
     * @param {number} i - The index of the emphasized slot.
     * @param {number} j - The index of the slot to emphasize.
     */
    function moveEmphasis(i, j) {
      if (_elems[i].emphasis) {
        _elems[j].emphasis = _elems[i].emphasis;
        _elems[i].emphasis = null;
        _fitEmphasis(_elems[j].emphasis, _elems[j]);
      }
    }

    /**
     * De-emphasize array slots.
     * @param {number[]} indices - The indices of the slots to de-emphasize.
     */
    function deemphasize(indices) {
      indices.forEach(function(i) {
        if (_elems[i].emphasis) {
          redraw.removeElem(_elems[i].emphasis.getID());
          _elems[i].emphasis = null;
        }
      });
    }

    /**
     * Create or change slots' text label.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {number|string} newLabel - The slots' new text label.
     */
    function setLabels(indices, newLabel) {
      indices.forEach(function(i) {
        _elems[i].getLabel().setVal(newLabel);
      });
    }

    /**
     * Set slots' text label fill color.
     * @param {number[]} indices - The indices of the slots to modify.
     * @param {string} color - The new text color for slot labels.
     */
    function setLabelFill(indices, color) {
      indices.forEach(function(i) {
        _elems[i].getLabel().setFill(color);
      });
    }

    /**
     * Get a deep copy of the underlying array.
     * @param {number[]=} indices - The indices of the slots to retrieve.
     */
    function getSlots(indices) {
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

    // element gathering functions /////////////////////////////////////////////

    /**
     * Gather all rectangles used in this array..
     * Used to get a list of all rectangles to draw on the canvas.
     */
    function getRects() {
      var emphasis = [];
      _elems.forEach(function(e) {
        if (e.emphasis) { emphasis.push(e.emphasis); }
      });
      return _elems.concat(emphasis);
    }

    /**
     * Gather all text elements used in this array.
     * Used to get a list of all text to draw on the canvas.
     * TODO: Do the text elements need to be copies?
     */
    function getText() {
      var labels = [];
      _elems.forEach(function(e) {
        labels.push(e.getLabel());
      });
      return _indexLabels.concat(labels);
    }

    /**
     * Gather all circles used in this array.
     * Used to get a list of all circles to draw on the canvas.
     */
    function getCircles() {
      return [];
    }

    /**
     * Gather all lines used in this array.
     * Used to get a list of all lines to draw on the canvas.
     */
    function getLines() {
      return [];
    }

    // return public functions
    return {
      setFill:setFill,
      setOutline:setOutline,
      swap:swap,
      emphasize:emphasize,
      moveEmphasis:moveEmphasis,
      deemphasize:deemphasize,
      setLabelFill:setLabelFill,
      setLabels:setLabels,
      getRects:getRects,
      getText:getText,
      getCircles:getCircles,
      getLines:getLines,
      getSlots:getSlots
    };
  }


  //////////////////////////////////////////////////////////////////////////////
  //  public array_factory methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get a new array visualization object.
   * @param {number[]|string[]} elems - Elements occupying array slots
   * @param {Object} bounding_box - The box inside of which to center the array
   */
  function get_array(elems, bounding_box) {
    return new Array_viz(elems, bounding_box);
  }

  // return public array_factory methods
  return {
    get_array:get_array
  };

})();
