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

var color = d3.scale.linear()
    .domain([0, n])
    .range(["red", "white", "green"]);

function update(i) {
    var links = getLinks(i);
    
    var line = svg.selectAll("line").data(links, function(d) { console.log(d.id);return d.id; });
    
    // ENTER
    // Create new elements as needed.
    line.enter().append("line")
        .attr("x1", function(d){ return d.source.x; })
        .attr("y1", function(d){ return d.source.y; })
        .attr("x2", function(d){ return d.target.x; })
        .attr("y2", function(d){ return d.target.y; })
        .attr("stroke-opacity", 0.4)
        .attr("stroke", function(d){ return d.color; })
        .attr("stroke-width", 1);
    
    // EXIT
    // Remove old elements as needed.
    line.exit().remove();
}

function getLinks(i){

    var links = [];
    for(j=1; j<n; j++){
        
        var tIndex = Math.floor((j*i)%n);
        
        links.push({
            id: j + '_' + tIndex,
            source: nodes[j],
            target: nodes[tIndex],
            color: color(i)
        });
    }
    
    return links;
}

var i = 1;
var interval = setInterval(function(){
    i += 0.1;
    
    if(i>200){ 
        clearInterval(interval);
        return;
    }
    
    update(i);
}, 50);

//220 