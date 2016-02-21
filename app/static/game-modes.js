let modes = [];

class Mode {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.active = true;
    this.comparators = [];
    this.picks = [];

    modes.push(this);

    return this;
  }

  words( type ) {
    this.picks.push({ type });
    return this;
  }

  comparator( name, selector ) {
    this.comparators.push({
      id: this.comparators.length,
      name,
      selector,
      active: true,
      answer: '',
      correct: null
    });
    return this;
  }
}

var nouns = new Mode('nouns', 'comparator');
nouns.words('noun')
    .comparator('Articulation', 'definite.word')
    .comparator('Plural', 'indefinite.plural')
    .comparator('Plural articulation', 'definite.plural');

console.log(modes);

module.exports = modes;

// {
//   'nouns': {
//     type: 'comparator',
//     active: true,
//     picks: [
//       { type: 'noun' }
//     ],
//     comparators: [
//       {
//         id: 1,
//         name: 'Plural',
//         selector: 'indefinite.plural',
//         active: true,
//         answer: '',
//         correct: null
//       }
//     ]
//   }
// }
