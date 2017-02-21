class FunctionModel {
  constructor(filename) {
    this.codeLines = filename;
    // Extract the function name and parameter list from the definition
    const match = (this.codeLines[0]["JavaScript"]).match(/(?:\\n|\s)*\((?:\\n|\s)*function(?:\\n|\s)*\((?:\\n|\s)*\w*(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*(\w+)(?:\\n|\s)*\((?:\\n|\s)*([^)]*)(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*}(?:\\n|\s)*\)/m);
    this.identifier = match[1];
    this.params = match[2].split(/,/).map(function(s) { return s.trim(); });
  }

  getLine(lineNumber) {
    return this.codeLines[lineNumber - 1];
  }
}

class StackFrame {
  constructor(vm, funcModel, resultCallback, ...args) {
    this.vm = vm;
    this.funcModel = funcModel;
    this.args = {};
    this.locals = {};
    this.cache = {};
    this.currentLineNumber = 1;
    this.highlightLine(1);
    this.nextLineNumber = 2;
    this.resultCallback = resultCallback;
    this.result = undefined;

    // Populate the function's arguments map
    const funcArgs = [...args]
    for (let i = 0; i < funcArgs.length; ++i) {
      this.args[this.funcModel.params[i]] = funcArgs[i];
    }
  }

  next() {
    //this.highlightLine(this.currentLineNumber);
    //console.log("Java: " + this.funcModel.getLine(this.currentLineNumber)["Java"]);
    this.currentLineNumber = this.nextLineNumber;
    this.highlightLine(this.currentLineNumber);
    console.log("Java: " + this.funcModel.getLine(this.currentLineNumber)["Java"]);

    eval(this.funcModel.getLine(this.currentLineNumber)["JavaScript"])(this);
  }

  highlightLine(lineNumber) {
    try {
      for (let i = 1; i <= this.funcModel.codeLines.length; ++i) {
        document.getElementById("" + i).style.backgroundColor = "";
      }
      if (lineNumber) {
        document.getElementById("" + lineNumber).style.backgroundColor = "#ff8080";
      }
    } catch (err) {
      console.log(err);
    }
  }

  returnResult() {
    if (this.resultCallback) {
      this.resultCallback(this.result);
    }
  }
}

class VirtualMachine {
  constructor() {
    this.callStack = [];
    this.funcModels = {};
  }

  loadFunc(filename) {
    const xhr = new XMLHttpRequest;
    xhr.open("GET", "js/libs/algo/" + filename);
    let cached_this = this;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const func = new FunctionModel(JSON.parse(xhr.responseText));
          cached_this.funcModels[func.identifier] = func;
        } else {
          alert("Error loading " + filename);
        }
      }
    };
    xhr.send();
  }

  populateCodePane(funcModel) {
    let codePaneHtml = "";
    for (let i = 1; i <= funcModel.codeLines.length; ++i) {
      codePaneHtml += ('<span id="' + i + '">' + funcModel.getLine(i)["Java"] + "</span>\n");
    }
    document.getElementById("codePane").innerHTML = codePaneHtml;
  }

  invokeFunc(identifier, resultCallback, ...args) {
    console.log("Invoke: " + identifier + "(" + [...args] + ")");
    let func = this.funcModels[identifier];
    this.populateCodePane(func);
    this.callStack.push(new StackFrame(this, func, resultCallback, ...args));
  }

  getFrame() {
    return this.callStack[this.callStack.length - 1];
  }

  next() {
    // Execute the next line of the top stack frame.
    this.getFrame().next();

    if (!this.getFrame().nextLineNumber) {
      // Execution of the top stack frame is complete, so execute the result
      // callback and pop it off the stack.
      this.getFrame().returnResult();
      this.callStack.pop();


      this.populateCodePane(this.getFrame().funcModel);


      //this.getFrame().highlightLine(this.getFrame().currentLineNumber)
    }
  }

  setResult(result) {
    this.getFrame().result = result;
  }
}
