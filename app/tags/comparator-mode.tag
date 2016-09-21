var _ = require('lodash');
var $ = require('jquery');

<comparator-mode>
  <word type="main" data="{this.word}" ></word>
  <comparator each="{this.opts.game.mode.comparators}" data="{this}" word="{this.word}"></comparator>

  <span class="main-button" onclick="{this.skip}">Skip</span>


  <!-- <input type="button" name="name" onClick="{this.checkAnswer}"
    class="main-button" value="Skip">
  <input type="button" name="name" onClick="{this.checkAnswer}"
    class="main-button" value="Check"> -->

  <script>
    this.mixin('dispatch');
    this.mixin('checkAnswer');

    this.on('update', function() {
      if(this.opts.game &&
          _.isArray(this.opts.game.words) && this.opts.game.words.length > 0)
        this.word = this.opts.game.words[0];

      // console.log('THE GAME', this.opts.game);
      // console.log('THE WORD', this.word);

    });

    this.on('updated', function () {
      console.log($("input").is(":focus") );
      if( !$("input").is(":focus") )
        $('comparator-mode input').first().focus();
    });

    this.skip = function () {
      this.dispatch({type: 'START_GAME'})
    }

    this.on('checkAnswer', function ( obj ) {
      console.log(this.word);

      this.opts.game.mode.comparators.forEach(function (val) {
        if ( val.active && val.answer.length ) {
          val.correct = this.check( this.word, val.answer, val.selector);
          val.helper = _.get(this.word, val.selector);
        } else {
          val.correct = null;
        }
      }.bind(this));

      this.update();

      this.dispatch({type: 'CHECK_WIN', comparators: this.opts.game.mode.comparators});
    });

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
