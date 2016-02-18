<word class="word">
  <h2>{this.data.word}</h2>

  <div class="info">
    <span>{this.data.translation}</span>
    <span>{this.data.number}</span>
    <span>{this.data.gender}</span>
  </div>

  <script>
    var elem = this.opts.$(this.root);
    this.data = {
      word: 'Masina',
      translation: 'Car',
      gender: 'feminine',
      number: 'singular'
    };
    console.log('Hej');
    //elem.addClass('module');
  </script>
</word>
