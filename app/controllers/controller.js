class Controller {
  constructor() {
  }

  const ACCEPTED_ACTIONS = [
    'INITIALIZE'
  ]

  belongs( type ) {
    return ( ACCEPTED_ACTIONS.indexOf( String(type) ) !== -1  )
  }
}

module.exports = Controller;
