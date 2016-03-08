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

SettingsController.add('EDIT_WORD', function (state, action) {


  state.page.settings = Object.assign({}, state.page.settings, {
      'wordModal': {
        active: true,
        word: action.word
      }
    });

  return state;
});

SettingsController.add('TOGGLE_WORD', function (state, action) {

  var idx = _.findIndex(state.words, {'id': action.word.id});

  state.words = replaceInArray(idx, state.words, { active: false });

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

function replaceInArray(idx, arr, object){
  var obj = Object.assign({}, arr[idx], object);

  return [
    ...arr.slice(0, idx),
    obj,
    ...arr.slice(idx + 1)
  ];
}

module.exports = SettingsController;
