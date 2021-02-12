console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
  // establish click listener for readyToTransfer
  $(document).on('click', '.transferReady', readyToTransfer);
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function readyToTransfer() {
  console.log('in readyToTransfer');
  let koalaId = $(this).data('id');

  $.ajax({
    url: `/koalas/ready/${koalaId}`,
    type: 'PUT',
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
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas/',
    data: newKoala,
  })
    .then((res) => {
      console.log(res);

      getKoalas();
    })
    .catch((err) => {
      console.log(err);
      alert('Koala not added');
    });
}

function postKoalas(koalaList) {
  console.log('In koalaList');
  $('#viewKoalas').empty();
  /// conditional
  for (const koala of koalaList) {
    console.log(koala);

    //conditional
    if (koala.ready_to_transfer === 'N') {
      $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td><button class="transferReady" data-id="${koala.id}">Transfer</button></td>
        <td>${koala.notes}</td>
      </tr>
    `);
    } else {
      $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td class="readyToGo">Ready</td>
        <td>${koala.notes}</td>
      </tr>
      `);
    }
  }
}
