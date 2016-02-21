const riot = require('riot');
const jquery = require('jquery');
const reducer = require('./reducer');

require('./tags/game-handler.tag');
require('./tags/comparator-mode.tag');
require('./tags/comparator.tag');
require('./tags/word.tag');

reducer.store.dispatch({type: 'INITIALIZE'});
reducer.store.dispatch({type: 'START_GAME'});

// You can subscribe to the updates manually, or use bindings to your view layer.
reducer.store.subscribe(() => {
  console.log(reducer.store.getState());
})

window.dis = function dis(word) {
  reducer.store.dispatch({type: 'START_GAME'});
}

document.addEventListener('DOMContentLoaded', function () {
  riot.mount('*', { store: reducer.store });
});
