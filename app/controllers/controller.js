const _ = require('lodash');
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
    return ls('limba-gamestate');
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
}

module.exports = Controller;
