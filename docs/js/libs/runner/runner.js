"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VirtualMachine = function () {
  function VirtualMachine() {
    _classCallCheck(this, VirtualMachine);

    /** The call stack, comprised of `StackFrame`s. */
    this.callStack = [];
    /** Map of `FunctionModel`s indexed by identifier. */
    this.funcModels = {};
    /** Map for storing "global" (i.e., higher-than-function-scope state. This
        will probably be used for class-level state in most circumstances. */
    this.globals = {};
  }

  _createClass(VirtualMachine, [{
    key: "loadFunc",
    value: function loadFunc(filename) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "js/libs/algo/" + filename);
      var cached_this = this;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var func = new FunctionModel(JSON.parse(xhr.responseText));
            cached_this.funcModels[func.identifier] = func;
          } else {
            alert("Error loading " + filename);
          }
        }
      };
      xhr.send();
    }
  }, {
    key: "invokeFunc",
    value: function invokeFunc(identifier, resultCallback) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      console.log("Invoke: " + identifier + "(" + [].concat(args) + ")");
      this.callStack.push(new (Function.prototype.bind.apply(StackFrame, [null].concat([this, this.funcModels[identifier], resultCallback], args)))());
      this.populateCodePane();
      // Highlight the first line of the function body in the code pane
      this.getFrame().highlightLine(this.getFrame().nextLineNumber);
      this.redrawStackPane();
      this.redrawVariablePanes();
    }
  }, {
    key: "populateCodePane",
    value: function populateCodePane() {
      var codePaneHtml = "";
      var funcModel = this.getFrame().funcModel;
      for (var i = 1; i <= funcModel.codeLines.length; ++i) {
        codePaneHtml += '<span id="' + i + '">' + funcModel.getLine(i)["code"] + "</span>\n";
      }
      document.getElementById("codePane").innerHTML = codePaneHtml;
      // Update code colorization/formatting
      hljs.highlightBlock(document.getElementById("codePane"));
    }
  }, {
    key: "redrawStackPane",
    value: function redrawStackPane() {
      // TODO: Remove this try. This is only here for HTML pages that don't
      // have a `stackPane` element yet.
      var stackPaneHtml = "";
      for (var i = this.callStack.length - 1; i >= 0; --i) {
        stackPaneHtml += this.callStack[i].funcModel.identifier + "<br />";
      }
      try {
        document.getElementById("stackPane").innerHTML = stackPaneHtml;
      } catch (e) {}
    }
  }, {
    key: "redrawVariablePanes",
    value: function redrawVariablePanes() {
      // TODO: Remove this try. This is only here for HTML pages that don't
      // have a `localPane`/`argsPane` element yet.
      var localsPaneHtml = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(this.getFrame().locals)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              identifier = _step$value[0],
              value = _step$value[1];

          localsPaneHtml += identifier + "=" + value + "<br />";
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      try {
        document.getElementById("localsPane").innerHTML = localsPaneHtml;
      } catch (e) {}

      var argsPaneHtml = "";
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(this.getFrame().args)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              identifier = _step2$value[0],
              value = _step2$value[1];

          argsPaneHtml += identifier + "=" + value + "<br />";
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      try {
        document.getElementById("argsPane").innerHTML = argsPaneHtml;
      } catch (e) {}
    }
  }, {
    key: "getFrame",
    value: function getFrame() {
      return this.callStack[this.callStack.length - 1];
    }
  }, {
    key: "next",
    value: function next() {
      // Execute the next line of the top stack frame.
      this.getFrame().next();

      if (this.getFrame().nextLineNumber) {
        // If the top stack frame hasn't returned, highlight the next line.
        this.getFrame().highlightLine(this.getFrame().nextLineNumber);
      } else {
        // Otherwise, fire the result callback,
        this.getFrame().returnResult();
        // and pop the frame off the stack.
        this.callStack.pop();
        // Set flag to indicate that the next call to `next` should do nothing but
        // advance the highlighted line.
        if (this.getFrame()) {
          this.getFrame().noop = true;
          // redraw the code pane,
          this.populateCodePane();
          // highlight the current line,
          this.getFrame().highlightLine(this.getFrame().currentLineNumber);
          // and redraw the call stack trace.
          this.redrawStackPane();
        } else {
          // TODO: Clear code pane (or something)
        }
      }
      this.redrawVariablePanes();
    }

    // Deprecated. Set result directly on frame instead.

  }, {
    key: "setResult",
    value: function setResult(result) {
      this.getFrame().result = result;
    }
  }]);

  return VirtualMachine;
}();

/**
 * Represents a function implemented in an arbitrary language.
 * These are the objects operated upon by the `VirtualMachine`.
 */


var FunctionModel = function () {
  /**
   * Construct a FunctionModel object.
   * The identifier and parameter list will be automatically deduced.
   * @param {Array.CodeLine} codeLines - An array of CodeLine objects that make
   *     up the function model. These are implicitly constructed when
   *     dynamically parser output from a file, so the CodeLine class doesn't
   *     actually exist. Please see the UML diagram's for information about the
   *     structure of these objects.
   */
  function FunctionModel(codeLines) {
    _classCallCheck(this, FunctionModel);

    this.codeLines = codeLines;
    // Extract the function name and parameter list from the definition
    var match = this.codeLines[0]["impl"].match(/(?:\\n|\s)*\((?:\\n|\s)*function(?:\\n|\s)*\((?:\\n|\s)*\w*(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*(\w+)(?:\\n|\s)*\((?:\\n|\s)*([^)]*)(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*}(?:\\n|\s)*\)/m);
    this.identifier = match[1];
    this.params = match[2].split(/,/).map(function (s) {
      return s.trim();
    });
  }
  /**
   * Return a single CodeLine from this function model.
   * @param {number} lineNumber - The one-indexed line number to return.
   * @return {CodeLine} - The requested CodeLine object.
   */


  _createClass(FunctionModel, [{
    key: "getLine",
    value: function getLine(lineNumber) {
      return this.codeLines[lineNumber - 1];
    }
  }]);

  return FunctionModel;
}();

/**
 * Encodes the current execution context maintained by the VirtualMachine.
 * This object tracks control flow and any objects in scope, much like a stack
 * frame in C-like languages.
 */


var StackFrame = function () {
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
  function StackFrame(vm, funcModel, resultCallback) {
    _classCallCheck(this, StackFrame);

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
    /** The next line number for controlling flow. */
    this.nextLineNumber = 2;
    /** A single parameter callback for receiving the return value. */
    this.resultCallback = resultCallback;
    /** The result of this function call, if execution is complete. */
    this.result = undefined;
    /** When this flag is true, do nothing but advance the highlighted line on
        the next call to `next`. */
    this.noop = false;

    // Populate the function's args map with the provided arguments.

    for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    var funcArgs = [].concat(args);
    for (var i = 0; i < funcArgs.length; ++i) {
      this.args[this.funcModel.params[i]] = funcArgs[i];
    }
  }
  /**
   * Execute the next line of code, update the UI, and update any relevant state
   * encoded in this frame.
   * TODO: Elaborate.
   */


  _createClass(StackFrame, [{
    key: "next",
    value: function next() {
      this.currentLineNumber = this.nextLineNumber;
      if (this.noop) {
        this.noop = false;
      } else {
        eval(this.funcModel.getLine(this.currentLineNumber)["impl"])(this);
      }
    }
    /**
     * Highlight the specified line in the code pane (and only that line).
     * @param {Number} lineNumber - The one-indexed line to highlight.
     */

  }, {
    key: "highlightLine",
    value: function highlightLine(lineNumber) {
      for (var i = 1; i <= this.funcModel.codeLines.length; ++i) {
        document.getElementById("" + i).style.backgroundColor = "";
      }
      if (lineNumber) {
        // Highlight the specified line in the code pane,
        document.getElementById("" + lineNumber).style.backgroundColor = "#ff8080";
        // and display the associated note, if there is any.
        var note = this.funcModel.getLine(lineNumber)["note"];
        if (note) {
          document.getElementById("codeNote").innerHTML = eval(note)(this);
        } else {
          document.getElementById("codeNote").innerHTML = "";
        }
      }
    }
    /**
     * Trigger the result callback that was provided when this frame was created
     * (if any was provided).
     */

  }, {
    key: "returnResult",
    value: function returnResult() {
      if (this.resultCallback) {
        this.resultCallback(this.result);
      }
    }
  }]);

  return StackFrame;
}();

console.log("runner.js executed");
