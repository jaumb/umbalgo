vm.loadFunc("2.1-selection-sort.js");

var onInvoke = function() {
  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  var v = document.getElementById("visualization").getBoundingClientRect();
  vm.svgW = v.width;
  vm.svgH = v.height;
  d3.select(".visualization")
    .append("svg")
    .attr("width", vm.svgW)
    .attr("height", vm.svgH)
    .attr('id', svgCanvasName);

  vm.dur = 500;
  vm.viz = vizlib.get_selection(a, vm.svgW, vm.svgH);
  vm.viz.updateCanvas(0);
  vm.viz.step();
  console.log("Input: " + a);
  vm.invokeFunc("sort", function(result) { console.log("Result: " + a); }, a);
};

var onNext = function() {
  vm.next();
};

var onPlay = function() {
  vm.play();
};

var onExport = function() {
  // let pdf = new jsPDF({
  //   orientation: "landscape",
  //   unit: "in",
  //   format: "letter"
  // });

  let doc = new jsPDF('p', 'pt', 'a4');
  for (let i = 0; i < vm.images.length; ++i) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvg(canvas, vm.images[i]);
    let imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 40, 40, vm.svgW, vm.svgH);
    doc.addPage();
    document.deleteElement



    // zip.file("" + i + ".svg", vm.images[i]);
  }
  // let zip = new JSZip();
  // for (let i = 0; i < vm.images.length; ++i) {
  //   zip.file("" + i + ".svg", vm.images[i]);
  // }
  // zip.generateAsync({type:"blob"})
  //   .then(function (blob) {
  //     saveAs(blob, "visualization.zip");
  //   });
  doc.save('test.pdf');
}

document.getElementById("container").innerHTML += `<!--<button onclick="onInvoke()">invoke</button>  <button onclick="onNext()" id="next">step</button>  <button onclick="onPlay()" id="next">play</button>  <button onclick="onExport()">export</button>-->
                                                  <div class="pull-right">
                                                  <button type="button" class="btn btn-primary btn-lg outline" data-toggle="tooltip" data-placement="bottom" title="Invoke"onclick="onInvoke()">
                                                  <span class="glyphicon glyphicon-off icon-invoke" aria-hidden="true"></span>
                                                  </button>

                                                  <button type="button" class="btn btn-primary btn-lg outline" data-toggle="tooltip" data-placement="bottom" title="Play"onclick="onPlay()" id="next">
                                                  <span class="glyphicon glyphicon-play icon-play" aria-hidden="true"></span>
                                                  </button>

                                                  <button type="button" class="btn btn-primary btn-lg outline" data-toggle="tooltip" data-placement="bottom" title="Step"onclick="onNext()" id="next">
                                                  <span class="glyphicon glyphicon-step-forward icon-step" aria-hidden="true"></span>
                                                  </button>
                                                  </div>
                                                  
                                                  <div class="pull-left">
                                                  <button type="button" class="btn btn-primary btn-lg outline" data-toggle="tooltip" data-placement="bottom" title="Export"onclick="onExport()">
                                                  <span class="glyphicon glyphicon-save-file icon-export" aria-hidden="true"></span>
                                                  </button>
                                                  </div>`;

document.getElementById("sm-device-btn").innerHTML += `<!--<button onclick="onInvoke()">invoke</button>  <button onclick="onNext()" id="next">step</button>  <button onclick="onPlay()" id="next">play</button>  <button onclick="onExport()">export</button>-->
                                                  <div class="pull-right">
                                                  <button type="button" class="btn btn-primary btn-lg outline" onclick="onInvoke()">
                                                  <span class="glyphicon glyphicon-off icon-invoke" aria-hidden="true"></span>
                                                  </button>

                                                  <button type="button" class="btn btn-primary btn-lg outline" onclick="onPlay()" id="next">
                                                  <span class="glyphicon glyphicon-play icon-step" aria-hidden="true"></span>
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
