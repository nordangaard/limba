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

  <a  onclick="{add}"
    class="add-word-btn btn-floating btn-large waves-effect waves-dark white">
    <i class="material-icons default-text">add</i>
  </a>

  <script>

    this.mixin('dispatch');
    this.cachedWords = [];
    this.$search = $('#search');

    this.on('update', function ( bool ) {

      if( this.cachedWords.length != this.opts.words.length || bool ) {
        this.words = _.clone(this.opts.words);
        this.cachedWords = _.clone(this.opts.words);
        this.search();
      }
    });

    this.on('mount', function () {
      this.$search = $('#search');
    });

    // this.on('forceUpdate', function () {
    //   console.log('force');
    //   this.words = _.clone(this.opts.words);
    //   this.cachedWords = _.clone(this.opts.words);
    //   this.search();
    //
    //   this.update();
    // });

    this.add = function () {
      this.dispatch({type: 'ADD_WORD'});
    }

    this.search = _.debounce(function () {
      var searchValue = this.$search.val();

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
    }, 400);

  </script>
</word-list>
