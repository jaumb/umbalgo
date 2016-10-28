var callStack = [];

var invoke = function() {
  let a = [
    86,
    71,
    10,
    75,
    73,
    64,
    87,
    23,
    41
  ];
  sort(a);
}

var step = function() {
  // Otherwise, pop frames off the stack until we find one with a line to
  // execute queued up.
  while (callStack.length > 0
         && callStack[callStack.length - 1].next === undefined) {
    callStack.pop();
  }
  // If the stack is empty, we're done.
  if (callStack.length === 0) {
    alert("Done");
  } else {
    // Otherwise, execute the next line.
    callStack[callStack.length - 1].next();
  }
}

var sort = function(a) {
  callStack.push(new Sort(a));
  next();
}

var less = function(v, w) {
  callStack.push(new less(v, w));
  next();
}

var exch = function(a, i, j) {
  callStack.push(new exch(a, i, j));
  next();
}

class Sort {
  constructor(a) {
    let params = {
      "a": a
    };
    let locals = {
      "N": undefined,
      "i": undefined,
      "j": undefined
    };
    let helpers = {
      predicate_for_1: undefined,
      is_first_iteration_for_1: true,
      predicate_for_2: undefined,
      is_first_iteration_for_2: true
    };
    let next = line[0];
    let result = undefined;

    this.trigger = function(lineNumber) {
      alert("Trigger line " + lineNumber);
    }

    this.line = [
      function() { // 01:int N = a.length;
        locals["N"] = params["a"].length;
        next = line[1];
        trigger(1);
      },
      function() { // 02:for (int i = 1; i < N; i++) {
        if (helpers["is_first_iteration_for_1"] === true) {
          locals["i"] = 1;
          helpers["is_first_iteration_for_1"] = false;
        } else {
          locals["i"]++;
        }
        if (locals["i"] < locals["N"]) {
          next = line[2];
        } else {
          next = undefined;
        }
        trigger(2);
      },
      function() { // 03:    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
        if (helpers["is_first_iteration_for_2"] === true) {
          locals["j"] = locals["i"];
          helpers["is_first_iteration_for_2"] = false;
        } else {
          locals["j"]--;
        }
        if (locals["j"] > 0 && less(params["a"][locals["j"]], params["a"][locals["j"] - 1])) {
          next = line[3];
        } else {
          next = line[1];
        }
        trigger(3);
      },
      function() { // 04:        exch(a, j, j - 1);
        exch(params["a"], locals["j"], locals["j"] - 1);
        next = line[2];
        trigger(4);
      }
      // 05:    }
      // 06:}
    ]
  }
}

class Less {
  constructor(v, w) {
    let params = {
      "v": v,
      "w": w
    };
    let locals = {
    };
    let helpers = {
    };
    let next = line[0];
    let result = undefined;

    this.trigger = function(lineNumber) {
      alert("Trigger line " + lineNumber)
    }

    this.line = [
      function() { // 01:return v.compareTo(w) < 0;
        result = v < w;
        next = undefined;
        trigger(1);
      }
    ]
  }
}

class Exch {
  constructor(a, i, j) {
    let params = {
      "a": a,
      "i": i,
      "j": j
    };
    let locals = {
      "t": undefined
    };
    let helpers = {
    };
    let next = line[0];
    let result = undefined;

    this.trigger = function(lineNumber) {
      alert("Trigger line " + lineNumber)
    }

    this.line = [
      function() { // 01:Comparable t = a[i];
        locals["t"] = params["a"][params["i"]];
        next = line[1];
        trigger(1);
      },
      function() { // 02:a[i] = a[j];
        params["a"][params["i"]] = params["a"][params["j"]];
        next = line[2];
        trigger(2);
      },
      function() { // 03:a[j] = t;
        params["a"][params["j"]] = locals["t"];
        next = undefined;
        trigger(3);
      }
    ]
  }
}
