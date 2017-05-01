vm.loadFunc("1.1-stdrandom-shuffle.js");

var onInvoke = function() {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vm.viz = vizlib.get_shuffle(a, svgW, svgH);
  vm.viz.setI(0);
  vm.viz.updateCanvas(0);
  vm.viz.step();
  vm.invokeFunc(document.getElementById("selectMethod").value, undefined, a);
};
