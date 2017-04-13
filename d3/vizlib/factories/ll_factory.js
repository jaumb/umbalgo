////////////////////////////////////////////////////////////////////////////////
// linked node factory definition //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var linkedNode_factory = (function() {
  var _ID = 1;

  function LinkedNode(val, next) {
    var _id = _ID++;
    var _val = val;
    var _next = next;
    var _contentBox = null;
    var _refBox = null;
    var _refArrow = null;

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

    var getContentBox = function() {
      return _contentBox;
    };

    var setContentBox = function (newContentBox) {
      _contentBox = newContentBox;
    };

    var getRefBox = function() {
      return _refBox;
    };

    var setRefBox = function (newRefBox) {
      _refBox = newRefBox;
    };

    var getRefArrow = function() {
      return _refArrow;
    };

    var setRefArrow = function (newRefArrow) {
      _refArrow = newRefArrow;
    };


    return {
      getID:getID,
      getVal:getVal,
      setVal:setVal,
      getNext:getNext,
      setNext:setNext,
      getContentBox:getContentBox,
      setContentBox:setContentBox,
      getRefBox:getRefBox,
      setRefBox:setRefBox,
      getRefArrow:getRefArrow,
      setRefArrow:setRefArrow
    };
  }

  var getNode = function(val, next) {
    return new LinkedNode(val, next);
  };

  return {
    getNode:getNode
  };
})();
////////////////////////////////////////////////////////////////////////////////
// end linked node factory definition //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



/**
 * Create the linked list factory singleton. This is an IIFE (immediately
 * invoked function expression).
 */
var ll_factory = (function() {

  //////////////////////////////////////////////////////////////////////////////
  //  private array_factory methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new array visualization on the canvas.
   * @param {Object} root - root element for the linked list.
   * The root element is expected to be an object with getters and setters for
   * the following fields:
   *   ID        : a unique id for this node (getter only)
   *   Val       : the content value of this node
   *   Next      : the node that this node's "next" points to
   *   ContentBox: rect that holds the node's value (null in client)
   *   RefBox    : rect that holds the node's pointer (null in client)
   *   RefArrow  : line that represent's node's pointer arrow (null in client)
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

    // get the number of nodes
    var _nodeCount = _numNodes(root);

    // root node is initialized to null -- if LL is created nonempty, it will
    // be set to the first node in _initNodes
    var _root = null;

    // calculate box size based on number of nodes:
    //     < 5 : 5 elements + spaces between and on ends _-_-_-_-_-_
    //    >= 5 : # elements + first + spaces between and on ends
    var _boxSize = _nodeCount < 5 ? _W / 11 : _W / (_nodeCount * 2 + 1);

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
    console.log("number of elements: " + _nodeCount);
    console.log("box size: " + _boxSize);

    // initialize nodes
    _initNodes(root);

    // add n
    var _n = element_factory.getRect();
    var _nLabel = element_factory.getText();
    _initNBox();
    _setN(parseInt(_nodeCount));




    ////////////////////////////////////////////////////////////////////////////
    //  private Array_viz methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Get the number of nodes in root by following getNext() until it is null.
     * @param {Object} root - A node object.
     */
    function _numNodes(root) {
      var count = 0;
      var next = root;
      if (root) {
        count++;
        while (next.getNext()) {
          count++;
          next = next.getNext();
        }
      }
      console.log("number of nodes is: " + count);
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
        last:{x:_X1 + ((_nodeCount < 5 ? 5 : _nodeCount) * 2 - 0.5) * _boxSize,
              y:_Y1 + (_H - _boxSize) / 2 - 1 * _boxSize},
        oldlast: {x:_X1 + ((_nodeCount < 5 ? 5 : _nodeCount) * 2 - 0.5) * _boxSize,
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
      _n.getLabel().setFontSize((0.7 * _boxSize) + 'px');

      _nLabel.setPosX(_n.getPosX() - 0.5 * _boxSize);
      _nLabel.setPosY(_n.getPosY() + 0.7 * _boxSize);
      _nLabel.setFontSize((0.7 * _boxSize) + 'px');
      _nLabel.setVal('n');
    }

    /**
     * Change the label value in the n box.
     * @param {number} n - The number to display in the n box.
     */
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

          root.setContentBox(contentBox);
          root.setRefBox(refBox);
          root.setRefArrow(refArrow);

          // var newNode = { id:root.getID(),
          //                 val:root.getVal(),
          //                 next:root.getNext(),
          //                 contentBox:contentBox,
          //                 refBox:refBox,
          //                 refArrow:refArrow };
          // _nodeMap.set(newNode.id, newNode);

          _nodeMap.set(root.getID(), root);

          if (i === 0) {
            _root = root;
          }
          root = root.getNext();
          i++;
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
        var node = _nodeMap.get(next.getID());
        node.getContentBox().setPosX(_firstNodePos.x + i * 2 * _boxSize);
        node.getContentBox().setPosY(_firstNodePos.y);
        node.getContentBox().setSpX(node.getContentBox().getPosX());
        node.getContentBox().setSpY(node.getContentBox().getPosY());
        node.getContentBox().setWidth(_boxSize);
        node.getContentBox().setHeight(_boxSize);
        node.getContentBox().setStrokeWidth('.3vw');
        node.getContentBox().getLabel().setFontSize((0.7 * _boxSize) + 'px');
        node.getContentBox().getLabel().setPosX(node.getContentBox().getPosX() + 0.5 * _boxSize);
        node.getContentBox().getLabel().setPosY(node.getContentBox().getPosY() + 0.72 * _boxSize);
        node.getContentBox().getLabel().setSpX(node.getContentBox().getLabel().getPosX());
        node.getContentBox().getLabel().setSpY(node.getContentBox().getLabel().getPosY());

        node.getRefBox().setPosX(node.getContentBox().getPosX());
        node.getRefBox().setPosY(_firstNodePos.y + _boxSize);
        node.getRefBox().setSpX(node.getRefBox().getPosX());
        node.getRefBox().setSpY(node.getRefBox().getPosY());
        node.getRefBox().setWidth(_boxSize);
        node.getRefBox().setHeight(0.5 * _boxSize);
        node.getRefBox().setStrokeWidth('.3vw');
        node.getRefBox().getLabel().setVisibility('hidden');

        node.getRefArrow().setPosX1(node.getRefBox().getCenter().x);
        node.getRefArrow().setPosY1(node.getRefBox().getCenter().y);
        node.getRefArrow().setSpX1(node.getRefArrow().getPosX1());
        node.getRefArrow().setSpY1(node.getRefArrow().getPosY1());
        if (node.getNext()) {
          node.getRefArrow().setPosX2(node.getRefBox().getPosX() + 2 * _boxSize);
          node.getRefArrow().setPosY2(node.getRefBox().getPosY());
          node.getRefArrow().setMarkerStart("url(#marker_circle)");
          node.getRefArrow().setMarkerEnd("url(#marker_arrow)");
        } else {
          node.getRefArrow().setPosX2(node.getRefArrow().getPosX1() + _boxSize);
          node.getRefArrow().setPosY2(node.getRefArrow().getPosY1());
          node.getRefArrow().setMarkerStart("url(#marker_circle)");
          node.getRefArrow().setMarkerEnd("url(#marker_stub)");
        }

        i++;

        if (node.getNext()) {
          next = _nodeMap.get(node.getNext().getID());
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
     * _nodeCount variable is always set to the actual number of nodes in _nodeMap
     * before returning.
     * @param{number} override - manually set the number of nodes to size
     * the linked list nodes according to. Defaults to current number of nodes
     * if not provided.
     */
    function _resize(override) {
      _nodeCount = override ? override : _nodeMap.size;
      // _nodeCount = _nodeMap.size;
      _boxSize = _nodeCount < 5 ? _W / 11 : _W / (_nodeCount * 2 + 1);
      _firstNodePos = {x:_X1 + _boxSize, y:_Y1 + (_H - _boxSize) / 2};

      _initNBox();
      _updateNodes();
      _updateRefs();
      _updateRefArrows();
      _nodeCount = _nodeMap.size;
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
        node.getContentBox().setFillOpacity(0);
        node.getContentBox().setStrokeOpacity(0);
        node.getContentBox().getLabel().setFillOpacity(0);
        node.getContentBox().getLabel().setStrokeOpacity(0);
        node.getRefBox().setFillOpacity(0);
        node.getRefBox().setStrokeOpacity(0);
        node.getRefArrow().setOpacity(0);
      });
    }

    function _showNodes(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.getContentBox().setFillOpacity(1);
        node.getContentBox().setStrokeOpacity(1);
        node.getContentBox().getLabel().setFillOpacity(1);
        node.getContentBox().getLabel().setStrokeOpacity(1);
        node.getRefBox().setFillOpacity(1);
        node.getRefBox().setStrokeOpacity(1);
        node.getRefArrow().setOpacity(1);
      });
    }

    function _hideLabels(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.getContentBox().getLabel().setFillOpacity(0);
        node.getContentBox().getLabel().setStrokeOpacity(0);
      });
    }

    function _showLabels(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        console.log("NODE ID IS : " + nodeID);
        console.log("IN SHOW LABELS: label = " + node.getContentBox().getLabel().getVal());
        // console.log("in show labels: " +
        //             "\n  id     : " + node.getID() +
        //             "\n  val    : " + node.getVal() +
        //             "\n  next ID: " + node.getNext().getID() +
        //             "\n  content: " + node.getContentBox().getLabel().getPosX());
        node.getContentBox().getLabel().setFillOpacity(1);
        node.getContentBox().getLabel().setStrokeOpacity(1);
      });
    }

    function _hideArrows(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.getRefArrow().setOpacity(0);
      });
    }

    function _showArrows(...nodeIDs) {
      nodeIDs.forEach(function(nodeID) {
        var node = _nodeMap.get(nodeID);
        node.getRefArrow().setOpacity(1);
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
          ref.arrow.setPosX2(tNode.getContentBox().getPosX() + 0.5 * _boxSize);
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
        node.getRefArrow().setPosX2(tNode.getRefBox().getPosX());
        node.getRefArrow().setPosY2(tNode.getRefBox().getPosY());
        // node.getRefArrow().setPosY2(
        //   (ref === _oldfirst || ref === _oldlast) ?
        //   (_firstNodePos.y + _boxSize) :
        //   _firstNodePos.y
        // );
        node.getRefArrow().setMarkerEnd("url(#marker_arrow)");
      } else {
        node.getRefArrow().setPosX2(node.getRefArrow().getPosX1() + _boxSize);
        node.getRefArrow().setPosY2(node.getRefArrow().getPosY1());
        node.getRefArrow().setMarkerEnd("url(#marker_stub)");
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
          node.getContentBox().setPosX(node.getContentBox().getPosX() + horiz);
          node.getContentBox().getLabel().setPosX(node.getContentBox().getPosX() + horiz);
          node.getRefBox().setPosX(node.getRefBox().getPosX() + horiz);
          node.getRefArrow().setPosX1(node.getRefArrow().getPosX1() + horiz);
          node.getRefArrow().setPosX2(node.getRefArrow().getPosX2() + horiz);
          // vertical movement
          node.getContentBox().setPosY(node.getContentBox().getPosY() + vert);
          node.getContentBox().getLabel().setPosY(node.getContentBox().getPosY() + vert);
          node.getRefBox().setPosY(node.getRefBox().getPosY() + vert);
          node.getRefArrow().setPosY1(node.getRefArrow().getPosY1() + vert);
          node.getRefArrow().setPosY2(node.getRefArrow().getPosY2() + vert);

          _refs.forEach(function(ref) {
            if (ref.target === id) {
              ref.arrow.setPosX2(ref.arrow.getPosX2() + horiz);
            }
          });
        });
      } else {
        _nodeMap.forEach(function(v,k,m) {
          // horizontal movement
          v.getContentBox().setPosX(v.getContentBox().getPosX() + horiz);
          v.getContentBox().getLabel().setPosX(v.getContentBox().getLabel().getPosX() + horiz);
          v.getRefBox().setPosX(v.getRefBox().getPosX() + horiz);
          v.getRefArrow().setPosX1(v.getRefArrow().getPosX1() + horiz);
          v.getRefArrow().setPosX2(v.getRefArrow().getPosX2() + horiz);
          // vertical movement
          v.getContentBox().setPosY(v.getContentBox().getPosY() + vert);
          v.getContentBox().getLabel().setPosY(v.getContentBox().getLabel().getPosY() + vert);
          v.getRefBox().setPosY(v.getRefBox().getPosY() + vert);
          v.getRefArrow().setPosY1(v.getRefArrow().getPosY1() + vert);
          v.getRefArrow().setPosY2(v.getRefArrow().getPosY2() + vert);

          _refs.forEach(function(ref) {
            if (ref.target === v.id) {
              ref.arrow.setPosX2(ref.arrow.getPosX2() + horiz);
            }
          });
        });
      }
    }


    /**
     * Add a new node to the front (left side) of the linked list. Generates
     * a content box, ref box, and ref arrow for the new node and adds it to
     * the node map. Also increments the node count by one. The new node is
     * hidden upon creation and can be faded into view using the show functions.
     * @param {Object} newNode - The node object to add to the linked list.
     * When this function is invoked, newNode's contentBox, refBox, and
     * refArrow are null.
     */
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
      refArrow.setMarkerStart("url(#marker_circle)");
      if (newNode.getNext()) {
        refArrow.setPosX2(newNode.getNext().getRefBox().getPosX());
        refArrow.setPosY2(newNode.getNext().getRefBox().getPosY());
        refArrow.setMarkerEnd("url(#marker_arrow)");
      } else {
        refArrow.setPosX2(refArrow.getPosX1() + _boxSize);
        refArrow.setPosY2(refArrow.getPosY1());
        refArrow.setMarkerEnd("url(#marker_stub)");
      }
      refArrow.setSpX2(refArrow.getPosX2());
      refArrow.setSpY2(refArrow.getPosY2());

      newNode.setNext(_root);
      newNode.setContentBox(contentBox);
      newNode.setRefBox(refBox);
      newNode.setRefArrow(refArrow);

      _nodeMap.set(newNode.getID(), newNode);
      _root = newNode;

      _hideNodes(newNode.getID());
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
      _setN(parseInt(_nodeCount));
    }



    function moveAllNodes(horiz, vert) {
      _moveNodes(horiz * _boxSize, vert * _boxSize);
      if (_nodeCount >= 5) {
        _resize();
      }
    }

    /**
     * Set the fill attribute of set of node IDs.
     * @param {number[]} nodeIDs - The node IDs of the nodes to modify.
     * @param {string} color - The new fill color of these array slots.
     */
    function setFill(nodeIDs, color) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).getContentBox().setFill(color);
        _nodeMap.get(id).getRefBox().setFill(color);
      });
    }

    /**
     * Set the outline attribute of set of nodeIDs.
     * @param {number[]} nodeIDs - The indices of the slots to modify.
     * @param {string} color - The new outline color of these array slots.
     */
    function setOutline(nodeIDs, color) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).getContentBox().setStroke(color);
        _nodeMap.get(id).getRefBox().setStroke(color);
      });
    }

    /**
     * Create or change text label on a set of node IDs.
     * @param {number[]} nodeIDs - The indices of the slots to modify.
     * @param {number|string} new_label - The slots' new text label(s).
     */
    function setLabels(nodeIDs, new_label) {
      nodeIDs.forEach(function(id) {
        _nodeMap.get(id).getContentBox().getLabel().setVal(new_label);
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
        if (v.getContentBox().emphasis) { rects.push(v.contentBox.emphasis); }
        rects.push(v.getContentBox());
        rects.push(v.getRefBox());
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
        labels.push(v.getContentBox().getLabel());
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
        lines.push(v.getRefArrow());
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
