document.body.innerHTML += `<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">`;
document.getElementById("container").innerHTML += `

  <div class="panel panel-default" style="margin-top:30px; background-color:#222; border: 1px solid #080808;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 1);">
    <div class="panel-body">

      <p class="pull-left" style="color:#dce9f2; font-size:20px;">` + routes["displayName"] + `</p>

      <div class="pull-right">
        <div class="col-md-6 col-sm-6">

        <select class="form-control" id ="selectMethod" onmousedown="this.value='';" onchange="jsFunction(this.value);">
          <option>Choose Method</option>
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
  <div class="row" style="height:100%">
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
        <div class="panel-body" style="height:100%">
          <pre>
            <code id="codePane">
              <!-- Code pane will be inserted here -->
            </code>
          </pre>
        </div>
      </div>
    </div>
  </div>
  <br>`;
var vm = new VirtualMachine();
