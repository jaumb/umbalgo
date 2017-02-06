"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Done2
var FunctionModel = function () {
  function FunctionModel(jsonRepr) {
    _classCallCheck(this, FunctionModel);

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

    var m = this.codeLines[0]["JavaScript"].match(/(?:\\n|\s)*\((?:\\n|\s)*function(?:\\n|\s)*\((?:\\n|\s)*\w*(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*(\w+)(?:\\n|\s)*\((?:\\n|\s)*([^)]*)(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*}(?:\\n|\s)*\)/m);
    this.identifier = m[1];
    this.params = m[2].split(/,/).map(function (s) {
      return s.trim();
    });
  }

  /**
   * Return a 1-indexed function implementing the specified function model
   * native line of code.
   */


  _createClass(FunctionModel, [{
    key: "getLine",
    value: function getLine(lineNumber) {
      return this.codeLines[lineNumber - 1];
    }
  }]);

  return FunctionModel;
}();

// Done2


var StackFrame = function () {
  function StackFrame(vm, funcModel, resultCallback) {
    _classCallCheck(this, StackFrame);

    this.vm = vm;
    this.funcModel = funcModel;
    this.args = {};

    //------------------------ This may work

    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var argsToApply = [].concat(args);
    // TODO: This can likely be done with the equivalent of a for-each in JS;
    // look into how to do this when internet is available.

    // Populate the function's arguments map
    for (var i = 0; i < argsToApply.length; ++i) {
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

  _createClass(StackFrame, [{
    key: "next",
    value: function next() {
      this.currentLine = this.nextLine;
      eval(this.currentLine["JavaScript"])(this);
    }
  }, {
    key: "returnResult",
    value: function returnResult() {
      if (this.resultCallback) {
        console.log(this.result);
        this.resultCallback(this.result);
      }
    }
  }]);

  return StackFrame;
}();

var VirtualMachine = function () {
  function VirtualMachine() {
    _classCallCheck(this, VirtualMachine);

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


  _createClass(VirtualMachine, [{
    key: "loadFunc",
    value: function loadFunc(func) {
      this.funcModels[func.identifier] = func;
    }
  }, {
    key: "invokeFunc",
    value: function invokeFunc(identifier, resultCallback) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      console.log("Invoke: " + identifier + "(" + [].concat(args) + ")");
      this.callStack.push(new (Function.prototype.bind.apply(StackFrame, [null].concat([this, this.funcModels[identifier], resultCallback], args)))());
    }
  }, {
    key: "getStackFrame",
    value: function getStackFrame() {
      return this.callStack[this.callStack.length - 1];
    }
  }, {
    key: "next",
    value: function next() {
      // Execute the next line of the top stack frame.
      this.getStackFrame().next();

      if (!this.getStackFrame().nextLine) {
        // Execution of the top stack frame is complete, so execute the result
        // callback and pop it off the stack.
        this.getStackFrame().returnResult();
        this.callStack.pop();
      }
    }
  }, {
    key: "setResult",
    value: function setResult(result) {
      this.getStackFrame().result = result;
    }
  }]);

  return VirtualMachine;
}();