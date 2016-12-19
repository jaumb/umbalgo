//(function() {

const loadFile = function(url, callback) {
  let client = new XMLHttpRequest();
  client.open('GET', url);
  client.onreadystatechange = callback(client.responseText);
  client.send();
}

const runner = new Runner();

loadFile('/js/algo/2.1-selection-sort.js',
         function(response) {
           var sort = new ForeignFunction(runner, response)
         });

loadFile('/js/algo/2.1-selection-less.js',
         function(response) {
           var less = new ForeignFunction(runner, response)
         });

loadFile('/js/algo/2.1-selection-exch.js',
         function(response) {
           var exch = new ForeignFunction(runner, response)
         });

const onInvokeSort = function() {
  let a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  runner.invoke("sort", function(result) { alert(result); }, a);
}

const onStep = function() {
  runner.next();
}


//})();
