/**
 * Executes a foreign-language function modeled as a Function object.
 */
class Runner {
  /**
   * Construct a runner, and break at the first line of execution.
   * @param func {ForeignFunction} A function model object, instantiated with the
   *     appropriate arguments
   */
  constructor() {
    /** Map of available functions. */
    this.functions = {};
    /** The call stack */
    this.callStack = [];
    /** The callback for returning the result of current function */
    this.resultcb = undefined;
  }
  /**
   * Register a new function
   * @param identifier {String} The function model's identifier.
   * @param func_factory {Function} Returns a new ForeignFunction.
   */
  register(identifier, func_factory) {
    this.functions[identifier] = func_factory;
  }
  /**
   * Invoke a function by name, with the supplied arguments.
   * @param {String} identifier The identifier of the function to be invoked
   * @param {resultcb} A single parameter function to receive the return value
   * @param {...} args A variadic argument list to be applied to the function
  */
  invoke(identifier, resultcb, ...args) {
    this.callStack.push(this.functions[identifier]());
    console.log(this.callStack);
    this.callStack[this.callStack.length - 1].invoke(...args);
  }
  /**
   * Execute next line of code and trigger corresponding callback.
   */
  next() {
    if (this.callStack.length !== 0
        && this.callStack[this.callStack.length - 1].nextLineNumber === undefined) {
      console.log("Runner next: pop");
      this.callStack.pop();
    }
    if (this.callStack.length !== 0) {
      console.log("Runner next: func next");
      this.callStack[this.callStack.length - 1].next();
    }
  }
  /**
   * Trigger next UI transition.
   */
  triggerUi(identifier, lineNumber) {
    console.log("Executed identifier():" + this.callStack[this.callStack.length - 1].currentLineNumber);
  }
}

/**
 * A model of a foreign-language function.
 */
class ForeignFunction {
  factory(...args) {
    return new ForeignFunction(...args);
  }
  /**
   * Constructs a foreign function from an array of lines of annotated foreign
   * code, each paired with an equiivalent javascript function.
   * @param runner {Runner} The runner that invoked this function.
   * @param {resultcb} A single parameter function to provide the return value
   * @param json {Array} An array of annotated foreign code lines.
   */
  constructor(runner, resultcb, json) {
    /** The object literal that describes this foreign function model. */
    // TODO: For now, using pre-parsed data
    this.definition = json;
    //this.definition = JSON.parse(json);
    /** This function's identifier */
    this.identifier = (this.definition[0]["JavaScript"] + "}")
      .match(/^\s*(\w+)/m)[0];
    /** The runner that invoked this function. */
    this.runner = runner;
    /** A map of the arguments this function was invoked with. */
    this.args = {};
    /** A map of the function's local variables. */
    this.locals = {};
    /** An array of maps of helper variables for each line. */
    this.helpers = Array(this.definition.length).fill({});
    /** The currently executing line number. */
    this.currentLineNumber = undefined;
    /** The next line to be executed line number. */
    this.nextLineNumber = undefined;
    /** The result of this function. */
    this.resultcb = undefined;
  }
  /**
   * Invoke this function.
   * @param args {...} The arguments to invoke with.
   */
  invoke(...args) {
    // Set the current line to the first line of the function (the declaration).
    this.currentLineNumber = 1;
    // Set the next line to executed to the second line fo the function (the
    // first line of the body).
    this.nextLineNumber = 2;
    // Create an array of this function's parameters' names
    this.params = (this.definition[0]["JavaScript"] + "}")
      .match(/(?:\\n|\s)*\((?:\\n|\s)*function(?:\\n|\s)*\((?:\\n|\s)*\w*(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*\w+(?:\\n|\s)*\((?:\\n|\s)*([^)]*)(?:\\n|\s)*\)(?:\\n|\s)*{(?:\\n|\s)*}(?:\\n|\s)*\)/m)[1]
      .split(/,/)
      .map(function(s) { return s.trim(); });
    // Populate this functions arguments map
    for (let i = 0; i < arguments.length; ++i) {
      this.args[this.params[i]] = arguments[i];
    }
  }
  /**
   * Advance to the next line of the function.
   */
  next() {
    console.log(this.args["a"]);
    // Advance to the next line.
    this.currentLineNumber = this.nextLineNumber;
    // Execute the JavaScript implementation of this line.
    if (this.currentLineNumber !== 1) {
      // But only if it's not the first, which doesn't actually do anything.
      eval(this.definition[this.currentLineNumber - 1]["JavaScript"])(this);
    }
    // Invoke a callback with this line number as an argument. This callback
    // will manipulate the view.
    this.runner.triggerUi(this.currentLineNumber);
  }
}
