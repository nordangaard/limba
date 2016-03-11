<game-handler>
  <div if={!this.state.game.error}>
    <comparator-mode if={ this.mode('comparator') } game={this.state.game}>
    </comparator-mode>
  </div>

  <div class="error-message" if={this.state.game.error}>{this.state.game.error}</div>


  <script>

    this.mixin('dispatch');

    this.on('update', function() {
      this.state = this.opts.state;
    });

    this.mode = function ( mode ) {
      return ( this.state.game.mode.type === mode )
    }

    this.checkAnswer = function () {
      this.dispatch({type: 'CHECK_ANSWER'});
    }.bind(this);

    this.setAnswer = function ( id, answer ) {
      this.dispatch({type: 'SET_ANSWER', id: id, answer: answer });
    }.bind(this);

  </script>
</game-handler>
