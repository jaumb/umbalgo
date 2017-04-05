
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

    // calculate box size based on number of nodes:
    //     < 5 : 5 elements + first + spaces between and on ends
    //    >= 5 : # elements + first + spaces between and on ends
    var _boxSize = elems.length < 5 ? _W / 12
                                    : _W / (elems.length * 2 + 1);

    // create default node ref labels
    var _first    =  {name:element_factory.getText(),
                      arrow:element_factory.getLine(),
                      target:null};
    var _oldfirst =  {name:element_factory.getText(),
                      arrow:element_factory.getLine(),
                      target:null};
    var _last     =  {name:element_factory.getText(),
                      arrow:element_factory.getLine(),
                      target:null};
    var _oldlast  =  {name:element_factory.getText(),
                      arrow:element_factory.getLine(),
                      target:null};
    // calculate coordinates of default labels based on box size
    var _nodeRefCoords = _getNodeRefCoords(_boxSize);
    // update node refs based on c
    _updateNodeRefs(_nodeRefCoords, _boxSize);

    // calculate coordinates of first node
    var _firstNodePos = {x:_X1 + _boxSize, y:_Y1 + (_H - _boxSize) / 2};

    // logging TODO: remove
    console.log("canvas width: " + _W);
    console.log("number of elements: " + elems.length);
    console.log("box size: " + _boxSize);
    console.log("first position: x = " + _first.name.getPosX() + ", y = " + _first.name.getPosY());

    // size information for the box holding the reference arrow
    var _nextRefHeight = 0.5 * _boxSize;

    // initialize nodes
    _initNodes();



    ////////////////////////////////////////////////////////////////////////////
    //  private Array_viz methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Determine the coordinates of all node references (first, last, etc.)
     * based on the current box size.
     * @param {number} boxSize - The current width/height of the item part of
     * a node box.
     */
    function _getNodeRefCoords(boxSize) {
      return {
        first:{x:_X1 + 1.5 * boxSize,
               y:_Y1 + (_H - boxSize) / 2 - 1 * boxSize},
        oldfirst:{x:_X1 + 1.5 * boxSize,
                  y:_Y1 + (_H - boxSize) / 2 + 3 * boxSize},
        last:{x:_X1 + ((elems.length) * 2 - 0.5) * boxSize,
              y:_Y1 + (_H - boxSize) / 2 - 1 * boxSize},
        oldlast: {x:_X1 + ((elems.length) * 2 - 0.5) * boxSize,
                  y:_Y1 + (_H - boxSize) / 2 + 3 * boxSize}
      };
    }

    /**
     * Specify the node that a ref points to.
     * @param {Object} ref - The reference (first, last, oldfirst, or oldlast).
     * @param {number} nodeID - The node ID of the node ref should point to.
     * If no nodeID argument is provided, ref's target is set to null.
     */
    function setRefTarget(ref, nodeID) {
      if(nodeID) {
        ref.target = _nodeMap.get(nodeID);
      }
      else {
        ref.target = null;
      }
    }

    /**
     * Update the coordinates of the node references (first, last, etc.) to
     * the current position based on the current boxSize.
     *   first                              last
     *    **-----**-----**-----**-----**-----**
     *  oldfirst                           oldlast
     * @param {Object} coords - The coordinates of the reference labels.
     * @param {number} boxSize - The current width/height of the item part of
     * a node box.
     */
    function _updateNodeRefs(coords, boxSize) {
      // position first
      _first.name.setPosX(coords.first.x);
      _first.name.setPosY(coords.first.y);
      _first.name.setVal("first");
      _first.name.setFontSize((0.7 * boxSize) + 'px');
      // position first arrow
      _first.arrow.setPosX1(coords.first.x);
      _first.arrow.setPosY1(coords.first.y + 0.25 * boxSize);
      _first.arrow.setPosX2(coords.first.x);
      _first.arrow.setPosY2(coords.first.y + boxSize);

      // position oldfirst
      _oldfirst.name.setPosX(coords.oldfirst.x);
      _oldfirst.name.setPosY(coords.oldfirst.y);
      _oldfirst.name.setVal("oldfirst");
      _oldfirst.name.setFontSize((0.7 * _boxSize) + 'px');
      // position oldFirst arrow
      _oldfirst.arrow.setPosX1(coords.oldfirst.x);
      _oldfirst.arrow.setPosY1(coords.oldfirst.y - 0.5 * boxSize);
      _oldfirst.arrow.setPosX2(coords.oldfirst.x);
      _oldfirst.arrow.setPosY2(coords.oldfirst.y - 1.5 * boxSize);

      // position last
      _last.name.setPosX(coords.last.x);
      _last.name.setPosY(coords.last.y);
      _last.name.setVal("last");
      _last.name.setFontSize((0.7 * _boxSize) + 'px');
      // position last arrow
      _last.arrow.setPosX1(coords.last.x);
      _last.arrow.setPosY1(coords.last.y + 0.25 * boxSize);
      _last.arrow.setPosX2(coords.last.x);
      _last.arrow.setPosY2(coords.last.y + boxSize);

      // position oldlast
      _oldlast.name.setPosX(coords.oldlast.x);
      _oldlast.name.setPosY(coords.oldlast.y);
      _oldlast.name.setVal("oldlast");
      _oldlast.name.setFontSize((0.7 * _boxSize) + 'px');
      // position oldlast arrow
      _oldlast.arrow.setPosX1(coords.oldlast.x);
      _oldlast.arrow.setPosY1(coords.oldlast.y - 0.5 * boxSize);
      _oldlast.arrow.setPosX2(coords.oldlast.x);
      _oldlast.arrow.setPosY2(coords.oldlast.y - 1.5 * boxSize);
    }

    /**
     * Create the initial set of nodes, ref boxes, and arrows.
     */
    function _initNodes() {
      if (!elems.length) {
        _first.arrow.setMarkerEnd('url(#marker_stub)');
      }
      else {
        // create the initial array of elements
        elems.forEach(function(e, i) {
          // the content box
          var contentBox = element_factory.getRect();
          contentBox.setPosX(_firstNodePos.x + i * 2 * _boxSize);
          contentBox.setPosY(_firstNodePos.y);
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
          refBox.setPosY(_firstNodePos.y + _boxSize);
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
      }

      // all node refs except first are initially hidden
      _hideRef(_oldfirst, _last, _oldlast);
    }

    /**
     * Hide one or more of the node references (first, last, etc.).
     * @param {...Object} refs - One or more node ref objects.
     */
    function _hideRef(...refs) {
      refs.forEach(function(r) {
        r.name.setFillOpacity(0);
        r.name.setStrokeOpacity(0);
        r.arrow.setOpacity(0);
      });
    }



    /**
     * Move a set of nodes horizontally and/or vertically. If no nodeIDs arg
     * provided, move all nodes.
     * @param {number} horiz - How far to move nodes horizontally (positive
     * to move right, negative to move left).
     * @param {number} horiz - How far to move nodes vertically (positive
     * to move down, negative to move up).
     * @param {Object[]} nodeIDs - Array of node IDs to move.
     * a node box.
     */
    function _moveNodes(horiz, vert, nodeIDs) {
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

    function addNode(node) {
      console.log("_nodeMap length = " + _nodeMap.size);
      if (_nodeMap.size === 0) {
        // the content box
        var contentBox = element_factory.getRect();
        contentBox.setPosX(_firstNodePos.x);
        contentBox.setPosY(_firstNodePos.y);
        contentBox.setSpX(contentBox.getPosX());
        contentBox.setSpY(contentBox.getPosY());
        contentBox.setWidth(_boxSize);
        contentBox.setHeight(_boxSize);
        contentBox.setStrokeWidth('.3vw');
        contentBox.getLabel().setVal(node.val);
        contentBox.getLabel().setFontSize((0.7 * _boxSize) + 'px');
        contentBox.getLabel().setPosX(contentBox.getPosX() + 0.5 * _boxSize);
        contentBox.getLabel().setPosY(contentBox.getPosY() + 0.72 * _boxSize);
        contentBox.getLabel().setSpX(contentBox.getLabel().getPosX());
        contentBox.getLabel().setSpY(contentBox.getLabel().getPosY());

        // the ref arrow box
        var refBox = element_factory.getRect();
        refBox.setPosX(contentBox.getPosX());
        refBox.setPosY(_firstNodePos.y + _boxSize);
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
        refArrow.setPosX2(refBox.getPosX() + 2 * _boxSize);
        refArrow.setPosY2(refBox.getPosY());
        refArrow.setSpX2(refArrow.getPosX2());
        refArrow.setSpY2(refArrow.getPosY2());
        refArrow.setMarkerEnd('url(#marker_stub)');

        var LLnode = {id:node.id,
                    next:node.nextID,
                    contentBox:contentBox,
                    refBox:refBox,
                    refArrow:refArrow};
        _nodeMap.set(node.id, LLnode);

        _first.arrow.setMarkerEnd('url(#marker_arrow)');
      }
    }

    /**
     * Set the fill attribute of set of node IDs.
     * @param {number[]} nodeIDs - The node IDs of the nodes to modify.
     * @param {string} color - The new fill color of these array slots.
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
     */
    function setOutline(nodeIDs, color) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).contentBox.setStroke(color);
        _nodeMap.get(id).refBox.setStroke(color);
      });
    }

    /**
     * Create or change text label on a set of node IDs.
     * @param {number[]} nodeIDs - The indices of the slots to modify.
     * @param {number|string} new_label - The slots' new text label(s).
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
     */
    function setLabelFill(nodeIDs, color) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).contentBox.getLabel().setFill(color);
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



    // element gathering functions /////////////////////////////////////////////

    /**
     * Gather all rectangles used in this array..
     * Used to get a list of all rectangles to draw on the canvas.
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
     */
    function getText() {
      var labels = [];
      _nodeMap.forEach(function(v,k,m) {
        labels.push(v.contentBox.getLabel());
      });
      labels.push(_first.name);
      labels.push(_oldfirst.name);
      labels.push(_last.name);
      labels.push(_oldlast.name);
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
      lines.push(_first.arrow);
      lines.push(_oldfirst.arrow);
      lines.push(_last.arrow);
      lines.push(_oldlast.arrow);
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
      addNode:addNode
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
