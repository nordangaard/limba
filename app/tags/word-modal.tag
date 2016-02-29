<word-modal id="modal1" class="modal">

  <div class="modal-content default  white-text">
    <h4>Creion
      <span class="chip">
        Noun
      </span>
    </h4>
  </div>
  <div class="modal-content">
    <form class="">
      <div class="row">
        <div class="input-field col s6">
           <input id="first_name" type="text" class="validate">
           <label for="first_name">First Name</label>
         </div>
         <div class="input-field col s6">
           <input id="last_name" type="text" class="validate">
           <label for="last_name">Last Name</label>
         </div>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <a href="#!" class=" modal-action modal-close waves-effect waves-default btn-flat">Abort</a>
    <a href="#!" class=" modal-action modal-close waves-effect waves-default btn-flat">Save</a>
  </div>

  <style media="screen">
    word-modal {
      display: block;
    }

    .chip {
      float: right;
      margin-left: 5px;
    }
  </style>

  <script>
    console.log(this);
  </script>

</word-modal>
