var BEVERAGES = [
  {"name":"tea","value":74},
  {"name":"whiskey","value":5},
  {"name":"beer","value":54},
  {"name":"gatorade","value":3},
  {"name":"coffee","value":86},
  {"name":"fanta","value":6},
  {"name":"wine","value":38}
];

////////// v code goes below   v  /////////////////////////////////////////////

var svg = d3.select('.bubble-chart')
  .append('svg')
  .attr('width', 800)
  .attr('height', 800);

var node = svg.selectAll('.node')
  .data(BEVERAGES, function(d) { return d.name; });

var enter = node.enter();
enter.append('circle')
  .attr('class', 'pretty-circle')
  .style('fill', 'lightgreen')
  .attr('r', function(d) { return d.value })
  .attr('cx', function(d,i) { return 100*i + 100})
  .attr('cy', 100);

////////// ^ code goes above  ^  /////////////////////////////////////////////

function animate(data) {

}

setTimeout(function() {
  BEVERAGES[0].value = 90;            // changes value of tea to 100
  animate(BEVERAGES);
}, 1000);

setTimeout(function() {
  BEVERAGES[4].value = 3;            // changes value of coffe to 3
  animate(BEVERAGES);
}, 1500);

setTimeout(function() {
  BEVERAGES.pop();                 // removes wine
  animate(BEVERAGES);
}, 2000);

setTimeout(function() {
  BEVERAGES.push({name: "kombucha", value: 50});     // adds kombucha in
  animate(BEVERAGES);
}, 2500);

setTimeout(function() {
  BEVERAGES.push({name: "wine", value: 60});    // adds wine back
  animate(BEVERAGES);
}, 3000);

setTimeout(function() {
  BEVERAGES[3].value = 40;             // changes value of gatorade to 50
  animate(BEVERAGES);
}, 3500);

setTimeout(function() {
  BEVERAGES[4].value = 10;             // coffee is now 10
  animate(BEVERAGES);
}, 3750);

setTimeout(function() {
  BEVERAGES[0].value = 15;             // tea is now 15
  animate(BEVERAGES);
}, 4000);
