vm.loadFunc("1.1-stdrandom-shuffle.js");

populateSelectInput({
  "Random": d3.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  "Ascending": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "Descending": [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
});

var onInvoke = function() {
  let data = inputData[document.getElementById("selectInput").value];
  vm.viz = vizlib.get_shuffle(data, svgW, svgH);
  vm.viz.setI(0);
  vm.viz.updateCanvas(0);
  vm.viz.step();
  vm.invokeFunc(document.getElementById("selectMethod").value, undefined, data);
};
