var riot = require('riot');
var jquery = require('jquery');
require('./tags/module-tag.tag');

riot.route.base('/');
riot.route('/', () => {
  console.log('I am root');
});

document.addEventListener('DOMContentLoaded', function () {
  riot.mount('module-tag', 'module-tag', { '$': jquery });


});

riot.route.start(true);
