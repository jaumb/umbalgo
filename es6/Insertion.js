var callStack = [];

var trigger = function(msg) {
  console.log(msg);
}

var invoke = function() {
  var a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
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
    console.log("Done");
  } else {
    // Otherwise, execute the next line.
    callStack[callStack.length - 1].next();
  }
}

var sort = function(a) {
  console.log(a);
  callStack.push(new Sort(a));
  step();
}

var less = function(v, w) {
  callStack.push(new Less(v, w));
  step();
}

var exch = function(a, i, j) {
  callStack.push(new Exch(a, i, j));
  step();
}

class Sort {
  constructor(a) {
    console.log("Invoke: sort");
    this.params = {
      "a": a
    };
    this.locals = {
      "N": undefined,
      "i": undefined,
      "j": undefined
    };
    this.helpers = {
      predicate_for_1: undefined,
      is_first_iteration_for_1: true,
      predicate_for_2: undefined,
      is_first_iteration_for_2: true
    };
    this.result = undefined;

    this.line = [
      function() { // 01:int N = a.length;
        this.locals["N"] = this.params["a"].length;
        this.next = this.line[1];
        trigger("Sort(): 1");
      },
      function() { // 02:for (int i = 1; i < N; i++) {
        if (this.helpers["is_first_iteration_for_1"] === true) {
          this.locals["i"] = 1;
          this.helpers["is_first_iteration_for_1"] = false;
        } else {
          this.locals["i"]++;
        }
        if (this.locals["i"] < this.locals["N"]) {
          this.next = this.line[2];
        } else {
          this.next = undefined;
          callStack.pop();
        }
        trigger("Sort(): 2");
      },
      function() { // 03:    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
        if (this.helpers["is_first_iteration_for_2"] === true) {
          this.locals["j"] = this.locals["i"];
          this.helpers["is_first_iteration_for_2"] = false;
        } else {
          this.locals["j"]--;
        }
        if (this.locals["j"] > 0 && less(this.params["a"][this.locals["j"]], this.params["a"][this.locals["j"] - 1])) {
          this.next = this.line[3];
        } else {
          this.next = this.line[1];
        }
        trigger("Sort(): 3");
      },
      function() { // 04:        exch(a, j, j - 1);
        this.exch(params["a"], this.locals["j"], this.locals["j"] - 1);
        this.next = this.line[2];
        trigger("Sort(): 4");
      }
      // 05:    }
      // 06:}
    ]

    this.next = this.line[0];
  }
}

class Less {
  constructor(v, w) {
    console.log("Invoke: less");
    this.params = {
      "v": v,
      "w": w
    };
    this.locals = {
    };
    this.helpers = {
    };

    this.result = undefined;

    this.line = [
      function() { // 01:return v.compareTo(w) < 0;
        this.result = v < w;
        this.next = undefined;
        callStack.pop();
        trigger("Less(): 1");
      }
    ]
        this.next = this.line[0];
  }
}

class Exch {
  constructor(a, i, j) {
    console.log("Invoke: exch");
    this.params = {
      "a": a,
      "i": i,
      "j": j
    };
    this.locals = {
      "t": undefined
    };
    this.helpers = {
    };
    this.result = undefined;

    this.line = [
      function() { // 01:Comparable t = a[i];
        this.locals["t"] = this.params["a"][this.params["i"]];
        this.next = this.line[1];
        trigger("Exch(): 1");
      },
      function() { // 02:a[i] = a[j];
        this.params["a"][this.params["i"]] = this.params["a"][this.params["j"]];
        this.next = this.line[2];
        trigger("Exch(): 2");
      },
      function() { // 03:a[j] = t;
        this.params["a"][this.params["j"]] = this.locals["t"];
        this.next = undefined;
        callStack.pop();
        trigger("Exch(): 3");
      }
    ]
    this.next = line[0];
  }
}
