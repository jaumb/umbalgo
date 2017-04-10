document.body.innerHTML += `<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">`;
document.getElementById("container").innerHTML += `
  <div>
    <h2 style="text-align:center" id="title">` + routes["displayName"] + `</h2>
  </div>
  <div id="codeNote">
  </div>
  <div class="row" style="height:100%">
    <div class="col-xs-6" style="height:100%">
      <div class="panel panel-default" style="height:100%">
        <div class="panel-body" style="height:100%">
          <div id="visualization">
            <!-- Visualization will be inserted here -->
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-6" style="height:100%">
      <div class="panel panel-default" style="height:100%">
        <div class="panel-body" style="height:100%">
          <pre>
            <code id="codePane">
              <!-- Code pane will be inserted here -->
            </code>
          </pre>
        </div>
      </div>
    </div>
  </div>`;
var vm = new VirtualMachine();
