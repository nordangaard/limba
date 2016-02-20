const redux = require('redux')
const GameCtrl = require('./controllers/game-controller')

function counter(state = {}, action) {

  if ( GameCtrl.belongs( action.type ) ) {
    return GameCtrl.reducer(state, action)
  }

  return state
}

let store = redux.createStore(counter)

module.exports = {
  store: store
}
