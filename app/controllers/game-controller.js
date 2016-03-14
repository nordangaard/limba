const Controller = require('./controller');
const initState = require('../static/initstate');
const gameModes = require('../static/game-modes');


const GameController = new Controller();

GameController.add('INITIALIZE', function (state, action) {
  let savedState = this.getSavedState();

  if (savedState) {
    state = savedState;
    state.gameModes = Object.assign({}, gameModes, state.gameModes);
  } else {
    state = initState;
    state.gameModes = gameModes;
    state.page = { active: 'game' };
  }


  if( state.page.active === 'game')
    state = this.dispatch(state, {type: 'START_GAME'});

  return state;
});

GameController.add('START_GAME', function (state, action) {

  state.game = {};

  const mode = _.cloneDeep( filterAndPick( state.gameModes, { 'active': true } ) );
  if (mode) {
    // let activeWords = _.filter(state.words, { 'active': true });

    const time = new Date().getTime();
    let activeWords = _.cloneDeep( _.filter(state.words, (val) => {
      if(!val.active) return false;
      return (!val.nextAnswer || val.nextAnswer < time);
    }) );

    const words = [];

    _.forEach(mode.picks, (val) => {
      const pick = filterAndPick( activeWords, val );
      if( pick ) {
        words.push( pick );
      }
    });

    if ( words.length > 0) {

      state.game = Object.assign({}, state.game, {
        words: words,
        mode: mode
      });

      return state;
    }
  }

  state.game = {
    error: 'No words.'
  };
  return state;
});

GameController.add('SET_ANSWER', function (state, action) {
  const idx = action.idx;
  state.game.mode.comparators[idx] = Object.assign({},
      state.game.mode.comparators[idx],
      { answer: action.answer }
  );

  return state;
});

GameController.add('SET_WORD_LEARNING', function (state, action) {

  var idx = _.findIndex(state.words, {'id': action.word.id});

  state.words = this.replaceInArray(idx, state.words, action.word);

  return this.saveState(state);
});

GameController.add('CHECK_WIN', function (state, action) {

  if( _.every(action.comparators, {correct: true}) ) {
    state.game.words.forEach((val) => {
      val.nextAnswer = nextAnswer(val);
      state = this.dispatch(state, {type: 'SET_WORD_LEARNING', word: val});
    });

    state = this.dispatch(state, {type: 'START_GAME'});
  }

  return this.saveState(state);
});

function filterAndPick( arr, filter ) {
  const filtered = _.filter(arr, filter);
  const item = _.sample(filtered);
  return item;
}

function nextAnswer(word) {
  return (new Date().getTime() + 1800000); //
}

module.exports = GameController;
