# **Employee Status**

### 📌 **프로젝트 개요**

**Employee Status**는 사내 근무 현황과 차량 운행 데이터를 체계적으로 관리할 수 있는 웹 애플리케이션입니다.

- **개발 기간**: 2024.09.23 ~ 2024.12.17
- **역할**:
  - 프론트엔드 및 백엔드 개발
  - 데이터 모델 설계
  - 배포 환경 구성
- **주요 성과**:
  - 업무 관리 효율성 증대
  - 차량 운행 통계 분석
  - 데이터 관리 자동화

### 🚀 **주요 기능**

1. 실시간 근무 현황 모니터링
   - 직원들의 당일 근무 상태를 한눈에 확인 가능
2. 차량 운행 및 정비 관리
   - 월별 차량 운행 통계와 정비 이력 관리
3. 업무 일정 및 보고 기능
   - 캘린더를 활용한 일정 관리와 업무 현황 보고
4. 데이터 통계 기능
   - 방문지, 직원별 필터링으로 근무 데이터 확인

---

### 🛠️ **사용 기술 스택**

- **Frontend**:
  - React (TypeScript 기반)
  - Material-UI (MUI)
- **Backend**:
  - Node.js + Express
  - MongoDB
- **배포 환경**:
  - PM2, HTTPS (Apache 연동)

---

### 🏗️ **개발 과정**

1. **프론트엔드 구현**
   - MUI를 활용한 반응형 테이블 설계
   - 일정, 근무 상태, 차량 로그를 한눈에 확인 가능한 레이아웃 설계
2. **백엔드 개발**
   - RESTful API 설계 및 구축
   - 근무 데이터와 차량 운행 기록 CRUD API 구현
   - MongoDB를 사용한 데이터 저장 및 검색 처리
3. **배포 환경 구축**
   - PM2와 Apache 연동으로 서버 환경 구성
   - HTTPS 보안 설정

---

### 📂 **프로젝트 구조**

```bash
employee-status/
├── client/              # React 프론트엔드
│   ├── src/
│   │   ├── components/  # 재사용 가능한 컴포넌트
│   │   ├── pages/       # 각 화면 페이지 컴포넌트
│   │   ├── api/         # 백엔드 API 연동 함수
│   │   └── hooks/       # 커스텀 훅
│   └── public/          # 정적 리소스 파일
├── server/              # Express 백엔드
│   ├── src/
│   │   ├── config/      # 데이터 베이스 설정
│   │   ├── routes/      # API 라우팅 정의
│   │   ├── models/      # MongoDB 스키마 정의
│   │   └── controllers/ # API 비즈니스 로직 처리
└── docs/                # 문서
    └── images/          # 스크린샷
```

---

### 🌟 **성과 및 개선점**

1. 업무 효율성 극대화
   - 화이트보드 기록 방식을 전산화해 업무 히스토리 추적성과 데이터 보관 효율성을 확보
2. 자동화로 인한 시간 절약
   - 차량 운행 데이터를 엑셀 파일로 자동 변환하여 데이터 처리 시간 단축

---

### 🔍 **설치 및 실행 방법**

1. **Repository 클론**

   ```bash
   bash
   코드 복사
   git clone https://github.com/hyomin1/employee-status.git
   cd employee-status

   ```

2. **의존성 설치**

   ```bash
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install
   ```

3. **환경 변수 설정**

   ```bash
   # .env 파일 생성
   MONGODB_URI=mongodb://localhost:27017/employee-status
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **프로젝트 실행**

   ```bash
   # Client
   npm start

   # Server
   npm start
   ```

---

### 📊 **화면 구성**

#### 1. 메뉴 선택 화면

![선택 화면](./docs/images/메뉴%20선택%20화면.png)

- 로그인 후 화면으로, 선택된 메뉴에 따라 페이지를 이동할 수 있다

#### 2. 근무 현황

![근무현황 화면](./docs/images/근무%20현황.png)

- 해당 날의 근무 현황을 조회, 수정, 삭제할 수 있다

#### 3. 근무 현황 입력 화면

![근무현황 입력화면](./docs/images/근무%20현황%20입력%20폼.png)

- 근무 현황에 나타날 정보를 입력할 수 있다
- 방문지별로 사업명을 매핑해 해당 방문지에 따른 사업명만 보이도록 한다

#### 4. 차량 운행 일지

![차량운행일지 화면](./docs/images/차량%20운행일지%20화면.png)

- 해당 달의 차량별 운행 정보를 조회 및 관리할 수 있다
- 해당 차량의 월별 운행 거리, 총 비용 계산

#### 5. 차량 운행 일지 입력 화면

![차량운행일지 입력화면](./docs/images/차량%20운행%20입력%20화면.png)

- 차량별 운행 정보를 입력할 수 있다

#### 6. 차량 정비 내역 화면

![차량 점검 내역 화면](./docs/images/차량%20점검%20화면.png)

- 차량별 정비 내역을 조회할 수 있다
- 해당 차량의 정비 내역 건 수를 보여주며 점검 유형별 가장 최신 점검 내역에 다음 점검(km)를 강조 하여 다음 점검을 빠르게 확인할 수 있다

#### 6. 일일 업무현황 화면

![일일업무현황 화면](./docs/images/일일%20업무%20현황%20화면.png)

- 일일 업무 현황을 작성하고 조회, 수정할 수 있다
- 파트별로 셀을 묶어 쉽게 확인할 수 있디

#### 7. 일일 업무현황 입력 화면

![일일업무현황 입력](./docs/images/일일%20업무%20현황%20입력%20화면.png)

- 기존 한글 파일로 사용하던 양식과 똑같이 만들어 일일 업무 현황을 작성할 수 있다

#### 8. 일정 화면

![일정 화면](./docs/images/일정%20화면.png)

- 사용자가 등록한 일정을 달력 형태로 확인할 수 있다
- 해당 일정을 클릭하면 일정의 상세 정보를 확인할 수 있고 수정이 가능하다

#### 9. 통계 화면

![통계 화면](./docs/images/통계%20페이지%20화면.png)

- 이름별, 방문지별 근무 현황을 선택한 기간 내에서 필터링하여 조회 가능
- 관리자 권한이 필요하다

#### 10. 설정 화면

![설정 화면](./docs/images/관리자%20설정%20페이지%20화면.png)

- 전체 데이터를 관리하고, 컬럼 추가 및 설정 변경이 가능하다
- 관리자 권한이 필요하다

#### 11. 유저 관리 화면

![관리 화면](./docs/images/관리%20화면.png)

- 최초 회원가입 한 계정의 로그인 승인 요청을 관리하고 계정의 권한을 설정할 수 있다
- 관리자 권한이 필요하다

```

```
