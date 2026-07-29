# How to: 포트폴리오 콘텐츠 수정

이 문서는 레이아웃을 바꾸지 않고 프로젝트, 서비스, 기술, 이미지와 연락처를 수정하는 절차를 설명합니다.

## 사전 준비

- 저장소 루트에서 작업합니다.
- Node.js와 npm이 설치되어 있어야 합니다.
- 변경 전 `npm ci`로 잠금 파일 기준 의존성을 설치합니다.

## 프로젝트 추가 또는 수정

프로젝트 데이터는 `src/data.js`의 `works` 배열에 있습니다.

```js
{
  slug: 'project-slug',
  name: 'Project Name',
  type: 'Web',
  description: '프로젝트 설명입니다.',
  image: '/images/work/project-name.webp',
  site: 'https://example.com/project',
  siteLabel: 'View Project',
  technologies: ['React', 'Vite'],
}
```

### 필드 작성 규칙

| 필드 | 규칙 |
|---|---|
| `slug` | URL에 사용합니다. 영문 소문자와 하이픈 조합을 권장합니다. 기존 값과 중복되면 안 됩니다. |
| `name` | 카드와 상세 페이지 제목입니다. |
| `type` | 필터가 인식하는 값은 `Web` 또는 `App`입니다. |
| `description` | 상세 페이지의 Project Overview에 표시합니다. |
| `image` | `public/`을 제외한 루트 절대 경로를 사용합니다. |
| `site` | 외부 링크입니다. 공개 링크가 없으면 `null`을 사용합니다. |
| `siteLabel` | 외부 버튼 또는 비공개 상태에 표시할 문구입니다. |
| `technologies` | 상세 페이지의 What I did 목록입니다. |

공개 링크가 없는 작업은 임의의 일반 홈페이지로 연결하지 않습니다.

```js
site: null,
siteLabel: 'Private Archive',
```

### 프로젝트 이미지 추가

1. 이미지를 `public/images/work/`에 추가합니다.
2. 파일 이름은 영문 소문자와 하이픈을 사용합니다.
3. `works` 데이터의 `image`를 `/images/work/파일명`으로 설정합니다.
4. 홈과 상세 페이지에서 이미지가 모두 표시되는지 확인합니다.

카드는 정사각형 영역에서 `object-fit: cover`를 사용하므로 중요한 내용은 이미지 중앙에 두는 편이 안전합니다. 상세 페이지는 원본 비율로 전체 이미지를 표시합니다.

## 서비스 수정

서비스 데이터는 `src/data.js`의 `services` 배열에 있습니다.

```js
{
  title: 'Service name',
  description: '짧은 설명',
  items: ['특징 1', '특징 2'],
  icon: ShieldCheck,
}
```

아이콘은 파일 상단에서 `lucide-react`로 가져옵니다. 같은 서비스 데이터가 홈과 Services 페이지에 함께 사용되므로 한 번만 수정하면 두 화면이 갱신됩니다.

## 기술 목록 수정

About 페이지의 기술 목록은 `src/data.js`의 `skills` 배열에 있습니다.

```js
export const skills = [
  ['Java & Spring', 100],
  ['Swift & iOS', 100],
];
```

각 항목은 `[표시 이름, 진행률]` 구조입니다. 진행률은 CSS 너비와 화면의 퍼센트 텍스트에 함께 사용됩니다.

## 소개 문구와 연락처 수정

페이지 소개 문구, 메뉴 연락 문구와 Contact 폼 동작은 `src/App.jsx`에 있습니다.

연락처를 변경할 때는 다음 값을 함께 검색하세요.

```bash
rg -n \"bonjin.app@gmail.com|5054 5654|gigas-blog\" src/App.jsx
```

확인할 위치:

- 상단 메뉴의 Hire Me
- Footer의 Email 링크
- Contact 폼의 `mailto:` 대상
- Contact 페이지의 Blog, Phone, Email

전화 링크는 국제번호를 포함한 `tel:` 형식을 유지합니다.

## SEO와 소셜 공유 정보 수정

사이트 제목, 설명, canonical URL, Open Graph와 Twitter Card는 `index.html`에 있습니다.

도메인이나 대표 이미지를 바꿀 때는 다음 항목을 함께 수정합니다.

- `meta[name="description"]`
- `meta[property="og:url"]`
- `meta[property="og:image"]`
- `meta[name="twitter:image"]`
- `link[rel="canonical"]`

Open Graph와 Twitter 이미지는 배포 도메인을 포함한 절대 URL을 사용합니다.

## 검증

콘텐츠 수정 후 다음 명령을 실행합니다.

```bash
npm run build
npm run preview
```

브라우저에서 다음을 확인합니다.

1. All, Web, App 필터에 올바른 카드가 표시됩니다.
2. 수정한 카드가 올바른 상세 페이지로 이동합니다.
3. 이미지가 홈과 상세 페이지에서 깨지지 않습니다.
4. 외부 링크가 의도한 프로젝트로 이동합니다.
5. 모바일 화면에서 카드 이름을 읽을 수 있습니다.
6. 콘솔에 오류가 없습니다.

## 문제 해결

### 카드가 필터에 나타나지 않음

`type`이 정확히 `Web` 또는 `App`인지 확인합니다. 다른 대소문자나 공백은 현재 필터와 일치하지 않습니다.

### 이미지가 표시되지 않음

- 파일이 `public/images/work/`에 있는지 확인합니다.
- 경로가 `/images/work/...`로 시작하는지 확인합니다.
- 파일 이름의 대소문자가 실제 파일과 같은지 확인합니다.

### 상세 페이지가 404로 표시됨

카드 링크는 `slug`로 생성됩니다. `slug`가 비어 있거나 중복되지 않았는지 확인합니다.

### 링크가 일반 홈페이지로 이동함

`site`에 프로젝트별 URL을 넣습니다. 특정 링크가 없다면 `null`로 설정하고 `siteLabel`에 상태를 표시합니다.

### 문의 버튼을 눌러도 전송되지 않음

Contact 폼은 사용자의 이메일 앱을 여는 기능입니다. 운영체제에 기본 이메일 앱이 설정되어 있어야 하며, 실제 전송은 사용자가 이메일 앱에서 완료합니다.

## 관련 문서

- [아키텍처](ARCHITECTURE.md)
- [배포 가이드](DEPLOYMENT.md)
- [기술 레퍼런스](REFERENCE.md)
- [프로젝트 README](../README.md)
