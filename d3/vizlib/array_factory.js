
var array_factory = (function(){

  /****************************************************************************
   *  private methods
   ****************************************************************************/
  // array object definition
  function Array_viz(elems, bounding_box) {
    var _elems = [];

    // init([numbers])
    function init(arr) {

    }

    // change_fill(color, [index...])
    function change_fill(color, indices) {

    }

    // change_outline(color, [index...])
    function change_outline(color, indices) {

    }

    // swap(index1, index2)
    function swap(index1, index2) {

    }

    // label_element(position, value, index)
    function label_element(index, value) {

    }

    // emphasize([index..], color)
    function emphasize(color, indices) {

    }

    // change_label_color([index...], color)
    function change_label_color(color, indices) {

    }

    // change_label([index...], new_label)
    function change_label(new_label, indices) {

    }

    // return public functions
    return {
      init:init,
      change_fill:change_fill,
      change_outline:change_outline,
      swap:swap,
      label_element:label_element,
      emphasize:emphasize,
      change_label_color:change_label_color,
      change_label:change_label
    }
  }


  /****************************************************************************
   *  public methods
   ****************************************************************************/
  // make a new array
  function get_new_array(elems, bounding_box) {
    return new Array_viz(elems, bounding_box);
  }

  /****************************************************************************
   *  return public methods
   ****************************************************************************/
  return {
    get_array:get_new_array
  }

})();
