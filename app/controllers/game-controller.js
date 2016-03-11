const Controller = require('./controller');
const initState = require('../static/initstate');
const gameModes = require('../static/game-modes');


const GameController = new Controller();

GameController.add('INITIALIZE', function (state, action) {
  let savedState = this.getSavedState();

  if (savedState) {
    state = savedState;

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

  if(state.game.error)
    state.game.error = null;

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
        words: _.clone(words),
        mode: _.clone(mode)
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
  const idx = action.id;
  state.game.mode.comparators[idx] = Object.assign({},
      state.game.mode.comparators[idx],
      { answer: action.answer }
  );

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

module.exports = GameController;
