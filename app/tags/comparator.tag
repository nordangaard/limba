require('../styles/tags/comparator');

<comparator class="comparator" if="{this.active}">
  <div class="input-container">
    <input type="game" name="name" value="{this.answer}" autocomplete="off"
      placeholder="{this.name}" onchange="{this.setAnswer}" onkeyup="{this.checkEnter}"
        class={'correct': (this.correct === true), 'incorrect': (this.correct === false)} />

    <label class="helper" show="{(this.correct !== null && this.helper)}">{this.helper}</label>
  </div>

  <script>
    this.mixin('dispatch');

    this.setAnswer = function(e) {
      this._item.answer = e.target.value;
    }

    this.checkEnter = function (e) {
      if( e.keyCode === 13 ){
        this.parent.trigger('checkAnswer');
      }
    }

    this.on('update', function () {
    });
  </script>
</comparator>
