vm.loadFunc("1.1-stdrandom-shuffle.js");

var onInvoke = function() {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var v = document.getElementById("visualization").getBoundingClientRect();
  var svgW = v.width;
  var svgH = v.height;
  d3.select(".visualization")
    .append("svg")
    .attr("width", svgW)
    .attr("height", svgH)
    .attr('id', svgCanvasName);

  vm.dur = 500;
  vm.viz = vizlib.get_shuffle(a, svgW, svgH);
  vm.viz.setI(0);
  vm.viz.updateCanvas(0);
  vm.viz.step();
  console.log("Input: " + a);
  vm.invokeFunc("shuffle", function(result) { console.log("Result: " + a); }, a);
};

var onNext = function() {
  vm.next();
};

var onExport = function() {
  let zip = new JSZip();
  for (let i = 0; i < vm.images.length; ++i) {
    zip.file("" + i + ".svg", vm.images[i]);
  }
  zip.generateAsync({type:"blob"})
    .then(function (blob) {
      saveAs(blob, "visualization.zip");
    });
}

document.getElementById("container").innerHTML += `<button onclick="onInvoke()">invoke</button><button onclick="onNext()">step</button><button onclick="onExport()">export</button>`;
