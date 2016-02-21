<comparator class="comparator" if="{this.active}">
  <div>
    <input type="text" name="name" value="{this.answer}" autocomplete="off"
      placeholder="{this.name}" onchange="{this.setAnswer}" />
    <label if={this.correct === true}>T</label>
    <label if={this.correct === false}>F</label>
  </div>

  <script>

    this.setAnswer = function(e) {
      this.answer = e.target.value;
      this.parent.setAnswer( this.id, this.answer );
    }

    this.on('update', function () {
    });
  </script>
</comparator>
