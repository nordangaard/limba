var riot = require('riot');
var jquery = require('jquery');
require('./tags/word.tag');


document.addEventListener('DOMContentLoaded', function () {
  riot.mount('word', 'word', { '$': jquery });


});
