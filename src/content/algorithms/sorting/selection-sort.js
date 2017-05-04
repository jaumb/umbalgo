vm.loadFunc("2.1-selection-sort.js");

populateSelectInput({
  "Random": d3.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
});

var onInvoke = function() {
  //  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  var data = inputData[document.getElementById("selectInput").value];
  vm.viz = vizlib.get_selection(data, svgW, svgH);
  vm.viz.updateCanvas(0);
  vm.viz.step();
  vm.invokeFunc(document.getElementById("selectMethod").value, undefined, data);
};
