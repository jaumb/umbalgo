vm.loadFunc("2.1-insertion-sort.js");

populateSelectInput({
  "Best Case": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "Worst Case": [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  "Random": d3.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
});

let onInvoke = function() {
  if (vm.getFrame() === undefined) {
    var data = inputData[document.getElementById("selectInput").value];
    vm.viz = vizlib.get_insertion(data, svgW, svgH);
    vm.viz.updateCanvas(0);
    vm.viz.setBoundPos(0);
    vm.viz.updateCanvas(vm.dur);
    vm.viz.step();
    vm.invokeFunc(document.getElementById("selectMethod").value, undefined, data);
  }
};
