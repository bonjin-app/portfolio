# Bonjin Portfolio

Bonjin Team의 웹·앱 작업을 소개하는 정적 포트폴리오입니다. 기존 포트폴리오의 여백, 타이포그래피, 색상과 이미지 중심 구성을 유지하면서 Vite, React, Tailwind CSS로 다시 구성했습니다.

- Live: [portfolio2021.uulab.co.kr](https://portfolio2021.uulab.co.kr/)
- Repository: [github.com/bonjin-app/portfolio](https://github.com/bonjin-app/portfolio)
- Production branch: `main`

## 주요 기능

- Web/App 작업 필터
- 프로젝트별 상세 페이지와 외부 아카이브 링크
- 반응형 햄버거 메뉴와 모바일 프로젝트 라벨
- About, Services, Works, Contact 페이지
- 브라우저 제목, favicon, Open Graph, Twitter Card 메타데이터
- 키보드 탐색, 명확한 포커스 표시, 모션 감소 설정 지원
- 별도 API나 데이터베이스가 필요 없는 완전한 정적 빌드

## 기술 구성

| 영역 | 기술 |
|---|---|
| UI | React 19 |
| 빌드 | Vite 8 |
| 스타일 | Tailwind CSS 4, 일반 CSS |
| 아이콘 | Lucide React |
| 라우팅 | 브라우저 해시 기반 정적 라우팅 |
| 배포 결과 | `dist/` 정적 파일 |

## 빠른 시작

요구 환경:

- Node.js `^20.19.0` 또는 `>=22.12.0`
- npm 10 이상

의존성을 잠금 파일 그대로 설치합니다.

```bash
npm ci
```

개발 서버를 실행합니다.

```bash
npm run dev
```

터미널에 표시된 로컬 주소를 열면 첫 화면을 확인할 수 있습니다.

## 프로덕션 빌드

```bash
npm run build
npm run preview
```

`npm run build`는 배포 가능한 파일을 `dist/`에 생성합니다. `npm run preview`는 해당 결과를 로컬에서 확인합니다.

## 프로젝트 구조

```text
.
├── index.html          # SEO, favicon, 소셜 공유 메타데이터
├── public/             # 배포 시 루트 경로로 복사되는 이미지와 아이콘
│   └── images/work/    # 포트폴리오 작업 이미지
├── src/
│   ├── App.jsx         # 라우팅, 페이지, 메뉴, 문의 동작
│   ├── data.js         # 작업, 서비스, 기술 데이터
│   ├── index.css       # Tailwind 테마와 디자인 시스템
│   └── main.jsx        # React 진입점
├── docs/               # 유지보수와 배포 문서
└── vite.config.js      # React/Tailwind Vite 플러그인
```

## 문서

| 문서 | 용도 |
|---|---|
| [아키텍처](docs/ARCHITECTURE.md) | 정적 라우팅과 파일 구조를 이렇게 구성한 이유 |
| [콘텐츠 수정 가이드](docs/CONTENT_GUIDE.md) | 프로젝트, 서비스, 이미지, 연락처를 수정하는 방법 |
| [배포 가이드](docs/DEPLOYMENT.md) | Cloudflare Pages 설정, 검증, 장애 해결 |
| [기술 레퍼런스](docs/REFERENCE.md) | 라우트, 데이터 구조, 명령어, 파일 역할 |

## 중요한 제약

- 내부 페이지는 `#/about` 같은 해시 URL을 사용합니다. 정적 호스팅에서 새로고침 오류 없이 동작시키기 위한 선택입니다.
- 문의 폼은 서버로 전송하지 않고 사용자의 이메일 앱을 엽니다.
- 호스팅 제공자 설정은 저장소에 포함되지 않습니다. 배포 대시보드 설정은 [배포 가이드](docs/DEPLOYMENT.md)를 기준으로 관리합니다.

## 변경 전 확인

콘텐츠만 수정한다면 먼저 [콘텐츠 수정 가이드](docs/CONTENT_GUIDE.md)를 확인하세요. 구조나 라우팅을 수정한다면 [아키텍처](docs/ARCHITECTURE.md)와 [기술 레퍼런스](docs/REFERENCE.md)를 함께 확인해야 합니다.
