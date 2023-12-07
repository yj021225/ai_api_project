var VISION_API_KEY = "";
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY;
var imagestring = "";

function processFile(event) {
    var content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', '');

    // 이미지를 미리보기로 표시
    var imageContainer = document.getElementById('image-container');
    imageContainer.style.backgroundImage = 'url(' + content + ')';
    imageContainer.style.backgroundPosition = 'center';
    imageContainer.style.backgroundSize = 'cover';
    imageContainer.style.backgroundRepeat = 'no-repeat';
}

// 파일 업로드 함수
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

// 이미지 분석 및 결과 표시 함수
function Send() {
    var detectionType = $('#fileform select[name=type]').val();
    console.log("Detection Type:", detectionType);

    var request = {
        requests: [{
            image: {
                content: imagestring
            },
            features: [{
                type: detectionType,
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

// displayJSON 함수 추가
// function displayJSON(data) {
//     var contents = JSON.stringify(data, null, 4);
//     $('#results').text(contents);

//     var dlabels = "";
//     var labels = data.responses[0].labelAnnotations;

//     console.log(labels);

//     labels.forEach(function (label) {
//         dlabels += label.description + "\n";
//     });
//     $('#resultr').text(dlabels);
// }