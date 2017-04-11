// linked node factory definition ////////////////////////////////////////
var linkedNode_factory = (function() {
  var _ID = 1;

  function LinkedNode(val, next) {
    var _id = _ID++;
    var _val = val;
    var _next = next;

    var getID = function() {
      return _id;
    };

    var getVal = function() {
      return _val;
    };

    var setVal = function(newVal) {
      _val = newVal;
    };

    var getNext = function() {
      return _next;
    };

    var setNext = function (newNext) {
      _next = newNext;
    };

    return {
      getID:getID,
      getVal:getVal,
      setVal:setVal,
      getNext:getNext,
      setNext:setNext
    };
  }

  var getNode = function(val, next) {
    return new LinkedNode(val, next);
  };

  return {
    getNode:getNode
  };
})();
// end linked node factory definition ////////////////////////////////////


var ll_factory = (function() {

  //////////////////////////////////////////////////////////////////////////////
  //  private array_factory methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new array visualization on the canvas.
   * @param {Object} root - root element for the linked list.
   * The root element is expected to be an object with the following functions:
   *   getID: returns a unique id for this node
   *   getVal: returns the content value of this node
   *   setVal: sets a new content value for this node
   *   getNext: returns the node that this node's "next" points to
   *   setNext: sets a new node that this node points to
   * Note that root can be null if starting from an empty linked list.
   * @param {Object} bounding_box - The box inside of which to center the array
   */
  function LL_viz(root, bounding_box) {
    var _X1 = bounding_box.p1.x;
    var _Y1 = bounding_box.p1.y;
    var _X2 = bounding_box.p2.x;
    var _Y2 = bounding_box.p2.y;
    var _W = _X2 - _X1;
    var _H = _Y2 - _Y1;

    // map to map node IDs to node objects
    var _nodeMap = new Map();

    // create node array
    var _nodeArray = [];

    // get the number of nodes
    var _size = _numNodes(root);

    // root node is initialized to null -- if LL is created nonempty, it will
    // be set to the first node in _initNodes
    var _root = null;

    // calculate box size based on number of nodes:
    //     < 5 : 5 elements + spaces between and on ends _-_-_-_-_-_
    //    >= 5 : # elements + first + spaces between and on ends
    var _boxSize = _size < 5 ? _W / 11 : _W / (_size * 2 + 1);

    // create default node ref labels objects
    //    name  : text element for the ref's label
    //    arrow : line element for the ref's arrow
    //    target: node ID this ref currently points to (or null)
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
    var _refs     =  [_first, _oldfirst, _last, _oldlast];
    // initialize the reference variable representations
    _updateRefs();                         // set pos. of label / arrow start
    // all refs initially point to null
    _pointRefsAtNode(null, _first, _last, _oldfirst, _oldlast);
    _hideRefs(_oldfirst, _last, _oldlast); // only first visible at start

    // calculate coordinates of first node
    var _firstNodePos = {x:_X1 + _boxSize, y:_Y1 + (_H - _boxSize) / 2};

    // logging TODO: remove
    console.log("canvas width: " + _W);
    console.log("number of elements: " + _size);
    console.log("box size: " + _boxSize);

    // initialize nodes
    _initNodes(root);

    // add n
    var _n = element_factory.getRect();
    var _nLabel = element_factory.getText();
    _initNBox();
    _setN(parseInt(_size));




    ////////////////////////////////////////////////////////////////////////////
    //  private Array_viz methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Get the number of nodes in root by following getNext() until it is null.
     * Also populates the _nodeArray with the nodes reached in the above manner.
     * @param {Object} root - A node object.
     */
    function _numNodes(root) {
      var count = 0;
      console.log("root is: " + root);
      var next = root;
      if (root) {
        count++;
        while (next.getNext()) {
          count++;
          next = next.getNext();
          _nodeArray.push(next);
        }
      }
      return count;
    }


    /**
     * Acquire and set the coordinates for the ref nodes.
     * Ref nodes include: first, oldfirst, last, and oldlast.
     * This function sets the position of each ref's label and the start point
     * of its arrow. These positions are always the same (relative to the
     * linked list).
     */
    function _updateRefs() {
      var coords = {
        first:{x:_X1 + 1.5 * _boxSize,
               y:_Y1 + (_H - _boxSize) / 2 - 1 * _boxSize},
        oldfirst:{x:_X1 + 1.5 * _boxSize,
                  y:_Y1 + (_H - _boxSize) / 2 + 3 * _boxSize},
        last:{x:_X1 + ((_size < 5 ? 5 : _size) * 2 - 0.5) * _boxSize,
              y:_Y1 + (_H - _boxSize) / 2 - 1 * _boxSize},
        oldlast: {x:_X1 + ((_size < 5 ? 5 : _size) * 2 - 0.5) * _boxSize,
                  y:_Y1 + (_H - _boxSize) / 2 + 3 * _boxSize}
      };

      // initialize _first
      _first.name.setPosX(coords.first.x);
      _first.name.setPosY(coords.first.y);
      _first.name.setVal("first");
      _first.name.setFontSize((0.7 * _boxSize) + 'px');
      _first.arrow.setPosX1(coords.first.x);
      _first.arrow.setPosY1(coords.first.y + 0.25 * _boxSize);

      // initialize _oldfirst
      _oldfirst.name.setPosX(coords.oldfirst.x);
      _oldfirst.name.setPosY(coords.oldfirst.y);
      _oldfirst.name.setVal("oldfirst");
      _oldfirst.name.setFontSize((0.7 * _boxSize) + 'px');
      _oldfirst.arrow.setPosX1(coords.oldfirst.x);
      _oldfirst.arrow.setPosY1(coords.oldfirst.y - 0.5 * _boxSize);

      // initialize _last
      _last.name.setPosX(coords.last.x);
      _last.name.setPosY(coords.last.y);
      _last.name.setVal("last");
      _last.name.setFontSize((0.7 * _boxSize) + 'px');
      _last.arrow.setPosX1(coords.last.x);
      _last.arrow.setPosY1(coords.last.y + 0.25 * _boxSize);

      // initialize _oldlast
      _oldlast.name.setPosX(coords.oldlast.x);
      _oldlast.name.setPosY(coords.oldlast.y);
      _oldlast.name.setVal("oldlast");
      _oldlast.name.setFontSize((0.7 * _boxSize) + 'px');
      _oldlast.arrow.setPosX1(coords.oldlast.x);
      _oldlast.arrow.setPosY1(coords.oldlast.y - 0.5 * _boxSize);
    }


    function _updateRefArrows() {
      _refs.forEach(function(ref){
        if (ref.target) {
          _pointRefsAtNode(ref.target, ref);
        }
      });
    }


    /**
     * Initializes the display of the n box, which displays the current
     * number of elements in the linked list.
     */
    function _initNBox() {
      _n.setPosX(_X2 - 1.5 * _boxSize);
      _n.setPosY(0.5 * _boxSize);
      _n.setSpX(_n.getPosX());
      _n.setSpY(_n.getPosY());
      _n.setWidth(_boxSize);
      _n.setHeight(_boxSize);
      _n.getLabel().setPosX(_n.getPosX() + 0.5 * _boxSize);
      _n.getLabel().setPosY(_n.getPosY() + 0.72 * _boxSize);
      // _n.getLabel().setVal(parseInt(_size));
      _n.getLabel().setFontSize((0.7 * _boxSize) + 'px');

      _nLabel.setPosX(_n.getPosX() - 0.5 * _boxSize);
      _nLabel.setPosY(_n.getPosY() + 0.7 * _boxSize);
      _nLabel.setFontSize((0.7 * _boxSize) + 'px');
      _nLabel.setVal('n');
    }

    function _setN(n) {
      _n.getLabel().setVal(n);
    }



    /**
     * Create the initial set of nodes, ref boxes, and arrows.
     */
    function _initNodes(root) {
      var i = 0;  // counter used for node positioning

      if (root === null) {
        return;
      } else {
        while(root) {
          // the content box
          var contentBox = element_factory.getRect();
          contentBox.setPosX(_firstNodePos.x + i * 2 * _boxSize);
          contentBox.setPosY(_firstNodePos.y);
          contentBox.setSpX(contentBox.getPosX());
          contentBox.setSpY(contentBox.getPosY());
          contentBox.setWidth(_boxSize);
          contentBox.setHeight(_boxSize);
          contentBox.setStrokeWidth('.3vw');
          contentBox.getLabel().setVal(root.getVal());
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
          refBox.setHeight(0.5 * _boxSize);
          refBox.setStrokeWidth('.3vw');
          refBox.getLabel().setVisibility('hidden');

          // the ref arrow
          var refArrow = element_factory.getLine();
          refArrow.setPosX1(refBox.getCenter().x);
          refArrow.setPosY1(refBox.getCenter().y);
          refArrow.setSpX1(refArrow.getPosX1());
          refArrow.setSpY1(refArrow.getPosY1());
          if (root.getNext()) {
            refArrow.setPosX2(refBox.getPosX() + 2 * _boxSize);
            refArrow.setPosY2(refBox.getPosY());
            refArrow.setMarkerStart("url(#marker_circle)");
            refArrow.setMarkerEnd("url(#marker_arrow)");
          } else {
            refArrow.setPosX2(refArrow.getPosX1() + _boxSize);
            refArrow.setPosY2(refArrow.getPosY1());
            refArrow.setMarkerStart("url(#marker_circle)");
            refArrow.setMarkerEnd("url(#marker_stub)");
          }

          var newNode = { id:root.getID(),
                          val:root.getVal(),
                          next:root.getNext(),
                          contentBox:contentBox,
                          refBox:refBox,
                          refArrow:refArrow };
          _nodeMap.set(newNode.id, newNode);

          if (i === 0) {
            _root = newNode;
          }
          root = root.getNext();
        }
      }

    }


    /**
     * Assumes _boxSize has been updated and resizes/repositions all nodes
     * in the linked list.
     */
    function _updateNodes() {
      var i = 0;
      var next = _root;

      while (next) {
        var node = _nodeMap.get(next.id);
        node.contentBox.setPosX(_firstNodePos.x + i * 2 * _boxSize);
        node.contentBox.setPosY(_firstNodePos.y);
        node.contentBox.setSpX(node.contentBox.getPosX());
        node.contentBox.setSpY(node.contentBox.getPosY());
        node.contentBox.setWidth(_boxSize);
        node.contentBox.setHeight(_boxSize);
        node.contentBox.setStrokeWidth('.3vw');
        node.contentBox.getLabel().setVal(node.val);
        node.contentBox.getLabel().setFontSize((0.7 * _boxSize) + 'px');
        node.contentBox.getLabel().setPosX(node.contentBox.getPosX() + 0.5 * _boxSize);
        node.contentBox.getLabel().setPosY(node.contentBox.getPosY() + 0.72 * _boxSize);
        node.contentBox.getLabel().setSpX(node.contentBox.getLabel().getPosX());
        node.contentBox.getLabel().setSpY(node.contentBox.getLabel().getPosY());

        node.refBox.setPosX(node.contentBox.getPosX());
        node.refBox.setPosY(_firstNodePos.y + _boxSize);
        node.refBox.setSpX(node.refBox.getPosX());
        node.refBox.setSpY(node.refBox.getPosY());
        node.refBox.setWidth(_boxSize);
        node.refBox.setHeight(0.5 * _boxSize);
        node.refBox.setStrokeWidth('.3vw');
        node.refBox.getLabel().setVisibility('hidden');

        node.refArrow.setPosX1(node.refBox.getCenter().x);
        node.refArrow.setPosY1(node.refBox.getCenter().y);
        node.refArrow.setSpX1(node.refArrow.getPosX1());
        node.refArrow.setSpY1(node.refArrow.getPosY1());
        if (node.next) {
          node.refArrow.setPosX2(node.refBox.getPosX() + 2 * _boxSize);
          node.refArrow.setPosY2(node.refBox.getPosY());
          node.refArrow.setMarkerStart("url(#marker_circle)");
          node.refArrow.setMarkerEnd("url(#marker_arrow)");
        } else {
          node.refArrow.setPosX2(node.refArrow.getPosX1() + _boxSize);
          node.refArrow.setPosY2(node.refArrow.getPosY1());
          node.refArrow.setMarkerStart("url(#marker_circle)");
          node.refArrow.setMarkerEnd("url(#marker_stub)");
        }

        i++;

        if (node.next) {
          next = _nodeMap.get(node.next);
        } else {
          next = null;
        }
      }
    }


    /**
     * Recalculate the size of a content box based on the current number of
     * nodes (or override this with an argument) and update sizing/positioning
     * information for all page elements:
     *   - references (first, last, oldfirst, oldlast)
     *   - nodes (all nodes in the linked list)
     *   - the n box and its label
     * _size variable is always set to the actual number of nodes in _nodeMap
     * before returning.
     * @param{number} size_override - manually set the number of nodes to size
     * the linked list nodes according to. Defaults to current number of nodes
     * if not provided.
     */
    function _resize(size_override) {
      _size = size_override ? size_override : _nodeMap.size;
      // _size = _nodeMap.size;
      _boxSize = _size < 5 ? _W / 11 : _W / (_size * 2 + 1);
      _firstNodePos = {x:_X1 + _boxSize, y:_Y1 + (_H - _boxSize) / 2};

      _initNBox();
      _updateNodes();
      _updateRefs();
      _updateRefArrows();
      _size = _nodeMap.size;
    }


    // show/hide functions /////////////////////////////////////////////////////

    /**
     * Hide one or more of the node references (first, last, etc.).
     * @param {...Object} refs - One or more node ref objects.
     */
    function _hideRefs(...refs) {
      refs.forEach(function(r) {
        r.name.setFillOpacity(0);
        r.name.setStrokeOpacity(0);
        r.arrow.setOpacity(0);
      });
    }

    /**
     * Show one or more of the node references (first, last, etc.).
     * @param {...Object} refs - One or more node ref objects.
     */
    function _showRefs(...refs) {
      refs.forEach(function(r) {
        r.name.setFillOpacity(1);
        r.name.setStrokeOpacity(1);
        r.arrow.setOpacity(1);
      });
    }

    function _hideNodes(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.contentBox.setFillOpacity(0);
        node.contentBox.setStrokeOpacity(0);
        node.contentBox.getLabel().setFillOpacity(0);
        node.contentBox.getLabel().setStrokeOpacity(0);
        node.refBox.setFillOpacity(0);
        node.refBox.setStrokeOpacity(0);
        node.refArrow.setOpacity(0);
      });
    }

    function _showNodes(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.contentBox.setFillOpacity(1);
        node.contentBox.setStrokeOpacity(1);
        node.contentBox.getLabel().setFillOpacity(1);
        node.contentBox.getLabel().setStrokeOpacity(1);
        node.refBox.setFillOpacity(1);
        node.refBox.setStrokeOpacity(1);
        node.refArrow.setOpacity(1);
      });
    }

    function _hideLabels(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.contentBox.getLabel().setFillOpacity(0);
        node.contentBox.getLabel().setStrokeOpacity(0);
      });
    }

    function _showLabels(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.contentBox.getLabel().setFillOpacity(1);
        node.contentBox.getLabel().setStrokeOpacity(1);
      });
    }

    function _hideArrows(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.refArrow.setOpacity(0);
      });
    }

    function _showArrows(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.refArrow.setOpacity(1);
      });
    }

    function _hideNLabel() {
      _n.getLabel().setFillOpacity(0);
      _n.getLabel().setStrokeOpacity(0);
    }

    function _showNLabel() {
      _n.getLabel().setFillOpacity(1);
      _n.getLabel().setStrokeOpacity(1);
    }

    // end show/hide functions /////////////////////////////////////////////////


    // pointing functions //////////////////////////////////////////////////////

    /**
     * Adjust the reference arrow associated with a ref variable. reference
     * variables include first, last, oldfirst, and oldlast.
     * @param {number} nodeID - The unique ID of the object to point at.
     * @param {...Object} refs - One or more ref objects (first, last, etc.).
     */
    function _pointRefsAtNode(nodeID, ...refs) {
      if (nodeID === null) {
        refs.forEach(function(ref) {
          ref.arrow.setMarkerStart("url(#marker_circle)");
          ref.arrow.setMarkerEnd("url(#marker_stub)");
          ref.arrow.setPosX2(ref.arrow.getPosX1() + _boxSize);
          ref.arrow.setPosY2(ref.arrow.getPosY1());
          ref.target = null;
        });
      } else {
        refs.forEach(function(ref) {
          var tNode = _nodeMap.get(nodeID);
          ref.arrow.setMarkerStart("url(#marker_circle)");
          ref.arrow.setMarkerEnd("url(#marker_arrow)");
          ref.arrow.setPosX2(tNode.contentBox.getPosX() + 0.5 * _boxSize);
          ref.arrow.setPosY2(
            (ref === _oldfirst || ref === _oldlast) ?
            (_firstNodePos.y + 1.5 * _boxSize) :
            _firstNodePos.y
          );
          ref.target = nodeID;
        });
      }
    }

    function _pointNodeAtRef(nodeID, ref) {
      var node = _nodeMap.get(nodeID);
      if (ref.target !== null) {
        var tNode = _nodeMap.get(ref.target);
        node.refArrow.setPosX2(tNode.refBox.getPosX());
        node.refArrow.setPosY2(
          (ref === _oldfirst || ref === _oldlast) ?
          (_firstNodePos.y + _boxSize) :
          _firstNodePos.y
        );
        // node.refArrow.setPosX2(_nodeMap.get(ref.target).refBox.getPosX());
        // node.refArrow.setPosY2(_nodeMap.get(ref.target).refBox.getPosY());
        node.refArrow.setMarkerEnd("url(#marker_arrow)");
      } else {
        node.refArrow.setPosX2(node.refArrow.getPosX1() + _boxSize);
        node.refArrow.setPosY2(node.refArrow.getPosY1());
        node.refArrow.setMarkerEnd("url(#marker_stub)");
      }
    }

    // end pointing functions //////////////////////////////////////////////////

    /**
     * Move a set of nodes horizontally and/or vertically. If no nodeIDs arg
     * provided, move all nodes.
     * @param {number} horiz - How far to move nodes horizontally (positive
     * to move right, negative to move left).
     * @param {number} horiz - How far to move nodes vertically (positive
     * to move down, negative to move up).
     * @param {Object[]} nodeIDs - Array of node IDs to move. If undefined,
     * moves all nodes.
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

          _refs.forEach(function(ref) {
            if (ref.target === id) {
              ref.arrow.setPosX2(ref.arrow.getPosX2() + horiz);
            }
          });
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

          _refs.forEach(function(ref) {
            if (ref.target === v.id) {
              ref.arrow.setPosX2(ref.arrow.getPosX2() + horiz);
            }
          });
        });
      }
    }

    function _addNodeFront(newNode) {
      var contentBox = element_factory.getRect();
      contentBox.setPosX(_firstNodePos.x);
      contentBox.setPosY(_firstNodePos.y);
      contentBox.setSpX(contentBox.getPosX());
      contentBox.setSpY(contentBox.getPosY());
      contentBox.setWidth(_boxSize);
      contentBox.setHeight(_boxSize);
      contentBox.setStrokeWidth('.3vw');
      contentBox.getLabel().setVal(newNode.getVal());
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
      refBox.setHeight(0.5 * _boxSize);
      refBox.setStrokeWidth('.3vw');
      refBox.getLabel().setVisibility('hidden');

      // the ref arrow
      var refArrow = element_factory.getLine();
      refArrow.setPosX1(refBox.getCenter().x);
      refArrow.setPosY1(refBox.getCenter().y);
      refArrow.setSpX1(refArrow.getPosX1());
      refArrow.setSpY1(refArrow.getPosY1());
      refArrow.setPosX2(refArrow.getPosX1() + _boxSize);
      refArrow.setPosY2(refArrow.getPosY1());
      refArrow.setSpX2(refArrow.getPosX2());
      refArrow.setSpY2(refArrow.getPosY2());
      refArrow.setMarkerStart("url(#marker_circle)");
      refArrow.setMarkerEnd("url(#marker_stub)");


      if (newNode.getNext() !== null) {
        // var next = _nodeMap.get(newNode.getNext().getID());
        var next = _nodeMap.get(newNode.getNext());
        refArrow.setPosX2(refBox.getPosX() + 2 * _boxSize);
        refArrow.setPosY2(refBox.getPosY());
      }

      var LLnode = {id:newNode.getID(),
                    val:newNode.getVal(),
                    next:newNode.getNext(),
                    contentBox:contentBox,
                    refBox:refBox,
                    refArrow:refArrow};
      _nodeMap.set(newNode.getID(), LLnode);
      _root = LLnode;

      _hideNodes(newNode.getID());
      // _moveNodes(2 * _boxSize, 0);
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

    function showOldFirst() {
      _showRefs(_oldfirst);
    }

    function hideOldFirst() {
      _hideRefs(_oldfirst);
    }

    function showOldLast() {
      _showRefs(_oldlast);
    }

    function hideOldLast() {
      _hideRefs(_oldlast);
    }

    function showNode(nodeID) {
      _showNodes(nodeID);
    }

    function showNodeBox(nodeID) {
      _showNodes(nodeID);
      _hideLabels(nodeID);
      _hideArrows(nodeID);
    }

    function showNodeLabel(nodeID) {
      _showLabels(nodeID);
    }

    function showNodeArrow(nodeID) {
      _showArrows(nodeID);
    }


    function addNodeFront(node) {
      _addNodeFront(node);
      _resize();
    }



    function pointFirstAt(position) {
      _pointRefsAtNode(position, _first);
    }

    function pointOldFirstAt(position) {
      _pointRefsAtNode(position, _oldfirst);
    }

    function pointOldFirstAtFirst() {
      _pointRefsAtNode(_first.target, _oldfirst);
    }

    function pointNodeAtOldfirst(nodeID) {
      _pointNodeAtRef(nodeID, _oldfirst);
    }



    function hideNLabel() {
      _hideNLabel();
    }

    function showNLabel() {
      _showNLabel();
    }

    function updateN() {
      _setN(parseInt(_size));
    }



    function moveAllNodes(horiz, vert) {
      _moveNodes(horiz * _boxSize, vert * _boxSize);
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
      rects.push(_n);
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
      labels.push(_nLabel);
      labels.push(_n.getLabel());
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
      moveAllNodes:moveAllNodes,
      showNode:showNode,
      showNodeBox:showNodeBox,
      showNodeLabel:showNodeLabel,
      showNodeArrow:showNodeArrow,
      addNodeFront:addNodeFront,
      showOldFirst:showOldFirst,
      hideOldFirst:hideOldFirst,
      pointNodeAtOldfirst:pointNodeAtOldfirst,
      hideNLabel:hideNLabel,
      showNLabel:showNLabel,
      updateN:updateN,
      pointFirstAt:pointFirstAt,
      pointOldFirstAtFirst:pointOldFirstAtFirst,
      pointOldFirstAt:pointOldFirstAt,
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
      getSlots:getSlots
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
