require('../styles/tags/app-handler');
var $ = require('jquery');

<app-handler>

  <div class="materialize navigate-icon">
    <a href="#" class="waves-effect waves-light">
      <i class="small material-icons white-text" onClick="{this.switchPage('settings')}"
        if="{this.activePage('game')}">
        settings
      </i>
      <i class="small material-icons white-text" onClick="{this.switchPage('game')}"
        if="{this.activePage('settings')}">
        games
      </i>
    </a>

  </div>


  <game-handler class="page" state="{this.state}" if="{this.activePage('game')}">
  </game-handler>

  <settings-handler class="materialize page" state="{this.state}"
    if="{this.activePage('settings')}">
  </settings-handler>


  <script>

    this.activePage = function (page) {
      return (this.state.page.active === page);
    }

    this.switchPage = function (page) {
      return function (page) {
        this.opts.store.dispatch({type: 'SWITCH_PAGE', page: page});

        if(page === 'game') {
          this.opts.store.dispatch({type: 'START_GAME'});
        }

      }.bind(this, page);
    }

    this.state = this.opts.store.getState();

    this.opts.store.subscribe(function () {
      this.state = this.opts.store.getState();
      console.log(this.state);
      this.update();
    }.bind(this));
  </script>
</app-handler>
