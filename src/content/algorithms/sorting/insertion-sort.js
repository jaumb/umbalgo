console.log("insertion-sort");
vm.loadFunc("exch.js");
vm.loadFunc("less.js");
vm.loadFunc("2.1-insertion-sort.js");

var onInvoke = function() {
  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  vm.visualization = insertionSortViz(a);
  vm.visualization.highlight([0]);
  vm.visualization.unhighlight([0]);
  vm.visualization.updateBoundary(0);
  console.log("Input: " + a);
  vm.invokeFunc("sort", function(result) { console.log("Result: " + a); }, a);
};

var onNext = function() {
  vm.next();
};

document.getElementById('container').innerHTML += `<button onclick="onInvoke()">invoke</button><button onclick="onNext()">step</button>`;
