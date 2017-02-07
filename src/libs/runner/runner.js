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
    this.currentLine = this.funcModel.getLine(1);
    this.nextLine = this.funcModel.getLine(2);
    this.resultCallback = resultCallback;
    this.result = undefined;

    // Populate the function's arguments map
    const funcArgs = [...args]
    for (let i = 0; i < funcArgs.length; ++i) {
      this.args[this.funcModel.params[i]] = funcArgs[i];
    }
  }

  next() {
    this.currentLine = this.nextLine;
    console.log("Java: " + this.currentLine["Java"]);
    eval(this.currentLine["JavaScript"])(this);
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

  invokeFunc(identifier, resultCallback, ...args) {
    console.log("Invoke: " + identifier + "(" + [...args] + ")");
    this.callStack.push(
      new StackFrame(this,
                     this.funcModels[identifier],
                     resultCallback,
                     ...args));
  }

  getFrame() {
    return this.callStack[this.callStack.length - 1];
  }

  next() {
    // Execute the next line of the top stack frame.
    this.getFrame().next();

    if (!this.getFrame().nextLine) {
      // Execution of the top stack frame is complete, so execute the result
      // callback and pop it off the stack.
      this.getFrame().returnResult();
      this.callStack.pop();
    }
  }

  setResult(result) {
    this.getFrame().result = result;
  }
}
