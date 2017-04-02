
var ll_factory = (function() {

  //////////////////////////////////////////////////////////////////////////////
  //  private array_factory methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new array visualization on the canvas.
   * @param {number[]|string[]} elems - Elements occupying array slots.
   * Each element in elems is expected to be a node object with the following
   * properties: id, val, nextID.
   *   id: a unique id for this node
   *   val: the content value of this node
   *   nextID: the node that this node's "next" points to
   * @param {Object} bounding_box - The box inside of which to center the array
   */
  function LL_viz(elems, bounding_box) {
    var _X1 = bounding_box.p1.x;
    var _Y1 = bounding_box.p1.y;
    var _X2 = bounding_box.p2.x;
    var _Y2 = bounding_box.p2.y;
    var _W = _X2 - _X1;
    var _H = _Y2 - _Y1;

    // map to map node IDs to node objects
    var _nodeMap = new Map();

    // first node reference
    var _first = element_factory.getText();


    // calculate box size based on number of nodes:
    //     < 5 : 5 elements + first + spaces between and on ends
    //    >= 5 : # elements + first + spaces between and on ends
    var _boxSize = elems.length < 5 ? _W / 13 : _W / (elems.length + 1) * 2 + 1;


    // calculate coordinates of first based on box size
    var _firstPos = {x:_X1 + _boxSize, y:_Y1 + (_H - _boxSize) / 2};

    // size information for the box holding the reference arrow
    var _nextRefHeight = 0.5 * _boxSize;

    // position first
    _first.setPosX(_firstPos.x + 0.5 * _boxSize);
    _first.setPosY(_firstPos.y + 0.5 * _boxSize);
    // add firstArrow
    var fArrow = element_factory.getLine();
    fArrow.setPosX1(_first.getPosX() + 0.5 * _boxSize);
    fArrow.setPosY1(_firstPos.y + 1.5 * _boxSize);
    fArrow.setPosX2(fArrow.getPosX1() + 1.5 * _boxSize);

    // create the initial array of elements
    elems.forEach(function(e, i) {
      // the content box
      var contentBox = element_factory.getRect();
      contentBox.setPosX(_firstPos.x + i * 2 * _boxSize);
      contentBox.setPosY(_firstPos.y);
      contentBox.setSpX(contentBox.getPosX());
      contentBox.setSpY(contentBox.getPosY());
      contentBox.setWidth(_boxSize);
      contentBox.setHeight(_boxSize);
      contentBox.setStrokeWidth('.3vw');
      contentBox.getLabel().setVal(e.val);
      contentBox.getLabel().setFontSize((0.7 * _boxSize) + 'px');
      contentBox.getLabel().setPosX(contentBox.getPosX() + 0.5 * _boxSize);
      contentBox.getLabel().setPosY(contentBox.getPosY() + 0.72 * _boxSize);
      contentBox.getLabel().setSpX(contentBox.getLabel().getPosX());
      contentBox.getLabel().setSpY(contentBox.getLabel().getPosY());

      // the ref arrow box
      var refBox = element_factory.getRect();
      refBox.setPosX(contentBox.getPosX());
      refBox.setPosY(_firstPos.y + _boxSize);
      refBox.setSpX(refBox.getPosX());
      refBox.setSpY(refBox.getPosY());
      refBox.setWidth(_boxSize);
      refBox.setHeight(_nextRefHeight);
      refBox.setStrokeWidth('.3vw');
      refBox.getLabel().setVisibility('hidden');

      // the ref arrow
      var refArrow = element_factory.getLine();
      refArrow.setPosX1(refBox.getCenter().x);
      refArrow.setPosY1(refBox.getCenter().y);
      refArrow.setSpX1(refArrow.getPosX1());
      refArrow.setSpY1(refArrow.getPosY1());

      var node = {id:e.id,
                  next:e.nextID,
                  contentBox:contentBox,
                  refBox:refBox,
                  refArrow:refArrow};
      _nodeMap.set(e.id, node);
    });

    // position arrows representing node.next
    _nodeMap.forEach(function(v,k,m){
      if (v.next != 'null') {
        v.refArrow.setPosX2(_nodeMap.get(v.next).contentBox.getPosX());
        v.refArrow.setPosY2(_nodeMap.get(v.next).contentBox.getPosY() + _boxSize);
      } else {
        v.refArrow.setPosX2(v.refArrow.getPosX1() + _boxSize);
        v.refArrow.setPosY2(v.refArrow.getPosY1());
        v.refArrow.setMarkerEnd("url(#marker_stub)");
      }
    });

    ////////////////////////////////////////////////////////////////////////////
    //  private Array_viz methods
    ////////////////////////////////////////////////////////////////////////////
    /**
     * Fit the emphasis box around an array slot.
     * @param {Object} emphasis - The emphasis rect element.
     * @param {Object} slot - The array slot rect element.
     * TODO: not updated for LLs yet
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
     * Set the fill attribute of set of node IDs.
     * @param {number[]} nodeIDs - The node IDs of the nodes to modify.
     * @param {string} color - The new fill color of these array slots.
     * CHANGED: updated for nodes
     */
    function setFill(nodeIDs, color) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).contentBox.setFill(color);
        _nodeMap.get(id).refBox.setFill(color);
      });
    }

    /**
     * Set the outline attribute of set of nodeIDs.
     * @param {number[]} nodeIDs - The indices of the slots to modify.
     * @param {string} color - The new outline color of these array slots.
     * CHANGED: updated for nodes
     */
    function setOutline(nodeIDs, color) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).contentBox.setStroke(color);
        _nodeMap.get(id).refBox.setStroke(color);
      });
    }


    /**
     * Emphasize linked list nodes.
     * @param {number[]} nodeIDs - The indices of the slots to emphasize.
     * TODO: test emphasis on linked list nodes
     */
    function emphasize(nodeIDs) {
      nodeIDs.forEach(function(id) {
        if (_nodeMap.get(id).contentBox.emphasis) {
          _nodeMap.get(id).contentBox.emphasis.setStroke(colors.EMPHASIZE);
          _nodeMap.get(id).contentBox.emphasis.setStrokeOpacity(0.5);
        } else {
          var rect = element_factory.getRect();
          _fitEmphasis(rect, _nodes[i].contentBox);
          rect.setSpX(rect.getPosX());
          rect.setSpY(rect.getPosY());
          rect.setStroke(colors.EMPHASIZE);
          rect.setStrokeOpacity(0.5);
          rect.setFillOpacity(0);
          rect.setHeight(1.5 * rect.getHeight());
          _nodeMap.get(id).contentBox.emphasis = rect;
        }
      });
    }

    /**
     * Move emphasis box.
     * @param {number} i - The index of the emphasized slot.
     * @param {number} j - The index of the slot to emphasize.
     * TODO: update for linked list nodes
     */
    function moveEmphasis(i, j) {
      if (_nodes[i].contentBox.emphasis) {
        _nodes[j].contentBox.emphasis = _nodes[i].contentBox.emphasis;
        _nodes[i].contentBox.emphasis = null;
        _fitEmphasis(_nodes[j].contentBox.emphasis, _elems[j]);
      }
    }

    /**
     * De-emphasize array slots.
     * @param {number[]} indices - The indices of the slots to de-emphasize.
     * TODO: update for linked list nodes
     */
    function deemphasize(indices) {
      indices.forEach(function(i) {
        if (_nodes[i].contentBox.emphasis) {
          redraw.removeElem(_nodes[i].contentBox.emphasis.getID());
          _nodes[i].contentBox.emphasis = null;
        }
      });
    }

    /**
     * Create or change text label on a set of node IDs.
     * @param {number[]} nodeIDs - The indices of the slots to modify.
     * @param {number|string} new_label - The slots' new text label(s).
     * CHANGED: adjusted for node objects
     */
    function setLabels(nodeIDs, new_label) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).contentBox.getLabel().setVal(new_label);
      });
    }

    /**
     * Set the text label fill color on the labels of a set of node IDs.
     * @param {number[]} nodeIDs - The indices of the slots to modify.
     * @param {string} color - The new text color for slot labels.
     * CHANGED: updated for node objects
     */
    function setLabelFill(nodeIDs, color) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).contentBox.getLabel().setFill(color);
      });
    }

    /**
     * Get a deep copy of the underlying array.
     * @param {number[]=} nodeIDs - The indices of the slots to retrieve.
     * TODO: All fucked up right now
     */
    function getSlots(indices) {
      var copy = [];
      if (indices) {
        indices.forEach(function(i) {
          copy.push({
            id:_nodeMap.get(i).id,
            next:_nodeMap.get(i).next,
            contentBox:_nodeMap.get(i).contentBox.copy(),
            refBox:_nodeMap.get(i).refBox.copy(),
            refArrow:_nodeMap.get(i).refArrow.copy(),
          });
        });
      } else {
        _nodeMap.forEach(function(v,k,m) {
          copy.push({
            contentBox:v.contentBox.copy(),
            refBox:v.refBox.copy(),
            // refArrow:e.refArrow.copy(), TODO: get copy functions jeff implemented
            refArrow:''
          });
        });
      }
      return copy;
    }

    function moveNodes(horiz, vert, nodeIDs) {
      if (nodeIDs) {
        nodeIDs.forEach(function(id) {
          var node = _nodeMap.get(id);
          // horizontal movement
          node.contentBox.setPosX(node.contentBox.getPosX() + horiz);
          node.contentBox.getLabel().setPosX(node.contentBox.getPosX() + horiz);
          node.refBox.setPosX(node.refBox.getPosX() + horiz);
          node.refArrow.setPosX1(node.refArrow.getPosX1() + horiz);
          node.refArrow.setPosX2(node.refArrow.getPosX2() + horiz);
          // vertical movement
          node.contentBox.setPosY(node.contentBox.getPosY() + vert);
          node.contentBox.getLabel().setPosY(node.contentBox.getPosY() + vert);
          node.refBox.setPosY(node.refBox.getPosY() + vert);
          node.refArrow.setPosY1(node.refArrow.getPosY1() + vert);
          node.refArrow.setPosY2(node.refArrow.getPosY2() + vert);
        });
      } else {
        _nodeMap.forEach(function(v,k,m) {
          // horizontal movement
          v.contentBox.setPosX(v.contentBox.getPosX() + horiz);
          v.contentBox.getLabel().setPosX(v.contentBox.getLabel().getPosX() + horiz);
          v.refBox.setPosX(v.refBox.getPosX() + horiz);
          v.refArrow.setPosX1(v.refArrow.getPosX1() + horiz);
          v.refArrow.setPosX2(v.refArrow.getPosX2() + horiz);
          // vertical movement
          v.contentBox.setPosY(v.contentBox.getPosY() + vert);
          v.contentBox.getLabel().setPosY(v.contentBox.getLabel().getPosY() + vert);
          v.refBox.setPosY(v.refBox.getPosY() + vert);
          v.refArrow.setPosY1(v.refArrow.getPosY1() + vert);
          v.refArrow.setPosY2(v.refArrow.getPosY2() + vert);
        });
      }

    }

    // element gathering functions /////////////////////////////////////////////

    /**
     * Gather all rectangles used in this array..
     * Used to get a list of all rectangles to draw on the canvas.
     * CHANGED: for node objects
     */
    function getRects() {
      var rects = [];
      _nodeMap.forEach(function(v,k,m) {
        if (v.contentBox.emphasis) { rects.push(v.contentBox.emphasis); }
        rects.push(v.contentBox);
        rects.push(v.refBox);
      });
      return rects;
    }

    /**
     * Gather all text elements used in this array.
     * Used to get a list of all text to draw on the canvas.
     * CHANGED: updated for node objects
     */
    function getText() {
      var labels = [];
      _nodeMap.forEach(function(v,k,m) {
        labels.push(v.contentBox.getLabel());
      });
      return labels;
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
      var lines = [];
      _nodeMap.forEach(function(v,k,m) {
        lines.push(v.refArrow);
      });
      return lines;
    }

    // return public functions
    return {
      setFill:setFill,
      setOutline:setOutline,
      emphasize:emphasize,
      moveEmphasis:moveEmphasis,
      deemphasize:deemphasize,
      setLabelFill:setLabelFill,
      setLabels:setLabels,
      getRects:getRects,
      getText:getText,
      getCircles:getCircles,
      getLines:getLines,
      getSlots:getSlots,
      moveNodes:moveNodes
    };
  }


  //////////////////////////////////////////////////////////////////////////////
  //  public Array_viz methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get a new array visualization object.
   * @param {number[]|string[]} elems - Elements occupying array slots
   * @param {Object} bounding_box - The box inside of which to center the array
   */
  function get_LL(elems, bounding_box) {
    return new LL_viz(elems, bounding_box);
  }

  // return public Array_viz methods
  return {
    get_LL:get_LL
  };

})();
