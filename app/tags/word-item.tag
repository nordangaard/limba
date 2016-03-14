<word-item class="collection-item avatar">
    <i class="material-icons default lighten-1 circle" style="font-weight: bold;">{this.progress()}</i>
    <span class="title">{this.word}</span>

    <span class="type badge hide-on-small-only">{this.type}</span>

    <a href="#!" class="secondary-content waves-effect last waves-default" onclick="{this.toggleActive}">
      <i class={'grey-text': (!this.active), 'material-icons': true}>grade</i>
    </a>
    <a href="#" class="secondary-content waves-effect waves-default" onclick="{this.edit}">
      <i class="material-icons">edit</i>
    </a>
  <script>

    this.mixin('dispatch');

    this.on('mount', function () {
      this.update();
    });

    this.progress = function () {
      return this._item.nextAnswer && this._item.nextAnswer > new Date().getTime() ? 'done_all' : 'done';
    }

    this.edit = function () {
      this.dispatch({type: 'EDIT_WORD', word: this._item});
      //this.parent.edit.apply(null, []);
    }

    this.toggleActive = function () {
      this.dispatch({type: 'TOGGLE_WORD', word: this._item, toggle: !this._item.active});
      this.parent.trigger('update', true);
    }

    this.on('update', function () {
    });


  </script>
  <style media="screen">
    word-item {
      display: block;
    }

    .badge.type {
      right: 100px !important;
    }

    .title {
      text-transform: uppercase;
    }
  </style>
</word-item>
