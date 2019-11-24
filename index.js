document.querySelector('input[type="submit"]').addEventListener('click', function(e){

  e.preventDefault();

  var formData = {
    first_name: document.querySelector('input[name="vars[first_name]"]').value,
    last_name: document.querySelector('input[name="vars[last_name]"]').value,
    email: document.querySelector('#userEmail').value,
    showupdev: {
      recipient: document.querySelector('#recipient').value,
      showupText: document.querySelector('#showupTextarea').value
    }
  };

  $.post("http://localhost:8888/.netlify/functions/updateUser", JSON.stringify(formData) , function (res) {
    var response = res;
    console.log(response);
  })
  .fail(function(err){
    console.log(err.responseText);
  })
  
});