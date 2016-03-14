<input-tag>

  <input id="{'riot-' + this._riot_id}" type="text" value="{this.opts.word}" onchange="{this.change}">
  <label class={'active': (this.word)} for="{'riot-' + this._riot_id}">{this.opts.name}</label>

  <script>

    this.change = function (e) {
      this.opts.word = e.target.value;
    }

    this.on('update', function() {
    });
  </script>

</input-tag>
