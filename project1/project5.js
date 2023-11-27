var VISION_API_KEY = "AIzaSyAJQTYa0dMdl3NiuyJwgJMbNPZ23S9GstI";
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY;
var imagestring = null;

function processFile(event) {
    var content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', '');

    var imageContainer = document.getElementById('image-container');
    imageContainer.style.backgroundImage = 'url(' + content + ')';
    imageContainer.style.backgroundPosition = 'center';
    imageContainer.style.backgroundSize = 'cover';
    imageContainer.style.backgroundRepeat = 'no-repeat';
}

function uploadFiles(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = function (event) {
        processFile(event);
        // 이미지 업로드 시 select를 LABEL_DETECTION으로 변경
        document.getElementById('detectionType').value = 'LABEL_DETECTION';
    };
    reader.readAsDataURL(file);
}

function Send() {
    var request = {
        requests: [{
            image: {
                content: imagestring
            },
            features: [{
                type: $('#fileform [name=type]').val(),
                maxResults: 200
            }]
        }]
    };

    $.ajax({
        type: "POST",
        url: CV_URL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8"
    }).done(displayJSON)
        .fail(function (error) {
            alert("!/error  js에서 에러발생: " + error);
         });
}

function displayJSON(data) {
    var contents = JSON.stringify(data, null, 4);
    $('#results').text(contents);

    var dlabels = null;
    var labels = data.responses[0].labelAnnotations;
    console.log(labels);
    labels.forEach(function (label) {
        dlabels += label.description + "\n";
    });
    $('#resultr').text(dlabels);
}