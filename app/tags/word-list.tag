var _ = require('lodash');

require('../styles/tags/word-list');

<word-list class="word-list">
  <div class="input-field">
    <input id="search" type="text" onkeyup="{this.search}">
    <label for="search">Search</label>
  </div>
  <div class="collection">
    <word-item each="{this.words}">
    </word-item>
  </div>

  <a class="add-word-btn btn-floating btn-large waves-effect waves-dark white">
    <i class="material-icons default-text">add</i>
  </a>

  <script>

    this.cachedWords = [];

    this.on('update', function () {
      if( this.cachedWords.length != this.opts.words.length ) {
        this.words = _.clone(this.opts.words);
        this.cachedWords = _.clone(this.opts.words);
        this.search();
      }
    });

    this.search = _.debounce(function (e) {
      var searchValue = e ? e.target.value : $('#search').value;

      if( _.isString(searchValue) ) {
        searchValue = searchValue.toLowerCase();

        this.words = _.filter(this.opts.words, function (val) {
          return (
            _.startsWith(val.translation, searchValue) ||
            _.startsWith(val.word, searchValue) ||
            _.startsWith(val.type, searchValue)
          );
        });
        this.update();
      }
    }, 300);

  </script>
</word-list>
