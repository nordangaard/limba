require('../styles/tags/word-modal');

<word-edit-modal id="word-edit-modal" class="modal">

  <div class="modal-content default white-text">
    <h4>
      <strong>{ this.word.word }</strong>
      <span class="chip">
        { this.word.type }
      </span>
      <span class="chip" if="{this.word.gender}">
        { this.word.gender }
      </span>
    </h4>
  </div>
  <div class="modal-content">
    <form class="">

      <div class="row">
        <div class="input-field col s6">
          <input id="word" type="text" value="{this.word.word}" data-bind="word">
          <label class={'active': (this.word.word)} for="word">Word</label>
        </div>
        <div class="input-field col s6">
          <input id="translation" type="text" value="{this.word.translation}" data-bind="definite.translation">
          <label class={'active': (this.word.translation)} for="translation">Translation</label>
        </div>
      </div>

      <div class="" if="{this.word.type === 'noun'}">
        <div class="row">
          <div class="input-field col s12 m4">
            <input id="definite" type="text" value="{this.word.definite.word}" data-bind="definite.word">
            <label class={'active': (this.word.definite.word)} for="definite">Definite Article</label>
          </div>
          <div class="input-field col s12 m4">
            <input id="plural" type="text" value="{this.word.indefinite.plural}" data-bind="indefinite.plural">
            <label class={'active': (this.word.indefinite.plural)} for="plural">Plural</label>
          </div>
          <div class="input-field col s12 m4">
            <input id="definite_plural" type="text" value="{this.word.definite.plural}" data-bind="definite.plural">
            <label class={'active': (this.word.definite.plural)} for="definite_plural">Definite Plural</label>
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

    this.on('update', function() {
      if (!this.opts.state) return false;

      this.state = _.cloneDeep(this.opts.state);
      this.word = this.state.word || {};
    });

    this.on('mount', function() {
      this.$modal = $('#word-edit-modal');
      this.$inputs = $('#word-edit-modal input');
    });

    this.close = function () {
      this.dispatch({type: 'CLOSE_WORD_MODALS'});
    }

    this.save = function () {
      this.dispatch({type: 'UPDATE_WORD', word: this.word});
      this.parent.trigger('update', true);
    }

    this.on('updated', function() {
      if (this.state && this.state.active) {
        if ( !this.open ) {
          var self = this;

          this.$modal.openModal();

          this.$inputs.on('change', function () {
            var $this = $(this);
            var bind = $this.data('bind');
            var value = $this.val();

            if( bind && value ) {
              self.word = Object.assign({}, self.word, _.set(self.word, bind, value));
              console.log(self.word);
            }

          });

          this.open = true;
        }
      }  else if( this.state ) {
        this.$modal.closeModal();
        this.open = false;
      } else {
        this.open = false;
      }
    });
  </script>

</word-edit-modal>
