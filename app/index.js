var riot = require('riot');
var jquery = require('jquery');
require('./tags/module-tag.tag');


document.addEventListener('DOMContentLoaded', function () {
  riot.mount('module-tag', 'module-tag', { '$': jquery });


});
