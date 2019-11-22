document.querySelector('input[type="submit"]').addEventListener('click', function(){
  $.get("http://localhost:8888/.netlify/functions/hello-world", {email:"jeff@mauriciorivera.co"} , function (res) {
    console.log(res);
  })
  .fail(function(err){
    console.log(err.responseText);
  })
});