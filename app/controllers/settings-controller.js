const redux = require('redux')

let initState = {
  words: [
    {
      word: 'Masina',
      translation: 'Car',
      gender: 'feminine',
      number: 'singular'
    }
  ]
}

function counter(state = 0, action) {
  switch (action.type) {
  case 'INITIALIZE':
    return initState;
  case 'CHANGE_WORD':
    state.words[0].word = action.data.word;
    return state;
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

let store = redux.createStore(counter)

module.exports = {
  store: store
}
