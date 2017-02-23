/**
 * Represents a function implemented in an arbitrary language.
 * These are the objects operated upon by the `VirtualMachine`.
 */
class FunctionModel {
  /**
   * Construct a FunctionModel object.
   * The identifier and parameter list will be automatically deduced.
   * @param {Array.CodeLine} codeLines - An array of CodeLine objects that make
   *     up the function model. These are implicitly constructed when
   *     dynamically parser output from a file, so the CodeLine class doesn't
   *     actually exist. Please see the UML diagram's for information about the
   *     structure of these objects.
   */
  constructor(codeLines) {
    this.codeLines = codeLines;
    // Extract the function name and parameter list from the definition
    const match = (this.codeLines[0]["JavaScript"]).match(/(?:\\n|\s)*\((?:\\n|\s)*function(?:\\n|\s)*\((?:\\n|\s)*\w*(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*(\w+)(?:\\n|\s)*\((?:\\n|\s)*([^)]*)(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*}(?:\\n|\s)*\)/m);
    this.identifier = match[1];
    this.params = match[2].split(/,/).map(function(s) { return s.trim(); });
  }

  /**
   * Return a single CodeLine from this function model.
   * @param {number} lineNumber - The one-indexed line number to return.
   * @return {CodeLine} - The requested CodeLine object.
   */
  getLine(lineNumber) {
    return this.codeLines[lineNumber - 1];
  }
}

/**
 * Encodes the current execution context maintained by the VirtualMachine.
 * This object tracks control flow and any objects in scope, much like a stack
 * frame in C-like languages.
 */
class StackFrame {
  /**
   * Constructs a StackFrame object, which occurs when a function is invoked.
   * @param {VirtualMachine} vm - A reference back to the VirtualMachine that
   *     created this frame.
   * @param {FunctionModel} funcModel - The function model who's execution
   *     context is encoded by this frame.
   * @param {Function} resultCallback - A callback that receives the return
   *     value, if any, when execution of `funcModel` is complete.
   * @param {...} args - The arguments to apply to `funcModel`.
   */
  constructor(vm, funcModel, resultCallback, ...args) {
    /** A reference back to the VirtualMachine that created this frame. */
    this.vm = vm;
    /** The function model being executed in the context of this frame. */
    this.funcModel = funcModel;
    /** A map of the arguments with which this function was invoked. */
    this.args = {};
    /** A map to store local variables within the scope of this function. */
    this.locals = {};
    /** A map of helper variables for maintaining state from line-to-line. */
    this.cache = {};
    /** The current line number for controlling flow. */
    this.currentLineNumber = 1;
    /** The next line number for controlling flow. */
    this.nextLineNumber = 2;
    /** A single parameter callback for receiving the return value. */
    this.resultCallback = resultCallback;
    /** The result of this function call, if execution is complete. */
    this.result = undefined;

    // Populate the function's args map with the provided arguments.
    const funcArgs = [...args]
    for (let i = 0; i < funcArgs.length; ++i) {
      this.args[this.funcModel.params[i]] = funcArgs[i];
    }

    // Highlight the first line in the code pane.
    this.highlightLine(1);
  }

  /**
   * Execute the next line of code, update the UI, and update any relevant state
   * encoded in this frame.
   * TODO: Elaborate.
   */
  next() {
    //this.highlightLine(this.currentLineNumber);
    //console.log("Java: " + this.funcModel.getLine(this.currentLineNumber)["Java"]);
    this.currentLineNumber = this.nextLineNumber;
    this.highlightLine(this.currentLineNumber);
    eval(this.funcModel.getLine(this.currentLineNumber)["JavaScript"])(this);
  }

  /**
   * Highlight the specified line in the code pane (and only that line).
   * @param {Number} lineNumber - The one-indexed line to highlight.
   */
  highlightLine(lineNumber) {
    for (let i = 1; i <= this.funcModel.codeLines.length; ++i) {
      document.getElementById("" + i).style.backgroundColor = "";
    }
    if (lineNumber) {
      document.getElementById("" + lineNumber).style.backgroundColor = "#ff8080";
    }
  }

  /**
   * Trigger the result callback that was provided when this frame was created
   * (if any was provided).
   */
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
    hljs.highlightBlock(document.getElementById("codePane"));
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
