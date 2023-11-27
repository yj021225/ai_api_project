// Cloud Vision API 키를 설정합니다.
const visionKey = "";

// 이미지 파일을 읽습니다.

const image = "C:\dev\yjproject1\project1\apple.jpg"

// 이미지 라벨을 인식합니다.
const vision = new google.cloud.vision.v1.ImageAnnotatorClient();
const request = {
  image: {
    source: {
      gcsImageUri: image.webkitRelativePath,
    },
  },
};
const response = await vision.labelDetection(request);

// 이미지 라벨을 표시합니다.
const resultDiv = document.getElementById("result");
resultDiv.innerHTML = "";
for (const label of response.labelAnnotations) {
  resultDiv.innerHTML += `<li>${label.description}</li>`;
}
