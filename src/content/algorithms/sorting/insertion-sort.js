vm.loadFunc("2.1-insertion-sort.js");

let onInvoke = function() {
  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  vm.viz = vizlib.get_insertion(a, svgW, svgH);
  vm.viz.updateCanvas(0);
  vm.viz.setBoundPos(0);
  vm.viz.updateCanvas(vm.dur);
  vm.viz.step();
  vm.invokeFunc(document.getElementById("selectMethod").value, undefined, a);
};
