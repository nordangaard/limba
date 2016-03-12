require('../styles/tags/word-modal');
<word-add-modal id="word-add-modal" class="modal word-add-modal">

  <div class="modal-content default white-text">
    <h4>
      <strong>Add Word</strong>
    </h4>

  </div>
  <div class="">
    <ul class="tabs">
      <li class="tab col s4">
        <a id="#tab-noun" class="active" href="#" onclick="{this.tab('noun')}">Noun</a>
      </li>
      <li class="tab col s4">
        <a href="#" id="#tab-adjective" onclick="{this.tab('adjective')}">Adjective</a>
      </li>
      <li class="tab col s4">
        <a href="#" id="#tab-verb" onclick="{this.tab('verb')}">Verb</a>
      </li>
    </ul>
  </div>
  <div class="modal-content">
    <form class="">
      <div class="row">
        <div class="input-field input-no-margin col s8">
          <input id="search-query" type="text">
          <label for="search-query">Search</label>
        </div>
        <div class="input-field input-no-margin col s2">
          <select id="language-pick">
            <option value="romanian">Romanian</option>
            <option value="english" selected>English</option>
          </select>
        </div>
        <div class="col s2 center-align input-button">
          <a class="waves-effect waves-default btn-flat" onclick="{this.search}">Search</a>
        </div>

      </div>

      <div class="" if="{(this.type === 'noun' && this.word)}">
        <div class="row">
          <div class="input-field col s12 m6">
            <input id="definite" type="text" value="{this.word.indefinite.word}">
            <label class={'active': (this.word.indefinite.word)} for="definite">Word</label>
          </div>
          <div class="input-field col s12 m6">
            <input id="definite" type="text" value="{this.word.definite.word}">
            <label class={'active': (this.word.definite.word)} for="definite">Definite Article</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12 m6">
            <input id="plural" type="text" value="{this.word.indefinite.plural}">
            <label class={'active': (this.word.indefinite.plural)} for="plural">Plural</label>
          </div>
          <div class="input-field col s12 m6">
            <input id="definite_plural" type="text" value="{this.word.definite.plural}">
            <label class={'active': (this.word.definite.plural)} for="definite_plural">Definite Plural</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12 m6">
            <input id="translation" type="text" value="{this.word.translation}">
            <label class={'active': (this.word.translation)} for="translation">Translation</label>
          </div>
          <div class="input-field col s12 m6">
            <input id="gender" type="text" value="{this.word.gender}">
            <label class={'active': (this.word.gender)} for="gender">Gender</label>
          </div>
        </div>

      </div>

    </form>
  </div>
  <div class="modal-footer">
    <a onclick="{this.close}" href="#!" class=" modal-action modal-close waves-effect waves-default btn-flat">Abort</a>
    <a onclick="{this.save}" href="#!" class=" modal-action modal-close waves-effect waves-default btn-flat">Save</a>
  </div>


  <style media="screen">
    word-modal {
      display: block;
    }

    .chip {
      float: right;
      margin-left: 5px;
    }

  </style>

  <script>
    this.mixin('dispatch');

    this.open = false;
    this.word = { type: 'noun' };

    this.on('update', function() {
      if (!this.opts.state) return false;

      this.state = this.opts.state;
      this.word = this.state.word || this.word;
    });

    this.on('mount', function() {
      this.$modal = $('#word-add-modal');
      this.$tabs = $('ul.tabs');
      this.$search = $('#search-query');
      this.$select = $('#language-pick');

      this.type = 'noun';
    });

    this.tab = function ( tab, bool ) {
      return function ( tab ){
        this.type = tab;
      }.bind(this, tab)
    }

    this.search = function () {
      var query = this.$search.val();
      var language = this.$select.val();

      if( query && language ) {
        $.get('/query/' + language + '/' + query, function (res) {
          if( res ) {
            this.word = res;
            this.update();
          }
        }.bind(this));
      }
    }

    this.close = function () {
      this.dispatch({type: 'CLOSE_WORD_MODALS'});
    }

    this.save = function () {
      this.word.type = this.type;
      this.dispatch({type: 'SAVE_WORD', word: this.word});
    }

    this.on('updated', function() {
      if (this.state && this.state.active) {

        if ( !this.open ) {
          this.$modal.openModal();
          this.$tabs.tabs();

          this.open = true;
        }

      } else if( this.state ) {
        this.$modal.closeModal();
        this.open = false;
      } else {
        this.open = false;
      }
    });
  </script>

</word-add-modal>
