# 아키텍처

Bonjin Portfolio는 정적 호스팅만으로 동작하는 단일 페이지 React 애플리케이션입니다. 서버 API, 데이터베이스, 서버 측 렌더링 없이 `dist/` 파일만 배포합니다.

## 해결하려는 문제

포트폴리오는 배포와 유지보수가 단순해야 하고, 독립된 상세 페이지와 메뉴 동작은 유지해야 합니다. 일반 경로 기반 라우팅은 정적 호스팅에서 `/about`을 직접 열었을 때 서버의 fallback 설정이 없으면 404가 발생합니다.

이 프로젝트는 브라우저 해시를 라우트로 사용해 이 문제를 피합니다. 호스트는 항상 `/` 문서만 제공하고, React가 `#/about` 이후 값을 읽어 화면을 선택합니다.

## 전체 흐름

```text
index.html
    |
    v
src/main.jsx
    |
    v
src/App.jsx
    |
    +-- Router + CurrentPage ------> Home / About / Services / Works / Contact
    |
    +-- Header + Footer -----------> 공통 탐색과 연락 링크
    |
    +-- src/data.js ---------------> 작업, 서비스, 기술 데이터
    |
    +-- src/index.css -------------> Tailwind 테마와 컴포넌트 스타일
    |
    +-- public/ -------------------> 이미지, favicon, 소셜 미리보기
```

## 진입점과 렌더링

`index.html`은 `#root` 요소와 `/src/main.jsx` 모듈을 로드합니다. `src/main.jsx`는 React `StrictMode` 안에서 `App`을 렌더링하고 전역 스타일을 불러옵니다.

`App`은 다음 순서로 공통 UI를 조립합니다.

1. `Router`가 현재 해시 경로를 Context로 제공합니다.
2. `ScrollToTop`이 경로 변경 시 즉시 문서 상단으로 이동합니다.
3. `DocumentTitle`이 현재 페이지나 작업 이름으로 브라우저 제목을 갱신합니다.
4. `Header`, `CurrentPage`, `Footer`가 실제 화면을 구성합니다.

## 라우팅 설계

라우터는 외부 라이브러리 없이 `window.location.hash`와 `hashchange` 이벤트를 사용합니다.

```text
사용자 클릭
  -> href="#/works/genius-choi"
  -> hashchange
  -> Router 상태 갱신
  -> CurrentPage가 WorkDetailPage 선택
```

### 장점

- 모든 정적 호스팅에서 별도 rewrite 규칙 없이 동작합니다.
- 라우팅 의존성과 번들 크기가 작습니다.
- 프로젝트 상세 링크를 개별 URL로 공유할 수 있습니다.

### 트레이드오프

- URL에 `#`이 포함됩니다.
- 각 해시 페이지를 검색 엔진용 독립 HTML로 제공하지 않습니다.
- 중첩 라우트, 지연 로딩, 데이터 로더가 많아지면 직접 만든 라우터의 유지보수 비용이 커집니다.

페이지 수가 크게 늘거나 경로별 SEO가 필요해지면 React Router와 호스팅 fallback 규칙, 또는 정적 사이트 생성 도구를 검토해야 합니다.

## 데이터와 화면의 분리

`src/data.js`가 반복 콘텐츠의 단일 기준입니다.

- `works`: 작업 카드와 상세 페이지
- `services`: 홈과 Services 페이지
- `skills`: About 페이지의 기술 목록

`src/App.jsx`는 데이터를 읽어 화면을 구성합니다. 새 작업이나 서비스 문구는 JSX 구조를 수정하지 않고 데이터만 변경할 수 있습니다.

구체적인 필드 정의는 [기술 레퍼런스](REFERENCE.md), 수정 절차는 [콘텐츠 수정 가이드](CONTENT_GUIDE.md)를 참고하세요.

## 스타일 시스템

`src/index.css`는 Tailwind CSS 4를 불러오고 프로젝트 토큰과 재사용 스타일을 정의합니다.

```css
@theme {
  --color-ink: #0d1e2d;
  --font-heading: "Raleway", sans-serif;
  --font-mono: "Inconsolata", monospace;
}
```

- 제목: Raleway
- 본문: Inconsolata
- 기본 전경색: `#0d1e2d`
- 최대 콘텐츠 너비: `1140px`
- 모바일 프로젝트 카드: 이미지 위 그라디언트와 항상 보이는 이름
- 데스크톱 프로젝트 카드: hover 시 오버레이와 이름 표시

Tailwind 유틸리티는 JSX의 레이아웃에 사용하고, 반복되는 복합 상태와 pseudo-element는 `src/index.css`에 둡니다.

## 접근성과 상호작용

- 햄버거 버튼은 `aria-expanded`와 `aria-controls`를 제공합니다.
- 닫힌 메뉴는 `inert`와 `aria-hidden`으로 탐색 대상에서 제외됩니다.
- Escape 키로 열린 메뉴를 닫을 수 있습니다.
- 작업 필터는 `aria-pressed`로 선택 상태를 전달합니다.
- 주요 터치 컨트롤은 최소 `44 × 44px` 영역을 가집니다.
- `prefers-reduced-motion` 환경에서는 애니메이션과 전환 시간을 제거합니다.
- 잘못된 경로는 앱 내부 404 화면으로 연결됩니다.

## 문의 동작

Contact 폼은 제출 내용을 `mailto:` URL의 제목과 본문으로 변환한 뒤 이메일 앱을 엽니다. 정적 사이트만 유지할 수 있다는 장점이 있지만 다음 제약이 있습니다.

- 사용자의 기기에 이메일 앱이 설정되어 있어야 합니다.
- 사이트는 전송 성공 여부를 확인할 수 없습니다.
- 서버 측 스팸 방지, 저장, 알림 기능이 없습니다.

직접 전송이 필요해지면 정적 폼 제공자나 서버리스 함수를 별도 기능으로 도입해야 합니다.

## 관련 문서

- [콘텐츠 수정 가이드](CONTENT_GUIDE.md)
- [배포 가이드](DEPLOYMENT.md)
- [기술 레퍼런스](REFERENCE.md)
- [프로젝트 README](../README.md)
