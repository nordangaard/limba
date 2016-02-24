const _ = require('lodash');
const Controller = require('./controller');

const SettingsController = new Controller();

SettingsController.add('ADD_WORD', function (state, action) {

  if( !_.find(state.words, {word: action.word.word}) ) {
    action.word.active = true;
    action.word.translation = action.word.eng;
    action.word.type = 'noun';
    
    let words = state.words.concat([action.word]);

    state = Object.assign({}, state, {
      words: words
    });
  }

  return this.saveState(state);
});

module.exports = SettingsController;
