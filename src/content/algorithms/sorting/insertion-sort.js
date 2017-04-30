vm.loadFunc("2.1-insertion-sort.js");


function jsFunction(value)
{
   onInvoke();
}
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

  vm.dur = 500;
  vm.viz = vizlib.get_insertion(a, svgW, svgH);
  vm.viz.updateCanvas(0);
  vm.viz.setBoundPos(0);
  vm.viz.updateCanvas(vm.dur);
  vm.viz.step();
  console.log("Input: " + a);
  vm.invokeFunc("sort", function(result) { console.log("Result: " + a); }, a);
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

document.getElementById("container").innerHTML += `<!--<button onclick="onInvoke()">invoke</button>    <button onclick="onNext()" id="next">step</button>  <button onclick="onExport()">export</button>-->
                                                  <div class="pull-right">
                                                  <button type="button" class="btn btn-primary btn-lg outline" data-toggle="tooltip" data-placement="bottom" title="Invoke" onclick="onInvoke()">
                                                  <span class="glyphicon glyphicon-off icon-invoke" aria-hidden="true"></span>
                                                  </button>

                                                  <button type="button" class="btn btn-primary btn-lg outline" data-toggle="tooltip" data-placement="bottom" title="Step" onclick="onNext()" id="next">
                                                  <span class="glyphicon glyphicon-step-forward icon-step" aria-hidden="true"></span>
                                                  </button>
                                                  </div>

                                                  <div class="pull-left">
                                                  <button type="button" class="btn btn-primary btn-lg outline" data-toggle="tooltip" data-placement="bottom" title="Export" onclick="onExport()">
                                                  <span class="glyphicon glyphicon-save-file icon-export" aria-hidden="true"></span>
                                                  </button>
                                                  </div>`;

document.getElementById("sm-device-btn").innerHTML += `<!--<button onclick="onInvoke()">invoke</button>    <button onclick="onNext()" id="next">step</button>  <button onclick="onExport()">export</button>-->
                                                  <div class="pull-right">
                                                  <button type="button" class="btn btn-primary btn-lg outline" onclick="onInvoke()">
                                                  <span class="glyphicon glyphicon-off icon-invoke" aria-hidden="true"></span>
                                                  </button>

                                                  <button type="button" class="btn btn-primary btn-lg outline" onclick="onNext()" id="next">
                                                  <span class="glyphicon glyphicon-step-forward icon-step" aria-hidden="true"></span>
                                                  </button>
                                                  </div>

                                                  <div class="pull-left">
                                                  <button type="button" class="btn btn-primary btn-lg outline" onclick="onExport()">
                                                  <span class="glyphicon glyphicon-save-file icon-export" aria-hidden="true"></span>
                                                  </button>
                                                  </div>`;

for (let method of routes["methods"]) {
  document.getElementById("selectMethod").innerHTML += `<option value="1">` + method + `</option>`;
}
