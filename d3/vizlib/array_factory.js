
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
    var _emphasis = [];

    // calculate starting positions and size of array slots
    var boxSize = _W / (elems.length + 2);
    var firstPos = {x:_X1 + boxSize, y:_Y1 + (_H - boxSize) / 2};

    // create the initial array of elements
    elems.forEach(function(e, i) {
      var rect = element_factory.rect();
      rect.pos.x = firstPos.x + i * boxSize;
      rect.pos.y = firstPos.y;
      rect.sp = pos;
      rect.width = boxSize;
      rect.height = boxSize;
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
      _elems[i].label.pos.x = _elems[j].pos.x;
      _elems[j].label.pos.x = _elems[i].pos.x;
      _elems[i].label.pos.y = _elems[j].pos.y + 1/3 * _elems[j].label.font_size;
      _elems[j].label.pos.y = _elems[i].pos.y + 1/3 * _elems[i].label.font_size;
      var tmp = _elems[i].label;
      _elems[i].label = _elems[j].label;
      _elems[j].label = tmp;
    }

    // emphasize([index..], color)
    function emphasize(indices, color) {
      indices.forEach(function(i) {
        var rect = element_factory.rect();
        rect.pos.x = _elems[i].pos.x - 1/10 * boxSize;
        rect.pos.y = _elems[i].pos.y - 1/10 * boxSize;
        rect.sp = pos;
        rect.width = boxSize + 1/5 * boxSize;
        rect.height = boxSize + 1/5 * boxSize;
        rect.stroke = color_codes.EMPHASIZE;
        rect.stroke_opacity = .3;
        rect.fill_opacity = 0;
        rect.target = _elems[i];
        _emphasis.push(rect);
      });
    }

    // deemphasize([index..])
    function deemphasize(indices) {
      indices.forEach(function(i) {
        _emphasis.forEach(function(rect) {
          if (rect.target === _elems[i]) {
            rect.stroke = color_codes.WHITE;
            rect.stroke_opacity = 0;
            rect.fill = color_codes.WHITE;
            rect.fill_opacity = 0;
            break;
          }
        });
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
      return _elems.concat(_emphasis);
    }

    // return public functions
    return {
      setFill:setFill,
      setOutline:setOutline,
      swap:swap,
      emphasize:emphasize,
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
