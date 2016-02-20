const riot = require('riot');
const jquery = require('jquery');
const reducer = require('./reducer');

require('./tags/word.tag');

reducer.store.dispatch({type: 'INITIALIZE'});
reducer.store.dispatch({type: 'START_GAME'});

// You can subscribe to the updates manually, or use bindings to your view layer.
reducer.store.subscribe(() => {
  console.log(reducer.store.getState());
})

window.dis = function dis(word) {
  reducer.store.dispatch({type: 'CHANGE_WORD', data: { word: word }});
}

document.addEventListener('DOMContentLoaded', function () {
  riot.mount('game-handler', 'game-handler', { store: reducer.store });
  riot.mount('*');
});
