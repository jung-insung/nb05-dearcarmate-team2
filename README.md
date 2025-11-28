# 🧑‍💻 팀 중급 프로젝트

---

## 👥 팀원 구성

| 이름       | 역할        | GitHub                                                       | 개인 개발 블로그                                                 |
| ---------- | ----------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| **김경연** | 백엔드 개발 | 🔗 [GitHub](개인 Github 링크)                                | -                                                                |
| **오창섭** | 백엔드 개발 | 🔗 [GitHub](개인 Github 링크)                                | -                                                                |
| **정인성** | 백엔드 개발 | 🔗 [GitHub](https://github.com/jung-insung?tab=repositories) | 🔗 [insungcoding.tistory.com](https://insungcoding.tistory.com/) |
| **최지혜** | 백엔드 개발 | 🔗 [GitHub](개인 Github 링크)                                | -                                                                |

---

## 📘 프로젝트 소개

**프로그래밍 교육 사이트의 백엔드 시스템 구축**

- **프로젝트 기간:** 2025.11.10 ~ 2025.12.02
- **주요 목표:** 사용자 관리 및 권한 기반의 백엔드 서비스 설계 및 구현
- ([팀 협업 문서 링크](https://www.notion.so/NB_05-2-Dear-Carmate-2ac3fdc694758080ae96d16cf56ed8aa?source=copy_link))

---

## 🧰 기술 스택

| 구분          | 사용 기술                     |
| ------------- | ----------------------------- |
| **Backend**   | Express.js, PrismaORM         |
| **Database**  | PostgreSQL                    |
| **공통 Tool** | Git & GitHub, Discord, Notion |
| **일정 관리** | GitHub Issues, Notion 타임라인 |
| **GIT BRANCH 전략** | GIT FLOW |

---

## 🔧 팀원별 구현 기능

### 🟦 김경연

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

---

### 🟩 오창섭

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

---

### 🟧 정인성

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)
- 인증 API 구현
  - 로그인
    - 이메일, 비밀번호를 입력하여 로그인
    - 인증이 되면 JWT 토큰 발급해서 액세스 토큰하고 리플래쉬 토큰 발급
  - 로그아웃
    - 엔드포인트 없이 프론트엔듣 코드에서 처리
- 유저 API 구현
  - 회원가입
    - 이름, 이메일, 사원번호, 연락처, 비밀번호, 기업명, 기업 인증코드를 입력하여 회원가입
    - 기업명과 기업 인증코드가 일치할 경우 회원가입에 성공하며, 로그인 시 유저가 속한 기업의 정보만 표시
  - 개인정보 수정
    - 수정 시도 시 비밀번호를 입력하여 2차 검증을 필요
    - 사원번호, 연락처, 비밀번호, 대표 이미지만 수정이 가능
- 계약서 API 구현
  - 등록
    - 거래 체결된 거래를 선택하고 계약서 파일을 추가 후 등록
  - 다운로드
    - 업로드된 계약서 일부 혹은 전체 다운로드
  - 수정
    - 등록된 계약서의 일부 혹은 전체를 삭제 및 추가 가능
  - 목록 조회
    - 등록된 계약서 목록을 확인
    - 계약서명, 계약체결일, 문서 수, 담당자, 차량번호 표시
    - 계약서명, 담당자로 검색 가능
    - 페이지네이션 가능
- 대시보드
  - 이 달의 매출, 지난 달의 매출, 계약 수, 성사된 계약 수, 차량타입별 계약수, 차량타입별 매출액을 표시
<p align="center">
  <img src="./public/image-3.png" style="width:49%; height:auto; object-fit:cover;"/>
  <img src="./public/image-4.png" style="width:49%; height:auto; object-fit:cover;"/>
</p>

<p align="center">
  <img src="./public/image-2.png" style="width:49%; height:auto; object-fit:cover;"/>
  <img src="./public/image.png" style="width:49%; height:auto; object-fit:cover;"/>
</p>

---

### 🟥 최지혜

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

---

## 📁 파일 구조

<최종 때 수정>

<pre>
src
 ┣ config
 ┃ ┗ db.ts
 ┣ controllers
 ┃ ┣ auth.controller.ts
 ┃ ┗ user.controller.ts
 ┣ middleware
 ┃ ┣ auth.middleware.ts
 ┃ ┗ error.middleware.ts
 ┣ models
 ┃ ┣ user.model.ts
 ┃ ┗ course.model.ts
 ┣ routes
 ┃ ┣ auth.routes.ts
 ┃ ┗ user.routes.ts
 ┣ services
 ┃ ┣ auth.service.ts
 ┃ ┗ user.service.ts
 ┣ utils
 ┃ ┣ jwt.ts
 ┃ ┣ constants.ts
 ┃ ┗ logger.ts
 ┣ app.ts
 ┗ server.ts
prisma
 ┣ schema.prisma
 ┗ seed.ts
.env
.gitignore
package.json
tsconfig.json
README.md
</pre>

---

## 🌐 구현 홈페이지

[https://www.codeit.kr/](https://www.codeit.kr/)

---

## 🪞 프로젝트 회고록

(제작한 발표자료 링크 혹은 첨부파일 첨부)
