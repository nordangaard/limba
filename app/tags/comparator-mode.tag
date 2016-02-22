var _ = require('lodash');
var $ = require('jquery');

<comparator-mode>
  <word type="main" data="{this.word}" ></word>
  <comparator each="{this.opts.game.mode.comparators}" data="{this}"></comparator>

  <div class="button-container">
    <span class="main-button" onclick="{this.checkAnswer}">Skip</span>
    <span class="main-button" onclick="{this.checkAnswer}">Skip</span>
  </div>



  <!-- <input type="button" name="name" onClick="{this.checkAnswer}"
    class="main-button" value="Skip">
  <input type="button" name="name" onClick="{this.checkAnswer}"
    class="main-button" value="Check"> -->

  <script>
    this.on('update', function() {
      if(_.isArray(this.opts.game.words) && this.opts.game.words.length > 0)
        this.word = this.opts.game.words[0];

      // console.log('THE GAME', this.opts.game);
      // console.log('THE WORD', this.word);

    });

    this.checkAnswer = function () {
      this.parent.checkAnswer();
    }

    this.setAnswer = function ( id, answer ) {
      this.parent.setAnswer( id, answer );
    }


      // if ( this.tags.comparator ) {
      //   var comparators = _.isArray(this.tags.comparator) ? this.tags.comparator :
      //     [this.tags.comparator];
      //
      //   _.forEach( comparators, function (val) {
      //     this.trigger('checkAnswer', {type: 'CHECK_ANSWER',
      //       comparator: val, word: this.word});
      //   }.bind(this));
      // }
  </script>
</comparator-mode>
