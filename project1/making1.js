var OPENAI_API_KEY =
        "";

function Draw(){

    var sQuestion = imgMsg.value;
    var data = {
      prompt: sQuestion,
      n:2,
      size: "512x512"
  }  
  $.ajax({
    type: "POST",
    url: 'https://api.openai.com/v1/images/generations',
    headers:{
      "Accept" : "application/json",
      "Content-Type": "application/json", 
      "Authorization": "Bearer " +  OPENAI_API_KEY },
    data: JSON.stringify(data),
  
  }).done(function(response) {
  
        gimage.src = response.data[0].url
        gimage2.src = response.data[0].url
  
  }).fail(function(error) {
    alert("!/js/user.js에서 에러발생: " + error.statusText);
    console.log(error)
  });
  }
