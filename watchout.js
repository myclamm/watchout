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
  var apple = [[400,200]]
  d3.select('svg').selectAll('.goodGuy')
  .data(apple)
  .enter()
  .append('circle')
  .attr('r',"10")
  .attr("class", "goodGuy")
  .attr('fill','##0000FF')
  .attr("cx", function(d){return d[0]})
  .attr("cy", function(d){return d[1]})
};

makePlayer();
//console.log(d3.select('googGuy').attr('cx'))
var drag = d3.behavior.drag()
    .on("drag", function(){
      var x = d3.event.x;
      var y = d3.event.y;
      if(x>gameOptions.width){
        x = gameOptions.width;
      }
      if(y>gameOptions.height){
        y = gameOptions.height;
      }
      if(y<0){
        y = 0
      }
      if(x<0){
        x=0
      }
      d3.select(this)
      .attr('cx',x)
      .attr('cy',y)
      //collisionChecker()
    });

d3.select(".goodGuy")

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
    enemyLoc.push({'cx': Math.floor(Math.random()*700)})
  }
  for(var i=0;i<gameOptions.nEnemies;i++){
    enemyLoc[i]['cy'] = Math.floor(Math.random()*450)
  }
}


var changeEnemyLoc = function() {
  randomizeLocs()
  d3.select('svg').selectAll('.badGuys')
    .data(enemyLoc)
    .transition().duration(1000)
    .attr("cx", function(d) {return d['cx']})
    .attr("cy", function(d) {return d['cy']})
};

setInterval(changeEnemyLoc,1000)
var highscore = 0;
var counter = 0;
var tempHigh = 0;
var collisionChecker = function(enemy){

  // var goodPosX = d3.select('.goodGuy').attr('cx');
  // var goodPosY = d3.select('.goodGuy').attr('cy');
  for (var i = 0; i < d3.selectAll('.badGuys').data(enemyLoc)[0].length; i++) {
    if((Math.abs(d3.selectAll('.badGuys').data(enemyLoc)[0][i].cx.animVal.value - d3.select('.goodGuy').attr('cx')) < 20) &&
       (Math.abs(d3.selectAll('.badGuys').data(enemyLoc)[0][i].cy.animVal.value - d3.select('.goodGuy').attr('cy')) < 20)){
        counter = 0;
    }
    if (tempHigh>=highscore) {
      highscore = tempHigh;
      tempHigh = 0;
      d3.select('.high').select('span').text(highscore);
    }
  }
};


d3.timer(collisionChecker);


var newHigh = [];

var scoreMaker = function() {

setInterval(function(){
  counter++
  d3.select('.current').select('span')
    .text(counter);
  if(counter>=highscore){
    tempHigh = counter;
    //newHigh.push(counter);
  }
  },200);
};

scoreMaker();
//make a function that sets score to 0, and then invokes setinterval to increase score indefinitely, and change highscore variable if score>high
//
//add funcationality to collisionchecker:
//  invoke the score function
