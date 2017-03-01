
var element_factory = (function() {

  /****************************************************************************
   *  private variables
   ****************************************************************************/
  // source of all element IDs
  var _id = 0;

  // all elements
  var _fill = color_codes.BACKGROUND;  // interior color of an element
  var _fill_opacity = 1;               // 0 (invisible) to 1 (solid)
  var _stroke = color_codes.BLACK;     // the color of an outline
  var _stroke_width = 1;               // thickness of outline
  var _stroke_opacity = 1;

  // all elements but line
  var _sp = {x:null, y:null}; // if we want default rect/text starting pos
  var _pos = {x:null, y:null}; // if we want default rect/text pos


  // svg line elements only
  var _line_sp  = {x1:0, y1:0, x2:0, y2:0}; // default line starting pos
  var _line_pos = {x1:0, y1:0, x2:0, y2:0}; // default line pos

  // svg text elements
  var _font = 'courier new';
  var _font_size = 'medium';
  var _text_anchor = 'middle';

  // svg rect elements
  var _size = null;

  /****************************************************************************
   *  private methods
   ****************************************************************************/
  var _newID = function() {
    return ++_id;
  }


  /****************************************************************************
   *  public methods
   ****************************************************************************/
  var rect = function() {
    return {
      id:_newID(),
      fill:_fill,
      fill_opacity:_fill_opacity,
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:_sp,
      pos:_pos,
      width:_size,
      height:_size,
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
      sp:{cx:_sp.x, cy:_sp.y},
      pos:{cx:_pos.x, cy:_pos.y},
      r:_size
    }
  };

  var text = function(x, y, val) {
    return {
      id:_newID(),
      fill:color_codes.BLACK,
      fill_opacity:_fill_opacity,
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:_sp,
      pos:_pos,
      font:_font,
      font_size:_font_size,
      text_anchor:_text_anchor,
      val:null
    }
  };

  var line = function() {
    return {
      id:_newID(),
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:_line_sp,
      pos:_line_pos
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
