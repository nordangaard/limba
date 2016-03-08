<settings-handler>
  <div class="row">
    <div class="col s12 l6 push-l3">
      <word-list words="{this.state.words}"></word-list>
    </div>
  </div>

  <word-modal state="{this.state.page.settings.wordModal}"></word-modal>

  <script>
    this.on('update', function() {
      this.state = this.opts.state;
    });

    console.log(this);

  </script>
</settings-handler>
