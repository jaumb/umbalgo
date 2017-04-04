"use strict";

console.log("algorithms-inherit");

document.body.innerHTML += "<link rel=\"stylesheet\" type=\"text/css\" href=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css\">";
document.getElementById("container").innerHTML += "\n  <div>\n    <h2 style=\"text-align:center\" id=\"title\"></h2>\n  </div>\n  <div id=\"codeNote\">\n  </div>\n  <div class=\"row\" style=\"height:100%\">\n    <div class=\"col-xs-6\" style=\"height:100%\">\n      <div class=\"panel panel-default\" style=\"height:100%\">\n        <div class=\"panel-body\" style=\"height:100%\">\n          <div id=\"visualization\">\n            <!-- Visualization will be inserted here -->\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-xs-6\" style=\"height:100%\">\n      <div class=\"panel panel-default\" style=\"height:100%\">\n        <div class=\"panel-body\" style=\"height:100%\">\n          <pre>\n            <code id=\"codePane\">\n              <!-- Code pane will be inserted here -->\n            </code>\n          </pre>\n        </div>\n      </div>\n    </div>\n  </div>";
var vm = new VirtualMachine();