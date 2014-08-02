// start slingin' some d3 here.
//var badGuy = <ellipse ry="36" rx="45" id="svg_6" cy="134" cx="294" stroke-width="5" stroke="#000000" fill="none"/>;
var gameOptions = {
  'height':450,
  'width': 700,
  'nEnemies': 30,
  'padding': 20
};
var gameStats = {
  'Current score': 0,
  'High Score': 0
}

// var axes = {
//   'x': d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
//   'y': d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
// }

var gameBoard = d3.select('.scoreboard').append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height)

var makeEnemy = function(){
  d3.select('svg')
  .append('circle')
  .attr('r',"10")
  .attr("class", "badGuys")
  .attr('fill','#66ff00')
  .attr("cx",Math.floor(Math.random()*690))
  .attr("cy",Math.floor(Math.random()*440))
};


var createNEnemies= function() {
  for(var i=0;i<30;i++){
    makeEnemy();
  }
};

createNEnemies();

var changeEnemyLoc = function() {
  d3.select('svg').selectAll('.badGuys')
    .attr("cx",Math.floor(Math.random()*690))
    .attr("cy",Math.floor(Math.random()*440))
};





