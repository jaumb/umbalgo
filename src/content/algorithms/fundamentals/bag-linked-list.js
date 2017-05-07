vm.loadFunc("1.3-bag-add.js");

populateSelectInput({
  "Random": d3.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  "Ascending": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "Descending": [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
});

let firstInvocation = true;

var onInvoke = function() {
  if (vm.getFrame() === undefined) {
    if (firstInvocation === true) {
      firstInvocation = false;
      vm.globals["first"] = null;
      vm.viz = vizlib.get_linkedbag(vm.globals["first"], svgW, svgH);
      vm.viz.showFirst();
      vm.viz.updateCanvas(vm.dur);
      vm.viz.step();
    }
    let data = inputData[document.getElementById("selectInput").value].pop();
    vm.invokeFunc(document.getElementById("selectMethod").value, undefined, data);
  }
};
