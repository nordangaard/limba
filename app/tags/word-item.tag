<word-item class="collection-item avatar">
    <i class="material-icons default lighten-1 circle" style="font-weight: bold;">done_all</i>
    <span class="title">{this.word}</span>

    <span class="type badge hide-on-small-only">{this.type}</span>

    <a href="#!" class="secondary-content waves-effect last waves-default"><i class="material-icons">grade</i></a>
    <a href="#modal1" class="secondary-content waves-effect waves-default modal-trigger"><i class="material-icons">edit</i></a>
  <script>
    console.log(this);
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
