let vm = new VirtualMachine();

vm.loadFunc("2.1-selection-exch.js");
vm.loadFunc("2.1-selection-less.js");
vm.loadFunc("2.1-selection-sort.js");

const onInvokeSort = function() {
  let a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  console.log("Input: " + a);
  vm.invokeFunc("sort", function(result) { console.log("Result: " + a); }, a);
};

const onStep = function() {
  vm.next();
};
