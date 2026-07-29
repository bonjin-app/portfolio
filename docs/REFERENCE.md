# 기술 레퍼런스

이 문서는 Bonjin Portfolio의 명령어, 라우트, 데이터 구조와 파일별 책임을 코드 기준으로 정리합니다.

## npm 명령어

| 명령 | 실행 내용 | 결과 |
|---|---|---|
| `npm run dev` | `vite` | 개발 서버와 HMR |
| `npm run build` | `vite build` | `dist/` 프로덕션 빌드 |
| `npm run preview` | `vite preview` | 로컬 프로덕션 프리뷰 |

현재 `lint`와 `test` 스크립트는 정의되어 있지 않습니다.

## 라우트

모든 내부 라우트는 URL 해시 뒤에 위치합니다.

| 해시 경로 | 화면 | 브라우저 제목 |
|---|---|---|
| `#/` | Home | `Bonjin Portfolio` |
| `#/about` | About | `About Me — Bonjin Portfolio` |
| `#/services` | Services | `Services — Bonjin Portfolio` |
| `#/works` | Works | `Works — Bonjin Portfolio` |
| `#/works/genius-choi` | Genius CHOI 상세 | `Genius CHOI — Bonjin Portfolio` |
| `#/works/jeju-living-dialect` | 제주 생활방언 상세 | `제주 생활방언 — Bonjin Portfolio` |
| `#/works/idol-manager` | 아이돌 관리자 상세 | `아이돌 관리자 — Bonjin Portfolio` |
| `#/works/jejutmalsami` | 제줏말싸미 상세 | `제줏말싸미 — Bonjin Portfolio` |
| `#/contact` | Contact | `Contact — Bonjin Portfolio` |
| 그 외 | 앱 내부 404 | `Page not found — Bonjin Portfolio` |

## 작업 데이터

`src/data.js`의 `works` 배열 항목 구조입니다.

| 필드 | 타입 | 필수 | 사용 위치 |
|---|---|---:|---|
| `slug` | `string` | 예 | 상세 URL과 React key |
| `name` | `string` | 예 | 카드, 상세 제목, 문서 제목 |
| `type` | `'Web' \| 'App'` | 예 | 필터와 상세 분류 |
| `description` | `string` | 예 | Project Overview |
| `image` | `string` | 예 | 카드와 상세 이미지 |
| `site` | `string \| null` | 예 | 외부 링크 또는 비공개 상태 |
| `siteLabel` | `string` | 예 | 상세 액션 문구 |
| `technologies` | `string[]` | 예 | What I did 목록 |

`site`이 문자열이면 새 탭 링크를 렌더링합니다. `null`이면 링크 대신 `project-status` 스타일의 상태 라벨을 렌더링합니다.

## 서비스 데이터

`src/data.js`의 `services` 배열 항목 구조입니다.

| 필드 | 타입 | 사용 위치 |
|---|---|---|
| `title` | `string` | 서비스 제목 |
| `description` | `string` | 서비스 설명 |
| `items` | `string[]` | 기능 목록 |
| `icon` | Lucide React 컴포넌트 | 서비스 아이콘 |

같은 배열이 Home과 Services 페이지에 사용됩니다.

## 기술 데이터

`skills`는 `[이름, 진행률]` 튜플 배열입니다.

```js
['Java & Spring', 100]
```

진행률은 숫자로 저장하며 About 페이지의 텍스트와 진행 막대 너비에 사용합니다.

## 주요 컴포넌트와 함수

| 이름 | 파일 | 책임 |
|---|---|---|
| `Router` | `src/App.jsx` | 해시 변경을 구독하고 현재 경로를 Context로 제공 |
| `Link` | `src/App.jsx` | 내부 해시 링크 생성 |
| `ScrollToTop` | `src/App.jsx` | 라우트 변경 시 상단 이동 |
| `DocumentTitle` | `src/App.jsx` | 라우트별 `document.title` 갱신 |
| `Header` | `src/App.jsx` | 반응형 메뉴, Escape 닫기, 현재 페이지 표시 |
| `Portfolio` | `src/App.jsx` | All/Web/App 필터와 작업 카드 목록 |
| `WorkDetailPage` | `src/App.jsx` | `slug`에 맞는 작업 상세 렌더링 |
| `ContactPage` | `src/App.jsx` | 폼 검증과 `mailto:` URL 생성 |
| `CurrentPage` | `src/App.jsx` | 현재 경로에 맞는 페이지 선택 |

## 메뉴 동작

- 버튼 `aria-controls`: `main-navbar`
- 버튼 `aria-expanded`: 메뉴 상태와 동기화
- 닫힌 메뉴: `aria-hidden=true`, `inert`, `pointer-events-none`
- 열린 메뉴에서 Escape 입력: 닫힘
- 라우트 변경: 자동 닫힘

## 작업 필터

- 기본값: `All`
- 선택 가능한 값: `All`, `Web`, `App`
- 선택 상태: 버튼의 `active` 클래스와 `aria-pressed`
- 데이터 비교: `work.type === filter`

필터 상태는 URL에 저장하지 않으므로 새로고침하거나 다른 페이지에서 돌아오면 `All`로 초기화됩니다.

## 문의 폼

필수 필드:

| 이름 | HTML 타입 |
|---|---|
| `name` | `text` |
| `email` | `email` |
| `subject` | `text` |
| `message` | `textarea` |

제출 시 브라우저 기본 검증을 통과한 값을 다음 형식으로 변환합니다.

```text
mailto:bonjin.app@gmail.com?subject=<encoded subject>&body=<encoded body>
```

사이트는 이메일 앱을 열기만 하며 직접 전송하거나 저장하지 않습니다.

## 스타일 기준

| 항목 | 값 |
|---|---|
| 기본 색상 | `#0d1e2d` |
| 제목 글꼴 | Raleway |
| 본문 글꼴 | Inconsolata |
| 컨테이너 최대 너비 | `1140px` |
| 섹션 세로 여백 | `7rem` |
| 햄버거 터치 영역 | `44 × 44px` |
| 필터 최소 터치 영역 | `44 × 44px` |
| 모바일 카드 기준 | `max-width: 639px` |

`prefers-reduced-motion: reduce`에서는 애니메이션과 transition 시간을 `0.01ms`로 줄입니다.

## 정적 자산

`public/` 아래 파일은 빌드 결과의 루트로 복사됩니다.

| 경로 | 용도 |
|---|---|
| `public/favicon.ico` | 브라우저 favicon |
| `public/images/apple-touch-icon.png` | Apple 홈 화면 아이콘 |
| `public/images/bonjin/linkedin_banner_image_1.png` | 소셜 공유 대표 이미지 |
| `public/images/work/` | 작업 카드와 상세 이미지 |
| `public/images/logo-*.png` | Technology used 로고 |
| `public/images/man-profile-512x512.png` | About와 인용 영역 프로필 |

코드에서는 `/images/...`처럼 `/public`을 제외한 절대 경로로 참조합니다.

## 메타데이터

`index.html`에 다음 전역 메타데이터가 있습니다.

- 기본 문서 제목과 설명
- theme color
- canonical URL
- Open Graph title, description, URL, locale, image
- Twitter Card title, description, image
- favicon과 Apple touch icon
- Google Fonts preconnect와 stylesheet

해시 라우트별 브라우저 제목은 `DocumentTitle`이 클라이언트에서 갱신하지만, 소셜 공유 메타데이터는 모든 경로가 동일한 전역 값을 사용합니다.

## 관련 문서

- [아키텍처](ARCHITECTURE.md)
- [콘텐츠 수정 가이드](CONTENT_GUIDE.md)
- [배포 가이드](DEPLOYMENT.md)
- [프로젝트 README](../README.md)
