vm.loadFunc("2.1-insertion-sort.js");

let onInvoke = function() {
  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  vm.viz = vizlib.get_insertion(a, svgW, svgH);
  vm.viz.updateCanvas(0);
  vm.viz.setBoundPos(0);
  vm.viz.updateCanvas(vm.dur);
  vm.viz.step();
  vm.invokeFunc(document.getElementById("selectMethod").value, undefined, a);
};

document.getElementById("container").innerHTML +=
  `<div class="pull-right">
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
