# ✅ Nest-Board 게시판 API 서버 by 이도훈

> NestJS + PostgreSQL + JWT 인증을 기반으로 한 RESTful API 백엔드 프로젝트입니다.
> 사용자 인증, 게시글 작성/조회/삭제, 게시글 상태 수정(공개/비공개) 기능을 구현했습니다.
> NestJS 아키텍처의 모듈화 구조를 활용하여 유지보수성과 확장성을 고려한 설계를 목표로 했습니다.
>
> **진행 기간은 \[ 25.06.01 \~ 25.07.15 (약 1.5개월) ]** 입니다.

### ✅ 목차

1. [프로그램 주요 기능](#프로그램-주요-기능)  
   * [1. 사용자 관리](#1-사용자-관리)  
     * [1.1 회원가입 및 로그인](#11-회원가입-및-로그인)  
   * [2. 게시글 관리](#2-게시글-관리)  
     * [2.1 게시글 작성](#21-게시글-작성)  
     * [2.2 게시글 조회](#22-게시글-조회)  
     * [2.3 게시글 상태 변경](#23-게시글-상태-변경)  
     * [2.4 게시글 삭제](#24-게시글-삭제)  
2. [사용한 기술 스택](#사용한-기술-스택)  
3. [폴더 구조](#폴더-구조)  
4. [ERD 데이터 모델링](#erd-데이터-모델링)  
5. [설치 및 실행 방법](#설치-및-실행-방법)  
6. [API 명세](#api-명세)  
7. [추가 구현하고 싶은 기능들](#추가-구현하고-싶은-기능들)

## \[프로그램 주요 기능]

### 1. 사용자 관리

#### 1.1 회원가입 및 로그인

* `POST /auth/signup`: 아이디, 비밀번호로 회원가입
* `POST /auth/signin`: JWT 토큰을 발급받아 로그인
* `POST /auth/test`: JWT 인증 토큰이 유효한지 확인하는 테스트용 엔드포인트

### 2. 게시글 관리

#### 2.1 게시글 작성

* 로그인한 사용자만 게시글 작성 가능
* 게시글 제목, 본문을 입력하여 등록

#### 2.2 게시글 조회

* 전체 게시글 목록을 조회 가능 (로그인 필요)
* 게시글 ID를 통해 단일 게시글 상세 조회

#### 2.3 게시글 상태 변경

* 게시글 상태(`PUBLIC` / `PRIVATE`)를 수정 가능
* 작성자 본인만 수정 가능

#### 2.4 게시글 삭제

* 게시글 ID를 통해 삭제 요청
* 작성자 본인만 삭제 가능

## \[사용한 기술 스택]

* **백엔드**: NestJS (TypeScript)
* **데이터베이스**: PostgreSQL + TypeORM
* **인증/보안**: JWT (Passport, Strategy)

<div align="center">
  <img height="30" src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img height="30" src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" />
  <img height="30" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img height="30" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img height="30" src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <br/>
  <img height="30" src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
  <img height="30" src="https://img.shields.io/badge/GitHub-black?style=flat-square&logo=GitHub&logoColor=white"/>
</div>

## \[폴더 구조]

```bash
src/
├── auth/ # 사용자 인증 및 로그인 모듈
│ ├── dto/
│ │ └── auth-credential.dto.ts
│ ├── auth.controller.ts
│ ├── auth.module.ts
│ ├── auth.service.ts
│ ├── get-user.decorator.ts
│ ├── jwt.strategy.ts
│ └── user.entity.ts
│
├── boards/ # 게시글 관련 비즈니스 로직
│ ├── dto/
│ │ └── create-board.dto.ts
│ ├── pipes/
│ │ └── board-status-validation.pipe.ts
│ ├── board-status.enum.ts
│ ├── board.entity.ts
│ ├── boards.controller.ts
│ ├── boards.module.ts
│ └── boards.service.ts
│
├── configs/ # 설정 관련 모듈
│ └── typeorm.config.ts
│
├── app.module.ts # 루트 모듈
└── main.ts # 애플리케이션 진입점

.eslintrc.js / .prettierrc # 코드 스타일 설정
tsconfig.json # TypeScript 설정 파일
package.json # 프로젝트 의존성 및 명령어
```

## [ERD 데이터 모델링]

- **user_entity**: 사용자 정보를 저장.
- **board_entity**: 게시글에 대한 내용을 저장.

<img width="1024" height="300" alt="Image" src="https://github.com/user-attachments/assets/79ca324b-e00b-4dff-9ebf-6739604b6ee0" />

## [설치 및 실행 방법]

실행 환경
- Node.js 20.18.3
- posgreSQL 17.5

프로젝트 설치 및 실행
``` bash

git clone https://github.com/dohun03/nest-board.git

cd your-project # 프로그램이 실행될 디렉토리로 이동

npm install

npm run start:dev

```

## \[API 명세]

> 인증이 필요한 API는 JWT 토큰을 `Authorization: Bearer <토큰>` 헤더에 포함해야 합니다.

### 🔐 인증 API

| 메서드  | URL            | 설명                  | 인증 |
| ---- | -------------- | ------------------- | -- |
| POST | `/auth/signup` | 회원가입                | ❌  |
| POST | `/auth/signin` | 로그인 및 JWT 토큰 발급     | ❌  |
| POST | `/auth/test`   | JWT 토큰 인증 확인 (테스트용) | ✅  |

### 📝 게시글 API

| 메서드    | URL                  | 설명                        | 인증 |
| ------ | -------------------- | ------------------------- | -- |
| GET    | `/boards`            | 로그인한 사용자의 게시글 목록          | ✅  |
| GET    | `/boards/:id`        | 게시글 ID로 상세 조회             | ✅  |
| POST   | `/boards`            | 게시글 작성                    | ✅  |
| PATCH  | `/boards/:id/status` | 게시글 상태(PUBLIC/PRIVATE) 변경 | ✅  |
| DELETE | `/boards/:id`        | 게시글 삭제                    | ✅  |

## \[추가 구현하고 싶은 기능들]

> 추후 여유가 된다면 구현해보고 싶은 기능입니다.

- 프론트 페이지 구현
- 게시글에 댓글 추가 및 댓글 CRUD 기능

