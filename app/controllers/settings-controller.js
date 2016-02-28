const _ = require('lodash');
const Controller = require('./controller');
const md5 = require('blueimp-md5');

const SettingsController = new Controller();

SettingsController.add('ADD_WORD', function (state, action) {

  action.word.translation = action.word.eng;
  action.word.id = md5(action.word.translation);

  if( !_.find(state.words, {id: action.word.id}) && action.word.word ) {
    action.word.active = true;
    action.word.type = 'noun';

    let words = state.words.concat([action.word]);

    state = Object.assign({}, state, {
      words: words
    });
  }

  return this.saveState(state);
});

SettingsController.add('SWITCH_PAGE', function (state, action) {

  state = Object.assign({}, state, {
    page: {
      active: action.page,
      settings: {
      }
    }
  });

  return this.saveState(state);
});

module.exports = SettingsController;
