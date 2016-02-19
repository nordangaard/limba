const riot = require('riot')
const jquery = require('jquery')
const reducer = require('./reducer')

require('./tags/word.tag')


reducer.store.dispatch({type: 'INITIALIZE'})


// You can subscribe to the updates manually, or use bindings to your view layer.
reducer.store.subscribe(() =>
  console.log(reducer.store.getState())
)

window.dis = function dis(word) {
  reducer.store.dispatch({type: 'CHANGE_WORD', data: { word: word }})
}


document.addEventListener('DOMContentLoaded', function () {
  riot.mount('word', 'word', { '$': jquery, data: reducer.store.getState().words[0] })
  reducer.store.subscribe(() =>
    riot.update()
  )
})
