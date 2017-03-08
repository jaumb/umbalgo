
var array_factory = (function(){

  /****************************************************************************
   *  private methods
   ****************************************************************************/
  // array object definition
  function Array_viz(elems, bounding_box) {
    var _X1 = bounding_box.p1.x;
    var _Y1 = bounding_box.p1.y;
    var _X2 = bounding_box.p2.x;
    var _Y2 = bounding_box.p2.y;
    var _W = _X2 - _X1;
    var _H = _Y2 - _Y1;
    var _elems = [];

    // calculate starting positions and size of array slots
    var boxSize = _W / (elems.length + 2);
    var firstPos = {x:_X1 + boxSize, y:_Y1 + (_H - boxSize) / 2};

    // create the initial array of elements
    elems.forEach(function(e, i) {
      var rect = element_factory.rect();
      rect.pos.x = firstPos.x + i * boxSize;
      rect.pos.y = firstPos.y;
      rect.sp.x = rect.pos.x;
      rect.sp.y = rect.pos.y;
      rect.width = boxSize;
      rect.height = boxSize;
      rect.stroke_width = '.3vw';
      rect.label.val = e;
      rect.label.font_size = (.7 * boxSize) + 'px';
      rect.label.pos.x = rect.pos.x + 1/2 * boxSize;
      rect.label.pos.y = rect.pos.y + .72 * boxSize;
      rect.label.sp.x = rect.label.pos.x;
      rect.label.sp.y = rect.label.pos.y;
      _elems.push(rect);
    });

    // change_fill(color, [index...])
    function setFill(indices, color) {
      indices.forEach(function(i) {
        _elems[i].fill = color;
      });
    }

    // change_outline(color, [index...])
    function setOutline(indices, color) {
      indices.forEach(function(i) {
        _elems[i].stroke = color;
      });
    }

    // swap(index1, index2)
    function swap(i, j) {
      _elems[i].label.pos.x = _elems[j].pos.x + 1/2 * boxSize;
      _elems[j].label.pos.x = _elems[i].pos.x + 1/2 * boxSize;
      _elems[i].label.pos.y = _elems[j].pos.y + .72 * boxSize;
      _elems[j].label.pos.y = _elems[i].pos.y + .72 * boxSize;
      var tmp = _elems[i].label;
      _elems[i].label = _elems[j].label;
      _elems[j].label = tmp;
    }

    // emphasize([index..], color)
    function emphasize(indices, color) {
      indices.forEach(function(i) {
        if (_elems[i].emphasis) {
          _elems[i].emphasis.stroke = color_codes.EMPHASIZE;
          _elems[i].emphasis.stroke_opacity = .3;
        } else {
          var rect = element_factory.rect();
          rect.pos.x = _elems[i].pos.x - 1/10 * boxSize;
          rect.pos.y = _elems[i].pos.y - 1/10 * boxSize;
          rect.sp.x = rect.pos.x;
          rect.sp.y = rect.pos.y;
          rect.width = boxSize + 1/5 * boxSize;
          rect.height = boxSize + 1/5 * boxSize;
          rect.stroke = color_codes.EMPHASIZE;
          rect.stroke_opacity = .3;
          rect.fill_opacity = 0;
          _elems[i].emphasis = rect;
        }
      });
    }

    // deemphasize([index..])
    function deemphasize(indices) {
      indices.forEach(function(i) {
        if (_elems[i].emphasis) {
          _elems[i].emphasis.stroke = color_codes.WHITE;
          _elems[i].emphasis.stroke_opacity = 0;
        }
      });
    }

    // change_label([index...], new_label)
    function setLabels(indices, new_label) {
      indices.forEach(function(i) {
        _elems[i].label.val = new_label;
      });
    }

    // change_label_color([index...], color)
    function setLabelFill(indices, color) {
      indices.forEach(function(i) {
        _elems[i].label.fill = color;
      });
    }

    // return array of rect elements
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
   *  public methods
   ****************************************************************************/
  // make a new array
  function get_array(elems, bounding_box) {
    return new Array_viz(elems, bounding_box);
  }

  /****************************************************************************
   *  return public methods
   ****************************************************************************/
  return {
    get_array:get_array
  }

})();
