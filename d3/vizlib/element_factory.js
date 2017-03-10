
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
  }


  //////////////////////////////////////////////////////////////////////////////
  //  public methods
  //////////////////////////////////////////////////////////////////////////////
  var text = function() {
   return {
     id:_newID(),
     fill:colors.BLACK,
     fill_opacity:_fill_opacity,
     stroke:_stroke,
     stroke_width:_stroke_width,
     stroke_opacity:_stroke_opacity,
     sp:{x:_sp.x, y:_sp.y}, // replace
     pos:{x:_pos.x, y:_pos.y}, // replace
     font:_font,
     font_size:_font_size,
     text_anchor:_text_anchor,
     val:''
   }
  };

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
     var pos = {x:_pos.x, y:_pos.y};
     var sp = {x:_pos.x, y:_pos.y};
     var width = _size;
     var height = _size;
     var label = new Text();

     // getters and setters

     function getID() {
       return this.id;
     }

     function getFill() {
       return this.fill;
     }

     function setFill(color) {
       fill = this.color;
     }

     function getFillOpacity() {
       return this.fill_opacity;
     }

     function setFillOpacity(opacity) {
       this.fill_opacity = opacity;
     }

     function getStroke() {
       return this.stroke;
     }

     function setStroke(val) {
       this.stroke = val;
     }

     function getStrokeWidth() {
       return this.stroke_width;
     }

     function setStrokeWidth(width) {
       this.stroke_width = width;
     }

     function getStrokeOpacity() {
       return this.stroke_opacity;
     }

     function setStrokeOpacity(opacity) {
       this.stroke_opacity = opacity;
     }

     function getPosX() {
       return this.pos.x;
     }

     function setPosX(newX) {
       this.pos.x = newX;
     }

     function getPosY() {
       return this.pos.y;
     }

     function setPosY(newY) {
       this.pos.y = newY;
     }

     function getSpX() {
       return this.sp.x;
     }

     function setSpX(newX) {
       this.sp.x = newX;
     }

     function getSpY() {
       return this.sp.x;
     }

     function setSpY(newY) {
       this.sp.y = newY;
     }

     function getPos() {
       return { x:this.pos.x, y:this.pos.y };
     }

     function setPos(posX, posY) {
       setPosX(posX);
       setPosY(posY);
     }

     function getSp() {
       return { x:this.sp.x, y:this.sp.y };
     }

     function setSp(spX, spY) {
       setSpX(spX);
       setSpY(spY);
     }

     function getWidth() {
       return this.width;
     }

     function setWidth(w) {
       this.width = w;
     }

     function getHeight() {
       return this.height;
     }

     function setHeight(h) {
       this.height = h;
     }

     function getLabel() {
       return this.label;
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
       getLabel:getLabel
     }
   }

  var circle = function() {
    return {
      id:_newID(),
      fill:_fill,
      fill_opacity:_fill_opacity,
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp:{cx:_sp.x, cy:_sp.y}, // replace
      pos:{cx:_pos.x, cy:_pos.y}, // replace
      r:_size, // replace
      label:text()
    }
  };

  var line = function() {
    return {
      id:_newID(),
      stroke:_stroke,
      stroke_width:_stroke_width,
      stroke_opacity:_stroke_opacity,
      sp: // replace
      {x1:_line_sp.x1, y1:_line_sp.y1, x2:_line_sp.x2, y2:_line_sp.y2},
      pos: // replace
      {x1:_line_pos.x1, y1:_line_pos.y1, x2:_line_pos.x2, y2:_line_pos.y2}
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  //  return public methods
  //////////////////////////////////////////////////////////////////////////////


  return {
    rect:rect,
    circle:circle,
    text:text,
    line:line
  }
})();
