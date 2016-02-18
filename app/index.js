const riot = require('riot')
const jquery = require('jquery')
const redux = require('redux')

require('./tags/word.tag')

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
store.dispatch({type: 'INITIALIZE'});

// You can subscribe to the updates manually, or use bindings to your view layer.
store.subscribe(() =>
  console.log(store.getState())
)

window.dis = function dis(word) {
  store.dispatch({type: 'CHANGE_WORD', data: { word: word }})
}


document.addEventListener('DOMContentLoaded', function () {
  riot.mount('word', 'word', { '$': jquery, data: store.getState().words[0] })
  store.subscribe(() =>
    riot.update()
  )



})
