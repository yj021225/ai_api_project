var VISION_API_KEY = "";
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY;
var imagestring = "";

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
                maxResults: 5
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
    }).done(function (response) {
        // displayJSON 함수 호출 (가정: 이 함수가 정의되어 있다고 가정)
        displayJSON(response);

        // resultr 텍스트 영역의 내용을 가져와서 imgMsg 입력 필드에 설정
        var resultrText = $('#resultr').val();
        $('#imgMsg').val(resultrText + ' in abstract painting');

        // "btnSend" 버튼 클릭
        $('#btnSend').click();
    }).fail(function (error) {
        alert("!/error  js에서 에러발생: " + error);
    });
}