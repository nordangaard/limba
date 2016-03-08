window.riot = require('riot');
var $ = window.$ = window.jQuery = require('jquery');
const reducer = require('./reducer');

require('./styles/materialize/sass/materialize');
require('./styles/materialize/js/bin/materialize.js');
require('./styles/main');


riot.mixin('bubble', function () {
  const stashedArgs = [].splice.call(arguments,0);
  let args = stashedArgs.slice();

  const eventName = args.splice(0,1)[0];
  this.trigger(eventName, args);

  if(this.parent) this.parent.bubble.apply(this.parent, stashedArgs);
});

riot.mixin('dispatch', {
  'dispatch': function (action) {
    reducer.store.dispatch(action);
  }
});

require('./tags/app-handler.tag');

require('./tags/settings-handler.tag');
require('./tags/word-list.tag');
require('./tags/word-item.tag');
require('./tags/word-modal.tag');

require('./tags/game-handler.tag');
require('./tags/comparator-mode.tag');
require('./tags/comparator.tag');


require('./tags/word.tag');

reducer.store.dispatch({type: 'INITIALIZE'});

// You can subscribe to the updates manually, or use bindings to your view layer.
reducer.store.subscribe(() => {
  console.log(reducer.store.getState());
});

// ['car', 'day', 'teacher', 'book', 'country', 'house', 'door', 'icecream',
//   'apartment', 'flag', 'bed'].forEach((val) => {
//   $.get('/query/romanian/' + val, function (res) {
//     reducer.store.dispatch({type: 'ADD_WORD', word: res});
//   });
// });

// ['rest','ticket','dolls','mom','chess','scent','pencil','join','fireman','club','letter','pies'].forEach((val) => {
//   $.get('/query/romanian/' + val, function (res) {
//     reducer.store.dispatch({type: 'ADD_WORD', word: res});
//   });
// });


window.dis = function dis(word) {
  reducer.store.dispatch({type: 'START_GAME'});
}

document.addEventListener('DOMContentLoaded', function () {
  riot.mount('*', {store: reducer.store, dispatch: 'dispatch'});

  window.$(document).ready(function(){
   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
   window.$('.modal-trigger').leanModal();
 });
});
