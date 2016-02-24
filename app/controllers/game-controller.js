var _ = require('lodash');
var ls = require('local-storage');
var Controller = require('./controller');
var initState = require('../static/initstate');
var gameModes = require('../static/game-modes');


var GameController = new Controller();

GameController.add('INITIALIZE', function (state, action) {
  let savedState = ls('limba-gamestate');

  if (savedState) {
    console.log('savedState');
    state = JSON.parse( savedState );
  } else {
    state = initState;
    state.gameModes = gameModes;
  }

  return state;
})

GameController.add('START_GAME', function (state, action) {

  const mode = filterAndPick( state.gameModes, { 'active': true } );
  if (mode) {
    const activeWords = _.filter(state.words, { 'active': true });
    const words = [];

    _.forEach(mode.picks, (val) => {
      const pick = filterAndPick( activeWords, val );
      if( pick ) {
        pick.id = words.length + 1;
        words.push( pick );
      }
    });

    if ( words.length > 0) {

      state.game = Object.assign({}, state.game, {
        words: words,
        mode: mode
      });

      saveGameState(state);
      return state;
    }
  }

  state.game = {
    error: 'No words.'
  };
  return state;
});

GameController.add('SET_ANSWER', function (state, action) {
  const idx = action.id;
  state.game.mode.comparators[idx] = Object.assign({},
      state.game.mode.comparators[idx],
      { answer: action.answer }
  );

  saveGameState( state );
  return state;
});

GameController.add('CHECK_ANSWER', function (state, action) {
  console.log('Checking Answer', action);
  state.game.mode.comparators.forEach((val) => {
    console.log(val);
    let id = val.wordId || 1;

    if ( val.active && val.answer.length ) {
      val.correct = checkAnswer( _.find(state.game.words, {id: id}),
          val.answer, val.selector);
    } else {
      val.correct = null;
    }

  });
  return state;
});

function filterAndPick( arr, filter ) {
  const filtered = _.filter(arr, filter);
  const item = _.sample(filtered);
  return item;
}

function checkAnswer(word, answer, selector) {
  console.log( word, answer, _.get(word, selector) === answer );
  return ( _.get(word, selector) === answer );
}

function saveGameState( state ) {
  ls('limba-gamestate', JSON.stringify(state));
}

module.exports = GameController;
