var _ = require('lodash');

class Controller {
  constructor() {
    this.methods = {};
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
