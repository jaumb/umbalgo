document.body.innerHTML += `<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">`;
document.getElementById("container").innerHTML += `
  <div class="panel panel-default" style="margin-top:30px; background-color:#222; border: 1px solid #080808;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 1);">
    <div class="panel-body">

      <p class="pull-left" style="color:#dce9f2; font-size:20px;">` + routes["displayName"] + `</p>

      <div class="pull-right">
        <div class="col-md-6 col-sm-6">

        <select class="form-control" id="selectMethod" onchange="onInvoke();">
          <option>Choose Method</option>
          <!-- Algorithm methods will be inserted here -->
        </select>

        </div>

        <div class="col-md-6 col-sm-6">

        <select class="form-control">
          <option>Choose Data Set &nbsp;</option>
        </select>
        </div>

      </div>
    </div>
  </div>

  <div class="visible-xs" id="sm-device-btn">
  </div>


  <div id="codeNote">
  </div>
  <div class="row" style="height:75%">
    <div class="col-xs-12 col-sm-12 col-md-6" style="height:100%">
      <div class="panel panel-default" style="height:100%; box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 1);">
        <div class="panel-body" style="height:100%">
          <div id="visualization" class="visualization" style="width:100%; height:100%">
            <!-- Visualization will be inserted here -->
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6" style="height:100%">
      <div class="panel panel-default" style="height:100%; box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 1);">
        <pre style="height:100%;background-color:#f5f5f5">
          <code id="codePane" style="background-color:#f5f5f5">
            <!-- Code pane will be inserted here -->
          </code>
        </pre>
      </div>
    </div>
  </div>
  <br>
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

document.getElementById("sm-device-btn").innerHTML +=
  `<div class="pull-right">
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

var vm = new VirtualMachine();
vm.dur = 500;

var v = document.getElementById("visualization").getBoundingClientRect();
var svgW = v.width;
var svgH = v.height;
d3.select(".visualization")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH)
  .attr('id', svgCanvasName);

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

// Populate the list of available methods
for (let method of routes["methods"]) {
  document.getElementById("selectMethod").innerHTML += `<option value="` + method + `">` + method + `</option>`;
}
