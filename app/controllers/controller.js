const ls = require('local-storage');

class Controller {
  constructor() {
    this.methods = {};
  }

  saveState( state ) {
    ls('limba-gamestate', JSON.stringify(state));
    return state;
  }

  getSavedState( state ) {
    console.log(JSON.parse( ls('limba-gamestate') ));
    return JSON.parse( ls('limba-gamestate') );
  }

  belongs( name ) {
    return ( this.methods.hasOwnProperty( name ) );
  }

  add( name, func ) {

    if( !_.isFunction(func) ) {
      console.error('Argument not function.');
      return;
    }

    if( this.belongs( name ) ) {
      console.error('Cannot redefine function, ' + name + ' already exists.');
      return;
    }

    this.methods[name] = func;
  }

  reducer( state, action ) {
    return this.methods[action.type].apply(this, [state, action]);
  }

  dispatch( state, action ) {
    return this.reducer( state, action );
  }
}

module.exports = Controller;
