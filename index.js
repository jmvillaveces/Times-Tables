var d3 = require('d3');
var _ = require('underscore');

var r = 250, n = 200;

var svg = d3.select("body").append("svg")
    .attr("width", 900)
    .attr("height", 900)
  .append("g")
    .attr("transform", "translate(500,500)");

var nodes = _.map(_.range(0, n), function(d){
    
    return {
       x: Math.cos(d * 2 * Math.PI/n) * r, 
       y: Math.sin(d * 2 * Math.PI/n) * r, 
       id: d
   }; 
});

console.log(nodes);

var circle = svg.selectAll("circle")
    .data(nodes)
  .enter().append("circle")
    .attr("cx", function(d){ return d.x; })
    .attr("cy", function(d){ return d.y; })
    .attr("id", function(d){ return d.id})
    .attr("r", 1);


function getLinks(i){

    
    
}