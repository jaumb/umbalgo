
var element_factory = (function() {

  //////////////////////////////////////////////////////////////////////////////
  //  private variables
  //////////////////////////////////////////////////////////////////////////////

  // source of all element IDs
  var _id = 0;

  // all elements
  var _fill = colors.BACKGROUND;  // interior color of an element
  var _fill_opacity = 1;               // 0 (invisible) to 1 (solid)
  var _stroke = colors.BLACK;     // the color of an outline
  var _stroke_width = '.3vw';          // thickness of outline
  var _stroke_opacity = 1;
  var _visibility = 'visible';

  // all elements but line
  var _sp = {x:null, y:null}; // if we want default rect/text starting pos
  var _pos = {x:null, y:null}; // if we want default rect/text pos


  // svg line elements only
  var _line_sp  = {x1:null, y1:null, x2:null, y2:null}; // default line starting pos
  var _line_pos = {x1:null, y1:null, x2:null, y2:null}; // default line pos

  // svg text elements
  var _font = 'courier new';
  var _font_size = 'medium';
  var _text_anchor = 'middle';

  // svg rect elements
  var _size = null;

  //////////////////////////////////////////////////////////////////////////////
  //  private methods
  //////////////////////////////////////////////////////////////////////////////
  var _newID = function() {
    return ++_id;
  };


  function Text(new_id) {
    var id = _newID();
    var fill = colors.BLACK;
    var fill_opacity = _fill_opacity;
    var stroke = _stroke;
    var stroke_width = _stroke_width;
    var stroke_opacity = _stroke_opacity;
    var sp = {x:_sp.x, y:_sp.y}; // replace
    var pos = {x:_pos.x, y:_pos.y}; // replace
    var font = _font;
    var font_size = _font_size;
    var text_anchor = _text_anchor;
    var val = '';
    var class_name = 'text';
    var visibility = _visibility;

    // getters and setters

    function className() {
      return class_name;
    }

    function getID() {
      return id;
    }

    function getFill() {
      return fill;
    }

    function setFill(color) {
      fill = color;
    }

    function getFillOpacity() {
      return fill_opacity;
    }

    function setFillOpacity(opacity) {
      fill_opacity = opacity;
    }

    function getStroke() {
      return stroke;
    }

    function setStroke(val) {
      stroke = val;
    }

    function getStrokeWidth() {
      return stroke_width;
    }

    function setStrokeWidth(width) {
      stroke_width = width;
    }

    function getStrokeOpacity() {
      return stroke_opacity;
    }

    function setStrokeOpacity(opacity) {
      stroke_opacity = opacity;
    }

    function getSpX() {
      return sp.x;
    }

    function setSpX(newX) {
      sp.x = newX;
    }

    function getSpY() {
      return sp.y;
    }

    function setSpY(newY) {
      sp.y = newY;
    }

    function getSp() {
      return { x:sp.x, y:sp.y };
    }

    function setSp(spX, spY) {
      setSpX(spX);
      setSpY(spY);
    }

    function getPosX() {
      return pos.x;
    }

    function setPosX(newX) {
      pos.x = newX;
    }

    function getPosY() {
      return pos.y;
    }

    function setPosY(newY) {
      pos.y = newY;
    }

    function getPos() {
      return { x:pos.x, y:pos.y };
    }

    function setPos(posX, posY) {
      setPosX(posX);
      setPosY(posY);
    }

    // text-specific functions

    function getFont() {
      return font;
    }

    function setFont(newFont) {
      font = newFont;
    }

    function getFontSize() {
      return font_size;
    }

    function setFontSize(newSize) {
      font_size = newSize;
    }

    function getTextAnchor() {
      return text_anchor;
    }

    function setTextAnchor(newAnchor) {
      text_anchor = newAnchor;
    }

    function getVal() {
      return val;
    }

    function setVal(newVal) {
      val = newVal;
    }

    function getVisibility() {
     return visibility;
    }

    function setVisibility(value) {
     visibility = value;
    }

    function copy() {
      var cp = new Text(_newID());
      cp.setFill(fill);
      cp.setFillOpacity(fill_opacity);
      cp.setStroke(stroke);
      cp.setStrokeWidth(stroke_width);
      cp.setStrokeOpacity(stroke_opacity);
      cp.setPos(pos.x, pos.y);
      cp.setSp(sp.x, sp.y);
      cp.setFont(font);
      cp.setFontSize(font_size);
      cp.setTextAnchor(text_anchor);
      cp.setVal(val);
      return cp;
    }

    // return public functions
    return {
      getID:getID,
      getFill:getFill,
      setFill:setFill,
      getFillOpacity:getFillOpacity,
      setFillOpacity:setFillOpacity,
      getStroke:getStroke,
      setStroke:setStroke,
      getStrokeWidth:getStrokeWidth,
      setStrokeWidth:setStrokeWidth,
      getStrokeOpacity:getStrokeOpacity,
      setStrokeOpacity:setStrokeOpacity,
      getPosX:getPosX,
      setPosX:setPosX,
      getPosY:getPosY,
      setPosY:setPosY,
      getSpX:getSpX,
      setSpX:setSpX,
      getSpY:getSpY,
      setSpY:setSpY,
      getPos:getPos,
      setPos:setPos,
      getSp:getSp,
      setSp:setSp,
      getFont:getFont,
      setFont:setFont,
      getFontSize:getFontSize,
      setFontSize:setFontSize,
      getTextAnchor:getTextAnchor,
      setTextAnchor:setTextAnchor,
      getVal:getVal,
      setVal:setVal,
      className:className,
      getVisibility:getVisibility,
      setVisibility:setVisibility,
      copy:copy
    };
  }

  /**
    * Rect object definition
    * @param {number} new_id - A unique ID for this Rect object.
    */
   function Rect(new_id) {
    var id = new_id;
    var fill = _fill;
    var fill_opacity = _fill_opacity;
    var stroke = _stroke;
    var stroke_width = _stroke_width;
    var stroke_opacity = _stroke_opacity;
    var sp = {x:_pos.x, y:_pos.y};
    var pos = {x:_pos.x, y:_pos.y};
    var width = _size;
    var height = _size;
    var label = new Text(_newID());
    var class_name = 'rect';
    var visibility = _visibility;

    // getters and setters

    function className() {
      return class_name;
    }

    function getID() {
     return id;
    }

    function getFill() {
     return fill;
    }

    function setFill(color) {
     fill = color;
    }

    function getFillOpacity() {
     return fill_opacity;
    }

    function setFillOpacity(opacity) {
     fill_opacity = opacity;
    }

    function getStroke() {
     return stroke;
    }

    function setStroke(val) {
     stroke = val;
    }

    function getStrokeWidth() {
     return stroke_width;
    }

    function setStrokeWidth(width) {
     stroke_width = width;
    }

    function getStrokeOpacity() {
     return stroke_opacity;
    }

    function setStrokeOpacity(opacity) {
     stroke_opacity = opacity;
    }

    function getSpX() {
     return sp.x;
    }

    function setSpX(newX) {
     sp.x = newX;
    }

    function getSpY() {
     return sp.y;
    }

    function setSpY(newY) {
     sp.y = newY;
    }

    function getSp() {
     return { x:sp.x, y:sp.y };
    }

    function setSp(spX, spY) {
     setSpX(spX);
     setSpY(spY);
    }

    function getPosX() {
     return pos.x;
    }

    function setPosX(newX) {
     pos.x = newX;
    }

    function getPosY() {
     return pos.y;
    }

    function setPosY(newY) {
     pos.y = newY;
    }

    function getPos() {
     return { x:pos.x, y:pos.y };
    }

    function setPos(posX, posY) {
     setPosX(posX);
     setPosY(posY);
    }

    // rect-specific functions

    function getWidth() {
     return width;
    }

    function setWidth(w) {
     width = w;
    }

    function getHeight() {
     return height;
    }

    function setHeight(h) {
     height = h;
    }

    function getLabel() {
     return label;
    }

    function setLabel(new_label) {
      label = new_label;
    }

    function copy() {
      var cp = new Rect(_newID());
      cp.setFill(fill);
      cp.setFillOpacity(fill_opacity);
      cp.setStroke(stroke);
      cp.setStrokeWidth(stroke_width);
      cp.setStrokeOpacity(stroke_opacity);
      cp.setPos(pos.x, pos.y);
      cp.setSp(sp.x, sp.y);
      cp.setWidth(width);
      cp.setHeight(height);
      cp.setLabel(label.copy());
      return cp;
    }

    function getVisibility() {
     return visibility;
    }

    function setVisibility(value) {
     visibility = value;
    }

    // return public functions
    return {
      getID:getID,
      getFill:getFill,
      setFill:setFill,
      getFillOpacity:getFillOpacity,
      setFillOpacity:setFillOpacity,
      getStroke:getStroke,
      setStroke:setStroke,
      getStrokeWidth:getStrokeWidth,
      setStrokeWidth:setStrokeWidth,
      getStrokeOpacity:getStrokeOpacity,
      setStrokeOpacity:setStrokeOpacity,
      getPosX:getPosX,
      setPosX:setPosX,
      getPosY:getPosY,
      setPosY:setPosY,
      getSpX:getSpX,
      setSpX:setSpX,
      getSpY:getSpY,
      setSpY:setSpY,
      getPos:getPos,
      setPos:setPos,
      getSp:getSp,
      setSp:setSp,
      getWidth:getWidth,
      setWidth:setWidth,
      getHeight:getHeight,
      setHeight:setHeight,
      getLabel:getLabel,
      setLabel:setLabel,
      copy:copy,
      className:className,
      getVisibility:getVisibility,
      setVisibility:setVisibility
    };
  }

  function Circle(new_id) {
    id = new_id;
    var fill = _fill;
    var fill_opacity = _fill_opacity;
    var stroke = _stroke;
    var stroke_width = _stroke_width;
    var stroke_opacity = _stroke_opacity;
    var sp = {cx:_pos.x, cy:_pos.y};
    var pos = {cx:_pos.x, cy:_pos.y};
    var r = _size;
    var label = new Text(_newID());
    var class_name = 'circle';
    var visibility = _visibility;

    // getters and setters

    function className() {
      return class_name;
    }

    function getID() {
      return id;
    }

    function getFill() {
      return fill;
    }

    function setFill(color) {
      fill = color;
    }

    function getFillOpacity() {
      return fill_opacity;
    }

    function setFillOpacity(opacity) {
      fill_opacity = opacity;
    }

    function getStroke() {
      return stroke;
    }

    function setStroke(val) {
      stroke = val;
    }

    function getStrokeWidth() {
      return stroke_width;
    }

    function setStrokeWidth(width) {
      stroke_width = width;
    }

    function getStrokeOpacity() {
      return stroke_opacity;
    }

    function setStrokeOpacity(opacity) {
      stroke_opacity = opacity;
    }

    function getSpCX() {
      return sp.cx;
    }

    function setSpCX(newX) {
      sp.cx = newX;
    }

    function getSpCY() {
      return sp.cx;
    }

    function setSpCY(newY) {
      sp.cy = newY;
    }

    function getSp() {
      return { cx:sp.cx, cy:sp.cy };
    }

    function setSp(spX, spY) {
      setSpCX(spX);
      setSpCY(spY);
    }

    function getPosCX() {
      return pos.cx;
    }

    function setPosCX(newX) {
      pos.cx = newX;
    }

    function getPosCY() {
      return pos.cy;
    }

    function setPosCY(newY) {
      pos.cy = newY;
    }

    function getPos() {
      return { cx:pos.cx, cy:pos.cy };
    }

    function setPos(posX, posY) {
      setPosCX(posX);
      setPosCY(posY);
    }

    function getR() {
      return r;
    }

    function setR(newR) {
      r = newR;
    }

    function getLabel() {
      return label;
    }

    function setLabel(new_label) {
      label = new_label;
    }

    function getVisibility() {
     return visibility;
    }

    function setVisibility(value) {
     visibility = value;
    }

    function copy() {
      var cp = new Circle(_newID());
      cp.setFill(fill);
      cp.setFillOpacity(fill_opacity);
      cp.setStroke(stroke);
      cp.setStrokeWidth(stroke_width);
      cp.setStrokeOpacity(stroke_opacity);
      cp.setPos(pos.cx, pos.cy);
      cp.setSp(sp.cx, sp.cy);
      cp.setR(r);
      cp.setLabel(label.copy());
      return cp;
    }

    // return public functions
    return {
      getID:getID,
      getFill:getFill,
      setFill:setFill,
      getFillOpacity:getFillOpacity,
      setFillOpacity:setFillOpacity,
      getStroke:getStroke,
      setStroke:setStroke,
      getStrokeWidth:getStrokeWidth,
      setStrokeWidth:setStrokeWidth,
      getStrokeOpacity:getStrokeOpacity,
      setStrokeOpacity:setStrokeOpacity,
      getPosCX:getPosCX,
      setPosCX:setPosCX,
      getPosCY:getPosCY,
      setPosCY:setPosCY,
      getSpCX:getSpCX,
      setSpCX:setSpCX,
      getSpCY:getSpCY,
      setSpCY:setSpCY,
      getPos:getPos,
      setPos:setPos,
      getSp:getSp,
      setSp:setSp,
      getR:getR,
      setR:setR,
      getLabel:getLabel,
      setLabel:setLabel,
      className:className,
      getVisibility:getVisibility,
      setVisibility:setVisibility,
      copy:copy
    };
  }

  function Line(new_id) {
    var id = new_id;
    var stroke = _stroke;
    var stroke_width = _stroke_width;
    var stroke_opacity = _stroke_opacity;
    var sp = {
      x1:_line_sp.x1,
      y1:_line_sp.y1,
      x2:_line_sp.x2,
      y2:_line_sp.y2
    };
    var pos = {
      x1:_line_pos.x1,
      y1:_line_pos.y1,
      x2:_line_pos.x2,
      y2:_line_pos.y2
    };
    var class_name = 'line';
    var visibility = _visibility;

    // getters and setters

    function className() {
      return class_name;
    }

    function getID() {
      return id;
    }

    function getStroke() {
      return stroke;
    }

    function setStroke(val) {
      stroke = val;
    }

    function getStrokeWidth() {
      return stroke_width;
    }

    function setStrokeWidth(width) {
      stroke_width = width;
    }

    function getStrokeOpacity() {
      return stroke_opacity;
    }

    function setStrokeOpacity(opacity) {
      stroke_opacity = opacity;
    }

    function getSpX1() {
     return sp.x1;
    }

    function setSpX1(newX) {
     sp.x1 = newX;
    }

    function getSpX2() {
     return sp.x2;
    }

    function setSpX2(newX) {
     sp.x2 = newX;
    }

    function getSpY1() {
     return sp.y1;
    }

    function setSpY1(newY) {
     sp.y1 = newY;
    }

    function getSpY2() {
     return sp.y2;
    }

    function setSpY2(newY) {
     sp.y2 = newY;
    }

    function getSp() {
     return {
       x1:sp.x1,
       y1:sp.y1,
       x2:sp.x2,
       y2:sp.y2
     };
    }

    function setSp(spX1, spY1, spX2, spY2) {
     setSpX1(spX1);
     setSpY1(spY1);
     setSpX2(spX2);
     setSpY2(spY2);
    }

    function getPosX1() {
     return pos.x1;
    }

    function setPosX1(newX) {
     pos.x1 = newX;
    }

    function getPosX2() {
     return pos.x2;
    }

    function setPosX2(newX) {
     pos.x2 = newX;
    }

    function getPosY1() {
     return pos.y1;
    }

    function setPosY1(newY) {
     pos.y1 = newY;
    }

    function getPosY2() {
     return pos.y2;
    }

    function setPosY2(newY) {
     pos.y2 = newY;
    }

    function getPos() {
     return {
       x1:pos.x1,
       y1:pos.y1,
       x2:pos.x2,
       y2:pos.y2
     };
    }

    function setPos(posX1, posY1, posX2, posY2) {
     setPosX1(posX1);
     setPosY1(posY1);
     setPosX2(posX2);
     setPosY2(posY2);
    }

    function getVisibility() {
     return visibility;
    }

    function setVisibility(value) {
     visibility = value;
    }

    function copy() {
      var cp = new Line(_newID());
      cp.setStroke(stroke);
      cp.setStrokeWidth(stroke_width);
      cp.setStrokeOpacity(stroke_opacity);
      cp.setPos(pos.x1, pos.y1, pos.x2, pos.y2);
      cp.setSp(sp.x, sp.y, sp.x2, sp.y2);
      return cp;
    }

    // return public functions
    return {
      getID:getID,
      getStroke:getStroke,
      setStroke:setStroke,
      getStrokeWidth:getStrokeWidth,
      setStrokeWidth:setStrokeWidth,
      getStrokeOpacity:getStrokeOpacity,
      setStrokeOpacity:setStrokeOpacity,
      getSpX1:getSpX1,
      setSpX1:setSpX1,
      getSpX2:getSpX2,
      setSpX2:setSpX2,
      getSpY1:getSpY1,
      setSpY1:setSpY1,
      getSpY2:getSpY2,
      setSpY2:setSpY2,
      getSp:getSp,
      setSp:setSp,
      getPosX1:getPosX1,
      setPosX1:setPosX1,
      getPosX2:getPosX2,
      setPosX2:setPosX2,
      getPosY1:getPosY1,
      setPosY1:setPosY1,
      getPosY2:getPosY2,
      setPosY2:setPosY2,
      getPos:getPos,
      setPos:setPos,
      className:className,
      getVisibility:getVisibility,
      setVisibility:setVisibility,
      copy:copy
    };

  }


  //////////////////////////////////////////////////////////////////////////////
  //  public methods
  //////////////////////////////////////////////////////////////////////////////

  function getText() {
    return new Text(_newID());
  }

  function getRect() {
    return new Rect(_newID());
  }

  function getCircle() {
    return new Circle(_newID());
  }

  function getLine() {
    return new Line(_newID());
  }


  //////////////////////////////////////////////////////////////////////////////
  //  return public methods
  //////////////////////////////////////////////////////////////////////////////


  return {
    getRect:getRect,
    getCircle:getCircle,
    getText:getText,
    getLine:getLine
  };

})();
