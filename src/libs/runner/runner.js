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
   * @param identifier {String} The function model's identifier
   * @param func {ForeignFunction} An object modeling a foreign function
   */
  register(identifier, func) {
    this.functions[identifier] = func;
  }
  /**
   * Invoke a function by name, with the supplied arguments.
   * @param {String} identifier The identifier of the function to be invoked
   * @param {resultcb} A single parameter function to receive the return value
   * @param {...} args A variadic argument list to be applied to the function
  */
  invoke(identifier, resultcb ...args) {
    this.callStack.push(new this.functions[identifier](...args))
  }
  /**
   * Execute next line of code and trigger corresponding callback.
   */
  next() {
    if (this.callStack.size
        && this.callStack[this.callStack.size] === undefined) {
      this.callStack.pop()
    }
    if (this.callStack.size) {
      this.callStack[this.callStack.size].next();
    }
  }
  /**
   * Trigger next UI transition.
   */
  triggerUi(identifier, lineNumber) {
    console.log("Executed identifier():" + lineNumber);
  }
}

/**
 * A model of a foreign-language function.
 */
class ForeignFunction {
  /**
   * Constructs a foreign function from an array of lines of annotated foreign
   * code, each paired with an equiivalent javascript function.
   * @param runner {Runner} The runner that invoked this function.
   * @param {resultcb} A single parameter function to provide the return value
   * @param json {Array} An array of annotated foreign code lines.
   */
  constructor(runner, resultcb, json) {
    /** The object literal that describes this foreign function model. */
    this.definition = JSON.parse(json);
    /** This function's identifier */
    this.identifier = (this.definition[0]["JavaScript"] + "}")
      .match(/^\s*(\w+)/m)[0]
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

    // Register this function with the runner
    this.runner.register(this.name, this.constructor);
  }
  /**
   * Invoke this function.
   * @param args {...} The arguments to invoke with.
   */
  invoke(...args) {
    // Set the current line to the first line of the function (the declaration).
    this.runner.currentLineNumber = 1;
    // Set the next line to executed to the second line fo the function (the
    // first line of the body).
    this.runner.nextLineNumber = 2;
    // Create an array of this function's parameters' names
    params = (this.definition[0]["JavaScript"] + "}")
      .match(/^\s*(\w+)\s*\(\s*([^)]*)\s*\)/m)[1]
      .split(/,/)
      .map(function(s) { return s.trim(); });
    // Populate this functions arguments map
    for (i = 0; i < arguments.length; ++i) {
      args[params[i]] = arguments[i];
    }
  }
  /**
   * Advance to the next line of the function.
   */
  next() {
    // Advance to the next line.
    this.currentLineNumber = this.nextLineNumber;
    // Execute the JavaScript implementation of this line.
    this.definition[this.currentLineNumber - 1]["JavaScript"]();
    // Invoke a callback with this line number as an argument. This callback
    // will manipulate the view.
    this.runner.triggerUi(currentLineNumber);
  }
}
