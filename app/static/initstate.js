const $ = require('jquery');
let words = [{
  type: 'noun',
  "word": "boală",
  "indefinite": {
    "word": "boală",
    "plural": "boli"
  },
  "definite": {
    "word": "boala",
    "plural": "bolile"
  },
  number: 'singular',
  "translation": "illness",
  "gender": "feminine",
  active: true
}];

$.get('/query/romanian/illness', function (res) {
  console.log(res);
  words.push(res);
});

module.exports = {
  words
}
