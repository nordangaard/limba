const redux = require('redux')
const GameCtrl = require('./controllers/game-controller')
const SettingsCtrl = require('./controllers/settings-controller')

function counter(state = {}, action) {

  if ( GameCtrl.belongs( action.type ) ) {
    return GameCtrl.reducer(state, action)
  }

  if ( SettingsCtrl.belongs( action.type ) ) {
    return SettingsCtrl.reducer(state, action)
  }

  return state
}


let store = (window.devToolsExtension ? window.devToolsExtension()(redux.createStore) : redux.createStore)(counter, {});


module.exports = {
  store: store
}
