<module-tag class="module">
  <word data="{this.state.words}"></word>

  <script>
    var state = this.opts.store.getState();
    var words = state.words;

    console.log(this.state);

    this.opts.store.subscribe(function () {
      this.update();
    }.bind(this));
  </script>
</module-tag>
