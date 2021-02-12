console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
  // establish click listener for readyToTransfer
  $(document).on('click', '.transferReady', readyToTransfer);
  $(document).on('click', '.delete', deleteKoala);
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    //console.log('in addButton on click');
    // get user input and put in an object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new object
    saveKoala(koalaToSend);
  });
}

// AJAX PUT REQUEST
function readyToTransfer() {
  //console.log('in readyToTransfer');
  let koalaId = $(this).data('id');
  let transferBoolean = this.value;

  $.ajax({
    url: `/koalas/ready/${koalaId}`,
    type: 'PUT',
    data: { transferBoolean },
  })
    .then((response) => {
      getKoalas();
    })
    .catch((err) => {
      console.log('Here is your error: ', err);
      alert('Koala not updated.');
    });
}
/* function readyToTransfer() {
  $(document).on('click', '#transferReady', function () {
    console.log('in readyToTransfer');
  }); */

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas/',
  })
    .then((res) => {
      //console.log('Got a response on getKoalas', res);
      postKoalas(res);
    })
    .catch((err) => {
      console.log(err);
    });
} // end getKoalas

function saveKoala(newKoala) {
  //console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas/',
    data: newKoala,
  })
    .then((res) => {
      //console.log(res);
      clearInputs();
      getKoalas();
    })
    .catch((err) => {
      console.log(err);
      alert('Koala not added');
    });
}

function postKoalas(koalaList) {
  //console.log('In koalaList');
  $('#viewKoalas').empty();

  /// conditional
  for (const koala of koalaList) {
    let transferBtn = `<button class="transferReady" data-id="${koala.id}" value="false">Don't Transfer</button>`;
    let transferStatus = 'Ready to Transfer';
    //console.log(koala);
    if (koala.ready_to_transfer === 'N') {
      transferBtn = `<button class="transferReady" data-id="${koala.id}" value="true">Transfer</button>`;
      transferStatus = 'Not Ready to Transfer';
    }

    $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.notes}</td>
        <td>${transferStatus}</td>
        <td>${transferBtn}</td>
        <td><button class="delete" data-id="${koala.id}">Delete</button></td>
      </tr>
      `);
  }
}

function deleteKoala() {
  //console.log('in delete');
  let koalaId = $(this).data('id');

  // send delete request to server
  $.ajax({
    type: 'DELETE',
    url: `/koalas/remove/${koalaId}`,
  })
    .then((response) => {
      getKoalas();
    })
    .catch((err) => {
      console.log('Failed to delete', err);
      alert('Could not delete Koala. Try again.');
    });
}

function clearInputs() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}
