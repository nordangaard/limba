<settings-handler>
  <div class="row">
    <div class="col s12 l6 push-l3">
      <word-list words="{this.state.words}"></word-list>
    </div>
  </div>

  <word-edit-modal state="{this.state.page.settings.wordEditModal}"></word-edit-modal>
  <word-add-modal state="{this.state.page.settings.wordAddModal}"></word-add-modal>

  <script>
    this.on('update', function() {
      this.state = this.opts.state;
    });

  </script>
</settings-handler>
