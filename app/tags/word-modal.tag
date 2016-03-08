require('../styles/tags/word-modal');

<word-modal id="word-modal" if="{this.state.active}" class="modal">

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
          <input id="word" type="text" value="{this.word.word}">
          <label class={'active': (this.word.word)} for="word">Word</label>
        </div>
        <div class="input-field col s6">
          <input id="translation" type="text" value="{this.word.translation}">
          <label class={'active': (this.word.translation)} for="translation">Translation</label>
        </div>
      </div>

      <div class="" if="{this.word.type === 'noun'}">
        <div class="row">
          <div class="input-field col s12 m4">
            <input id="definite" type="text" value="{this.word.definite.word}">
            <label class={'active': (this.word.definite.word)} for="definite">Definite Article</label>
          </div>
          <div class="input-field col s12 m4">
            <input id="plural" type="text" value="{this.word.indefinite.plural}">
            <label class={'active': (this.word.indefinite.plural)} for="plural">Plural</label>
          </div>
          <div class="input-field col s12 m4">
            <input id="definite_plural" type="text" value="{this.word.definite.plural}">
            <label class={'active': (this.word.definite.plural)} for="definite_plural">Definite Plural</label>
          </div>
        </div>

      </div>




    </form>
  </div>
  <div class="modal-footer">
    <a href="#!" class=" modal-action modal-close waves-effect waves-default btn-flat">Abort</a>
    <a href="#!" class=" modal-action modal-close waves-effect waves-default btn-flat">Save</a>
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
    this.on('update', function() {
      if (!this.opts.state) return false;

      this.state = this.opts.state;
      this.word = this.state.word || {};
      console.log(this.state);
    });

    this.on('updated', function() {
      console.log(this);
      if (this.state && this.state.active)
        $('#word-modal').openModal();
    });
  </script>

</word-modal>
