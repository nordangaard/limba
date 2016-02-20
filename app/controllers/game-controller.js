var Controller = require('./controller');
var initState = require('../static/initstate');
var gameModes = require('../static/game-modes');


var GameController = new Controller();

GameController.add('INITIALIZE', function (state, action) {
  state = initState;
  state.gameModes = gameModes;
  return state;
})

GameController.add('START_GAME', function (state, action) {
  console.log('hej');
  return state;
})

module.exports = GameController;
