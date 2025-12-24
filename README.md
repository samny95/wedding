# 모바일 청첩장 React.js 템플릿

결혼식 초대를 위한 청첩장 템플릿입니다.  

> **Original Repo**: [https://github.com/S-jooyoung/WEDDING_INVITATION](https://github.com/S-jooyoung/WEDDING_INVITATION)  
> 이 프로젝트는 위 repo를 기반으로 수정되었습니다.

## To-Do:
- RSVP 기능 추가

## 주요 변경사항

- 갤러리 모바일 레이아웃을 3열 그리드로 변경
- 갤러리 더보기/접기 버튼 추가
- 프리뷰 제목, 정보 추가
- 갤러리 네비게이션 버튼 모바일 화면에서 표시 개선
- 지도 이미지 클릭 시 확대 보기 모달 추가
- 마음 전하실 곳 아이콘 크기 조정

## 📚 내용 및 기능

- 결혼식 날짜, 위치, 인사말 출력
- 사진첩
- 축의금을 보내실 곳 (계좌번호 클립보드 복사 기능 지원)
<!-- - 카카오톡 공유 기능 및 링크 공유 기능 -->


## 🛠 커스터마이징

`./config.js`를 수정하여 사용합니다.

```javascript
export const WEDDING_INVITATION_URL = "http://localhost:8000/";
export const KAKAOTALK_API_TOKEN = "JavaScript 키 입력";
export const KAKAOTALK_SHARE_IMAGE =
  "https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_960_720.jpg";

export const WEDDING_DATE = "1970년 01월 01일, 목요일 오전 12시 00분";
export const WEDDING_LOCATION = "○○○웨딩, ○층 ○○홀";

export const GROOM_NAME = "○○○";
export const GROOM_ACCOUNT_NUMBER = "○○은행 ***-***-******";
export const GROOM_FATHER_NAME = "○○○";
export const GROOM_FATHER_ACCOUNT_NUMBER = "○○은행 ***-***-******";
export const GROOM_MOTHER_NAME = "○○○";
export const GROOM_MOTHER_ACCOUNT_NUMBER = "○○은행 ***-***-******";

export const BRIDE_NAME = "○○○";
export const BRIDE_ACCOUNT_NUMBER = "○○은행 ***-***-******";
export const BRIDE_FATHER_NAME = "○○○";
export const BRIDE_FATHER_ACCOUNT_NUMBER = "○○은행 ***-***-******";
export const BRIDE_MOTHER_NAME = "○○○";
export const BRIDE_MOTHER_ACCOUNT_NUMBER = "○○은행 ***-***-******";
```

`./src/components/location.jsx`를 수정하여 원하는 위치의 카카오 지도를 사용합니다.

```javascript
//  1. `https://map.kakao.com/`로 이동
//  2. 원하는 위치를 검색하여 `HTML 태그 복사`클릭
//  3. `소스 생성하기`클릭
//  4. `timestamp,key` 위의 코드에 알맞게 입력

const executeScript = () => {
  const scriptTag = document.createElement("script");
  const inlineScript = document.createTextNode(`new daum.roughmap.Lander({
    "timestamp" : "1652464367301",
    "key" : "2a8fe",
    "mapWidth" : "640",
    "mapHeight" : "360"
  }).render();`);
  scriptTag.appendChild(inlineScript);
  document.body.appendChild(scriptTag);
};
```
