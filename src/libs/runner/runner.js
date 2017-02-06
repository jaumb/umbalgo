// Done2
class FunctionModel {
  constructor(jsonRepr) {
    // For now, use preparsed.
    this.codeLines = jsonRepr;
    //this.codeLines = JSON.parse(jsonRepr);
    // TODO: These two regexs could be combined to capture both the identifier
    // and the parameters in a single go.
    // Use a regex to extract this function model's identifier from it's
    // declaration.
    /*
    this.identifier = (this.codeLines[0]["JavaScript"] + "}")
      .match(/^\s*(\w+)/m)[0];
    console.log("id=" + this.identifier);
    // User a regex to extract this function model's parameter list from it's
    // declaration and store as an array.
    this.params = (this.codeLines[0]["JavaScript"] + "}")
      .match(/(?:\\n|\s)*\((?:\\n|\s)*function(?:\\n|\s)*\((?:\\n|\s)*\w*(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*\w+(?:\\n|\s)*\((?:\\n|\s)*([^)]*)(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*}(?:\\n|\s)*\)/m)[1]
      .split(/,/)
      .map(function(s) { return s.trim(); });
    console.log("params=" + this.params);
    */

    const m = (this.codeLines[0]["JavaScript"]).match(/(?:\\n|\s)*\((?:\\n|\s)*function(?:\\n|\s)*\((?:\\n|\s)*\w*(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*(\w+)(?:\\n|\s)*\((?:\\n|\s)*([^)]*)(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*}(?:\\n|\s)*\)/m);
    this.identifier = m[1];
    this.params = m[2].split(/,/).map(function(s) { return s.trim(); });
  }

  /**
   * Return a 1-indexed function implementing the specified function model
   * native line of code.
   */
  getLine(lineNumber) {
    return this.codeLines[lineNumber - 1];
  }
}

// Done2
class StackFrame {
  constructor(vm, funcModel, resultCallback, ...args) {
    this.vm = vm;
    this.funcModel = funcModel;
    this.args = {};

    //------------------------ This may work
    const argsToApply = [...args];
    // TODO: This can likely be done with the equivalent of a for-each in JS;
    // look into how to do this when internet is available.

    // Populate the function's arguments map
    for (let i = 0; i < argsToApply.length; ++i) {
      this.args[this.funcModel.params[i]] = argsToApply[i];
    }
    //------------------------

/* -------- This is how it was implemented before, and will most certainly work.
    // Populate the function's arguments map
    for (let i = 0; i < arguments.length; ++i) {
      this.args[this.funcModel.params[i]] = arguments[i + 2];
    }
*/

    this.locals = {};
    this.cache = {};
    this.currentLine = this.funcModel.getLine(1);
    this.nextLine = this.funcModel.getLine(2);
    this.resultCallback = resultCallback;
    this.result = undefined;
  }

  next() {
    this.currentLine = this.nextLine;
    eval(this.currentLine["JavaScript"])(this);
  }

  returnResult() {
    if (this.resultCallback) {
      console.log(this.result);
      this.resultCallback(this.result);
    }
  }
}

class VirtualMachine {
  constructor() {
    this.callStack = [];
    this.funcModels = {};
  }
/*
  loadFunc(uri) {
    // TODO: Load parser output into jsonRepr as a String
    jsonRepr = "DYNAMICALLY LOAD PARSER OUTPUT HERE";
    func = new FunctionModel(jsonRepr);
    this.funcModels[func.identifier] = func;
  }
*/
  // For now, just load as an object literal.
  loadFunc(func) {
    this.funcModels[func.identifier] = func;
  }

  invokeFunc(identifier, resultCallback, ...args) {
    console.log("Invoke: " + identifier + "(" + [...args] + ")");
    this.callStack.push(
      new StackFrame(this,
                     this.funcModels[identifier],
                     resultCallback,
                     ...args));
  }

  getStackFrame() {
    return this.callStack[this.callStack.length - 1];
  }

  next() {
    // Execute the next line of the top stack frame.
    this.getStackFrame().next();

    if (!this.getStackFrame().nextLine) {
      // Execution of the top stack frame is complete, so execute the result
      // callback and pop it off the stack.
      this.getStackFrame().returnResult();
      this.callStack.pop();
    }
  }

  setResult(result) {
    this.getStackFrame().result = result;
  }
}
