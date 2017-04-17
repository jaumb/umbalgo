vm.loadFunc("exch.js");
vm.loadFunc("less.js");
vm.loadFunc("2.1-selection-sort.js");

var onInvoke = function() {
  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  var v = document.getElementById("visualization").getBoundingClientRect();
  var svgW = v.width;
  var svgH = v.height;
  d3.select(".visualization")
    .append("svg")
    .attr("width", svgW)
    .attr("height", svgH)
    .attr('id', svgCanvasName);

  redraw.initCanvas(svgCanvasName);

  vm.viz = vizlib.get_selection(a, svgW, svgH);
  vm.dur = 5;
  vm.viz.updateCanvas(vm.dur);

  console.log("Input: " + a);
  vm.invokeFunc("sort", function(result) { console.log("Result: " + a); }, a);
};

var onNext = function() {
  vm.next();
};

document.getElementById("container").innerHTML += `<button onclick="onInvoke()">invoke</button><button onclick="onNext()">step</button>`;
