var d3 = require('d3');
var _ = require('underscore');

var r = 250;

var svg = d3.select("body").append("svg")
    .attr("width", 900)
    .attr("height", 900)
  .append("g")
    .attr("transform", "translate(500,500)");

var nodes = _.map(d3.range(0, 360, 1.8), function(d, id){
   return {rotate: d, id: id}; 
});

var g = svg.selectAll("g")
    .data(nodes)
  .enter().append("g")
    .attr("transform", function(d) { return "rotate(" + d.rotate + ")"; });

g.append('circle')
    .attr("cx", r)
    .attr("r", 1);