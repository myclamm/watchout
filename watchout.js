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

//Defining the player dot
// function is going to select svg
// append it a circle
// fill it with red

var makePlayer = function(){
  d3.select('svg')
  .append('circle')
  .attr('r',"10")
  .attr("class", "goodGuy")
  .attr('fill','##0000FF')
  .attr("cx", gameOptions.width/2)
  .attr("cy", gameOptions.height/2)
};

makePlayer();

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(".goodGuy").attr("transform", "translate(" + x + "," + y + ")");
}
d3.selectAll(".goodGuy").call(drag);

// var dragMove = function(d){
//   d3.select(this)
//     .style('top',((d3.event.sourceEvent.pageY)-this.offsetHeight/2)+"px")
//     .style('left',((d3.event.sourceEvent.pageX)-this.offsetHeight/2)+"px")
// }

// var drag = d3.behavior.drag().on("drag",dragMove);

// d3.select('svg').selectAll('.goodGuy')
//   .attr('id','draggable').call(drag);



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
  for(var i=0;i<gameOptions.nEnemies;i++){
    makeEnemy();
  }
};

createNEnemies();

var enemyLoc = [];

var randomizeLocs = function(){
  enemyLoc = [];
  for(var i=0;i<gameOptions.nEnemies;i++){
    enemyLoc.push({'cx': Math.floor(Math.random()*690)})
  }
  for(var i=0;i<gameOptions.nEnemies;i++){
    enemyLoc[i]['cy'] = Math.floor(Math.random()*440)
  }
}

var changeEnemyLoc = function() {
  randomizeLocs()
  console.log('hi')
  d3.select('svg').selectAll('.badGuys')
    .data(enemyLoc)
    .transition().duration(1000)
    .attr("cx",function(d){return d['cx']})
    .attr("cy",function(d){return d['cy']})
};

setInterval(changeEnemyLoc,1000)




