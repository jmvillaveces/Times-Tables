var d3 = require('d3');
var _ = require('underscore');

var r = 250,
    n = 200,
    col = '#ecf0f1',
    nodes = getNodes(n, r);

var svg = d3.select('#mandala').append('svg')
    .attr('class', 'canvas svg-content-responsive')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', [0, 0, 2*r, 2*r].join(' '))
  .append('g')
    .attr('transform', 'translate(' + r + ',' + r + ')');

function getNodes(n, r){

  return _.map(_.range(0, n), function(d){

      return {
         x: Math.cos(d * 2 * Math.PI/n) * r,
         y: Math.sin(d * 2 * Math.PI/n) * r,
         id: d
     };
  });
}

function update(i, n) {
    var links = getLinks(i, n),
        line = svg.selectAll('line')
              .data(links, function(d) { return d.id; });

    // ENTER
    // Create new elements as needed.
    line.enter().append('line')
        .attr('x1', function(d){ return d.source.x; })
        .attr('y1', function(d){ return d.source.y; })
        .attr('x2', function(d){ return d.target.x; })
        .attr('y2', function(d){ return d.target.y; })
        .attr('stroke-opacity', 0.4)
        .attr('stroke', col)
        .attr('stroke-width', 1.5);

    // EXIT
    // Remove old elements as needed.
    line.exit().remove();
}

function getLinks(i, n){

    var links = [];
    for(j=1; j<n; j++){

        var tIndex = Math.floor((j*i)%n);

        links.push({
            id: j + '_' + tIndex,
            source: nodes[j],
            target: nodes[tIndex],
            color: col
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

    update(i, n);
}, 50);

d3.select('#generate').on('click', generateClick)

function generateClick(){

  var n =  + document.getElementById('elements').value,
      f =  + document.getElementById('factor').value;

  if( _.isNaN(n) || _.isNaN(f)) return;

  clearInterval(interval);
  nodes = getNodes(n, r);
  update(f, n);
}

d3.selectAll('.lnk').on('click', function(){
  var id = this.getAttribute('id').split(','),
      n =  + id[0],
      f =  + id[1];

      if( _.isNaN(n) || _.isNaN(f)) return;

      clearInterval(interval);
      nodes = getNodes(n, r);
      update(f, n);

      document.getElementById('elements').value = n;
      document.getElementById('factor').value = f;
});
