const Controller = require('./controller');
const md5 = require('blueimp-md5');

const SettingsController = new Controller();


SettingsController.add('ADD_WORD', function (state, action) {

  state.page.settings = Object.assign({}, state.page.settings, {
      'wordAddModal': {
        active: true
      }
    });

  return this.saveState(state);
});

SettingsController.add('SAVE_WORD', function (state, action) {

  action.word.id = md5(action.word.translation);

  if( !_.find(state.words, {id: action.word.id}) && action.word.word ) {
    action.word.active = true;

    let words = state.words.concat([action.word]);

    state = Object.assign({}, state, {
      words: words
    });
  }

  state = this.dispatch(state, {type: 'CLOSE_WORD_MODALS'});
  return this.saveState(state);
});

SettingsController.add('EDIT_WORD', function (state, action) {

  state.page.settings = Object.assign({}, state.page.settings, {
      'wordEditModal': {
        active: true,
        word: action.word
      }
    });

  return this.saveState(state);
});

SettingsController.add('CLOSE_WORD_MODALS', function (state, action) {


  state.page.settings = Object.assign({}, state.page.settings, {
      'wordAddModal': { active: false },
      'wordEditModal': { active: false }
    });

  return this.saveState(state);
});

SettingsController.add('TOGGLE_WORD', function (state, action) {

  var idx = _.findIndex(state.words, {'id': action.word.id});

  state.words = replaceInArray(idx, state.words, { active: action.toggle });

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
  console.log(obj);

  return [
    ...arr.slice(0, idx),
    obj,
    ...arr.slice(idx + 1)
  ];
}

module.exports = SettingsController;
