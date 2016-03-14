const ls = require('local-storage');

class SuperController {
  constructor() {
    this.methods = {};
  }
}

class Controller extends SuperController {
  constructor() {
    super();
  }

  saveState(state) {
    ls('limba-gamestate', JSON.stringify(state));
    return state;
  }

  getSavedState(state) {
    console.log(JSON.parse(ls('limba-gamestate')));
    return JSON.parse(ls('limba-gamestate'));
  }

  getTempState(state, scope) {
    return _.get(state, scope);
  }

  belongs(name) {
    return (this.methods.hasOwnProperty(name));
  }

  add() {
    const args = [].splice.call(arguments, 0);

    const name = args.splice(0,1)[0];
    const fn = args.splice(-1,1)[0];

    let scope = '', save = false;

    if(args.length > 0) {
      args.forEach((val) => {
        if(_.isBoolean(val)) save = val;
        if(_.isString(val)) scope = val;
      });
    }

    if (!_.isFunction(fn)) {
      console.error('Argument not function.');
      return;
    }

    if (this.belongs(name)) {
      console.error('Cannot redefine function, ' + name + ' already exists.');
      return;
    }

    this.methods[name] = {
      name,
      scope,
      save,
      fn
    };
  }

  reducer(state, action) {
    const method = this.methods[action.type];
    // let stateCopy = _.cloneDeep(state);

    // let tempState = method.scope ? this.getTempState(stateCopy, method.scope) : stateCopy;

    return method.fn.apply(this, [state, action]);
  }

  dispatch(state, action) {
    if( !this.belongs(action.type) ){
      console.error('Action type: ' + action.type + ' does not belong to controller.');
      return state;
    }
    return this.reducer(state, action);
  }

  replaceInArray(idx, arr, object){
    var obj = Object.assign({}, arr[idx], object);
    console.log(obj);

    return [
      ...arr.slice(0, idx),
      obj,
      ...arr.slice(idx + 1)
    ];
  }
}

module.exports = Controller;
