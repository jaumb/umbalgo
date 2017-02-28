
var element = (function() {

<<<<<<< HEAD
  /****************************************************************************
   *  private variables
   ****************************************************************************/
  // source of all element IDs
  var _id = 0;

=======
>>>>>>> 467b9343c4c85a4facbfca30481b9331f27fe541
  // all elements
  var _fill = color_codes.BACKGROUND;  // interior color of an element
  var _fill_opacity = 1;               // 0 (invisible) to 1 (solid)
  var _stroke = color_codes.BLACK;     // the color of an outline
  var _stroke_width = 1;               // thickness of outline
  var _stroke_opacity = 1;

<<<<<<< HEAD
  // all elements but line
  // var _sp = {x:0, y:0}; // if we want default rect/text starting pos
  // var _pos = {x:0, y:0}; // if we want default rect/text pos
=======
  // all elements except line
  var sp = {x, y};
  var pos = {x, y};
>>>>>>> 467b9343c4c85a4facbfca30481b9331f27fe541


  // svg line elements only
  // var _line_sp  = {x1:0, y1:0, x2:0, y2:0}; // default line starting pos
  // var _line_pos = {x1:0, y1:0, x2:0, y2:0}; // default line pos

  // svg text elements
  var _font = 'sans-serif';
  var _font_size = 'medium';
  var _text_anchor = 'middle';

  // svg rect elements
  var _width;
  var _height;

  // svg circle elements
  // var _sp  = {cx:0, cy:0};  // if we want default circle starting pos
  // var _pos = {cx:0, cy:0};  // if we want default circle pos
  var _r;

<<<<<<< HEAD
  /****************************************************************************
   *  private methods
   ****************************************************************************/
  var _newID = function() {
    return ++_id;
  }


  /****************************************************************************
   *  public methods
   ****************************************************************************/
  var rect = function(x, y, w, h) {
    return {
      id:_newID(),
      fill:_fill,
      fill_opacity:_fill_opacity,
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:{x:x, y:y},
      pos:{x:x, y:y},
      width:w,
      height:h,
    }
  };

  var circle = function(x, y, r) {
    return {
      id:_newID(),
      fill:_fill,
      fill_opacity:_fill_opacity,
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:{x:x, y:y},
      pos:{x:x, y:y},
      r:r,
    }
  };
=======
  return {
>>>>>>> 467b9343c4c85a4facbfca30481b9331f27fe541

  var text = function(x, y, val) {
    return {
      id:_newID(),
      fill:color_codes.BLACK,
      fill_opacity:_fill_opacity,
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:{x:x, y:y},
      pos:{x:x, y:y},
      font:_font,
      font_size:_font_size,
      text_anchor:_text_anchor,
      val:val,
    }
  };

  var line = function(x1, y1, x2, y2) {
    return {
      id:_newID(),
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:{x1:x1, y1:y1, x2:x2, y2:y2},
      pos:{x1:x1, y1:y1, x2:x2, y2:y2},
    }
  };

  /****************************************************************************
   *  return public methods
   ****************************************************************************/


  return {
    rect:rect,
    circle:circle,
    text:text,
    line:line
  }

})();
