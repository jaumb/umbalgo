vm.loadFunc("2.1-selection-sort.js");

var onInvoke = function() {
  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  vm.viz = vizlib.get_selection(a, svgW, svgH);
  vm.viz.updateCanvas(0);
  vm.viz.step();
  vm.invokeFunc(document.getElementById("selectMethod").value, undefined, a);
};
