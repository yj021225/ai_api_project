var VISION_API_KEY = "AIzaSyAJQTYa0dMdl3NiuyJwgJMbNPZ23S9GstI";
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY;

imagestring = null


function processFile (event) {
    var content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', '');
   
    ii = document.getElementById("imgframe")
    ii.src = content
  }

function uploadFiles(files){
    //var file = $('#fileform [name=fileField]')[0].files[0];
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = processFile

   
    reader.readAsDataURL(file);

    // console.log(reader)
  }

function Send() {
    var request = {
        requests: [{
          image: {
            content: imagestring
          },
          features: [{
            type: $('#fileform [name=type]').val(), // 'LABEL_DETECTION',
            maxResults: 200
          }]
        }]
      };

 
    $.ajax({
        type: "POST",
        url: CV_URL,
        headers : {
            "Accept" : "application/json",
        "Content-Type" :  "application/json" },
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8"
    }).done(displayJSON)
    .fail(function (error) {
        alert("!/error  js에서 에러발생: " + error);
    });
}

function displayJSON (data) {
    var contents = JSON.stringify(data, null, 4);
    $('#results').text(contents);

    // label detect인 경우만 해당됨

    dlabels = null
    labels = data.responses[0].labelAnnotations
    console.log(labels)
    labels.forEach(function(label){
        dlabels += label.description + "\n"
    })
    $('#resultr').text(dlabels);
  }
