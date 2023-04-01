# Cheerly-UP

<p align="center">
  <br>
  <img width="1484" alt="메인 화면" src="https://user-images.githubusercontent.com/62414262/227703902-0a6ba111-61df-439f-b27f-3a630e6cad53.png">
  <br>
</p>

## 프로젝트 소개

<p align="justify">
개발자 취준생들을 위한 커뮤니티 (취업 준비 & 건강한 루틴 만들기)
</p>

<p align="center">
GIF Images
</p>

<br>

## 기술 스택

| Backend |
| :--------: |
|<img src="https://img.shields.io/badge/NestJS-red?style=for-the-badge&logo=NestJS&logoColor=white"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/>  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT">  <img src="https://img.shields.io/badge/passport-black?style=for-the-badge&logo=passport" alt="Passport"> <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" alt="Socket.io"> <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"> <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS">|

<br>

## ERD
<p>
<img width="316" alt="image" src="https://user-images.githubusercontent.com/62414262/229266537-6ea96503-fe18-45a5-913c-3f2a163f85c4.png">
</p>

## 구현 기능

- ERD 설계
- 사용자 로그인 API 구현
    - `bcrypt` 암호화
    - `passport` 소셜 로그인
    - `jwt` 인증
- `socket.io` 를 이용한 채팅
- `EC2, Docker` 을 이용한 프로젝트 배포

<br>

## 회고
▷Nest.js express보다 많은 라이브러리를 지원하기 때문에 최대한 nest 공식문서를 보고 제공하는 라이브러리를 활용해 프로젝트를 진행하였다

▷Nest.js 는 기본적으로 module, controller, service의 구조를 가지기 때문에 MVC 패턴과 유사하다고 느껴졌다

▷**DTO**( Data Transfer Object)를 통해 회원가입과 로그인 등 사용자로부터 전달받는 데이터의 타입과 길이등을 정의하고 검증할 수 있다는 걸 알았다

▷**Guards** 를 통해 인증 기능을 구현할 수 있었고 로그인 된 유저만 가능한 기능에는 로그인 할 때 부여한 token을 검증하여 인증하는 방법을 사용하였다

▷**Repository Pattern** 을 통해 서비스와 데이터베이스 접근 코드를 분리하여 유지보수 효율성을 높였다

▷passport 사용시 token은 일반 로그인과 로그인 유무를 인증하는 함수를 재사용하기 위해 jwt 토큰으로 다시 발급하여 클라이언트에 전달하였다 

▷**jwt** 토큰 생성시 아이디와 닉네임 정보를 담아 전달해 단순히 보여주는 용도에 클라이언트가 서버에 보내는 불필요한 요청을 줄였다

▷AWS의 EC2 t2.micro를 통해 배포하려고 하였으나 nest의 메모리가 너무 커서 불가능 하다는 것을 알게 됨

<p align="justify">

</p>
