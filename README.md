# img making
#### 조장: 전영준

#### 조원:이동언, 최지호

## 1. 개 요
* * *
이번 프로젝트에서는 이미지 분류 인공지능 API를 활용해서
 이미지 분류 서비스를 제공해보고자 한다. 이미지에 관한 라벨을 추출하여
 새로운 이미지를 생성하는 웹 페이지를 개발해 보려고 한다.

## 2. 활용할 인공지능 API
* * *
 - cloud vision API
 - open api
## 3. 웹 페이지 구축
### 3.1.1 cloud vision API 호출
***
cloud vision API key를 받고 javascript코드에 입력하여 호출한다.
### 3.1.2 open API 호출
***
open API key를 받고 javascript코드에 입력하여 호출한다.
### 3.2 이미지 분석
***
![이미지 분석](https://github.com/yj021225/ai_api_project/blob/e31267535b850c0939e74a379c59464350cb300b/%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EB%B6%84%EC%84%9D.png)
cloud vision API는 다음과 같이 이미지를 분석해준다.
### 3.3 웹 페이지 디자인
 - 웹 페이지 디자인

![웹 페이지 디자인](https://github.com/yj021225/ai_api_project/blob/main/%EC%9B%B9%20%ED%8E%98%EC%9D%B4%EC%A7%80%20%EB%94%94%EC%9E%90%EC%9D%B8.png)

## 4.API 활용
* * *
### 4.1 API 활용 예시
 - cloud vision API
![API 활용 예시](https://github.com/yj021225/ai_api_project/blob/main/API%20%ED%99%9C%EC%9A%A9%EC%98%88%EC%8B%9C_2.png)
- open API
![API 활용 예시](https://github.com/yj021225/ai_api_project/blob/3d6e9af4b5d3dc701e0a54184db92b1582c9bff2/open%20API%ED%99%9C%EC%9A%A9%20%EC%98%88%EC%8B%9C.png)

## 5. 실행 결과
* * *
 이미지를 삽입하면 cloud vision API를 호출해 이미지를 분류하고 open API를 호출해 분류된 라벨을 통해 비슷한 이미지를 추상화로 생성한다.
 
 - 웹 페이지 실행 결과

![웹 페이지 실행 결과](https://github.com/yj021225/ai_api_project/blob/ac952b13ea5ea44dc136c7a180d0b9a3cb9cbc67/%EC%8B%A4%ED%96%89%20%ED%99%94%EB%A9%B4%20%EC%B5%9C%EC%A2%85.png)
