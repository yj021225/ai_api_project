var VISION_API_KEY = "AIzaSyAJQTYa0dMdl3NiuyJwgJMbNPZ23S9GstI";
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY;

imagestring = null

var submit = document.getElementById('submitButton');
submit.onclick = showImage;

function processFile (event) {
    var content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', '');
   
  }

function uploadFiles(files){
    //var file = $('#fileform [name=fileField]')[0].files[0];
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = processFile

   
    reader.readAsDataURL(file);

    // console.log(reader)
  }

function showImage() {
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

    var newImage = document.getElementById('image-show').lastElementChild;
    newImage.style.visibility = "visible";
    
    document.getElementById('image-upload').style.visibility = 'hidden';

    document.getElementById('fileName').textContent = null;
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

  function loadFile(input) {
    var file = input.files[0];

    var name = document.getElementById('fileName');
    name.textContent = file.name;

    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    newImage.src = URL.createObjectURL(file);   

    newImage.style.width = "70%";
    newImage.style.height = "70%";
    newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지 숨기기
    newImage.style.objectFit = "contain";

    var container = document.getElementById('image-show');
    container.appendChild(newImage);
};

function uploadImage() {
    var fileInput = document.getElementById('imageUpload');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var preview = document.getElementById('preview');
        var image = document.createElement('img');
        image.src = e.target.result;
        preview.innerHTML = '';
        preview.appendChild(image);
    };

    reader.readAsDataURL(file);
}