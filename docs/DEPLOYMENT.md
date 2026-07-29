# How to: Cloudflare Pages에 배포

이 문서는 GitHub의 `main` 브랜치를 Cloudflare Pages에 연결해 정적 사이트를 배포하고, 배포 오류를 확인하는 절차를 설명합니다.

## 배포 계약

호스팅 제공자와 관계없이 다음 조건을 맞추면 배포할 수 있습니다.

| 항목 | 값 |
|---|---|
| 프로젝트 루트 | 저장소 루트 |
| 프로덕션 브랜치 | `main` |
| 설치 | `npm ci` |
| 빌드 명령 | `npm run build` |
| 출력 디렉터리 | `dist` |
| 권장 Node.js | 22.16.0 |
| 서버/API | 없음 |

현재 저장소에는 Cloudflare 전용 설정 파일이 없습니다. 프로젝트 이름, 빌드 설정, 사용자 도메인과 DNS는 Cloudflare 대시보드에서 관리합니다.

## 최초 연결

1. Cloudflare Dashboard에서 Workers & Pages로 이동합니다.
2. Pages 애플리케이션을 만들고 GitHub 저장소 `bonjin-app/portfolio`를 연결합니다.
3. 프로덕션 브랜치를 `main`으로 설정합니다.
4. 빌드 설정을 입력합니다.

   ```text
   Build command: npm run build
   Build output directory: dist
   Root directory: (비워 둠, 저장소 루트 사용)
   ```

5. 빌드 환경의 `NODE_VERSION`을 `22.16.0`으로 설정합니다. 현재 Cloudflare Pages v3 빌드 이미지의 기본값과 같지만, 명시적으로 고정하면 향후 기본값 변경의 영향을 줄일 수 있습니다.
6. 배포를 실행합니다.

Cloudflare 빌드 환경은 잠금 파일이 있으면 clean install을 수행합니다. `package.json`과 `package-lock.json`은 항상 함께 커밋해야 합니다.

## 로컬 사전 검증

푸시하기 전에 CI와 같은 설치·빌드 과정을 확인합니다.

```bash
npm ci
npm run build
npm run preview
```

확인 항목:

- 빌드가 오류 없이 끝납니다.
- `dist/index.html`이 생성됩니다.
- `dist/assets/`에 해시가 포함된 CSS와 JavaScript가 생성됩니다.
- 홈, 메뉴, 필터와 작업 상세 페이지가 동작합니다.
- 브라우저 콘솔에 오류가 없습니다.

## 사용자 도메인 연결

Cloudflare Pages 프로젝트의 Custom domains에서 `portfolio2021.uulab.co.kr`을 연결합니다.

도메인 연결 후 확인합니다.

```bash
curl -I https://portfolio2021.uulab.co.kr/
```

정상 상태에서는 `200` 응답을 받습니다. DNS나 인증서가 막 변경된 경우 반영까지 시간이 걸릴 수 있지만, 장시간 403 또는 인증서 오류가 지속되면 기다리기보다 아래 점검 항목을 확인합니다.

## 배포 후 검증

```bash
curl -I https://portfolio2021.uulab.co.kr/
curl -I https://portfolio2021.uulab.co.kr/favicon.ico
curl -I https://portfolio2021.uulab.co.kr/images/work/genius-choi.png
```

브라우저에서는 다음 경로를 확인합니다.

```text
https://portfolio2021.uulab.co.kr/#/
https://portfolio2021.uulab.co.kr/#/about
https://portfolio2021.uulab.co.kr/#/works
https://portfolio2021.uulab.co.kr/#/contact
```

해시 뒤의 경로는 서버로 전달되지 않으므로 별도 SPA fallback 규칙이 필요하지 않습니다.

## 문제 해결

### `npm ci`가 package-lock 불일치로 실패함

대표 오류:

```text
npm ci can only install packages when package.json and package-lock.json are in sync
Missing: ... from lock file
```

의존성을 변경한 환경에서 잠금 파일을 다시 생성하고 함께 커밋합니다.

```bash
npm install
npm ci --dry-run --ignore-scripts --no-audit --no-fund
npm run build
```

`package-lock.json`만 임의로 편집하지 않습니다.

### 배포는 성공했지만 이전 화면이 보임

1. Cloudflare Pages의 최신 프로덕션 배포 커밋을 확인합니다.
2. HTML이 참조하는 `/assets/index-*.js` 해시가 최신 빌드와 같은지 확인합니다.
3. 강력 새로고침 또는 시크릿 창에서 확인합니다.
4. Custom domain이 올바른 Pages 프로젝트를 가리키는지 확인합니다.

Vite는 CSS와 JavaScript 파일 이름에 콘텐츠 해시를 넣으므로 정상 배포라면 새 자산 URL이 생성됩니다.

### HTTP 403

403은 애플리케이션의 React 코드가 아니라 Cloudflare가 요청을 차단했다는 뜻입니다.

확인 순서:

1. Pages 프로덕션 배포 상태가 성공인지 확인합니다.
2. Custom domain의 상태가 Active인지 확인합니다.
3. DNS 레코드가 해당 Pages 프로젝트를 가리키는지 확인합니다.
4. Cloudflare Access, WAF 또는 보안 규칙이 공개 사이트를 차단하는지 확인합니다.
5. Pages 기본 도메인은 열리고 사용자 도메인만 막히는지 비교합니다.

### 작업 이미지가 깨짐

이미지는 `public/` 아래에 있어야 하고 코드에서는 `/images/...` 절대 경로로 참조해야 합니다. 파일 이름 대소문자는 배포 환경에서 구분됩니다.

### 내부 경로를 직접 열면 404

정상 공유 URL은 `/#/works/...` 형식입니다. `/works/...`처럼 해시 없이 요청하면 정적 호스트가 해당 파일을 찾으려 하므로 404가 발생할 수 있습니다.

## 롤백

Cloudflare Pages의 Deployments > All deployments에서 이전에 성공한 프로덕션 배포의 더보기 메뉴를 열고 **Rollback to this deployment**를 선택합니다. 롤백은 사이트 파일만 되돌리며 GitHub의 `main` 브랜치를 변경하지 않습니다. 이후 브랜치와 배포 상태가 다시 어긋나지 않도록 원인을 수정한 새 커밋을 배포합니다.

## Cloudflare 공식 문서

- [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Build image and Node.js version](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Debugging Pages](https://developers.cloudflare.com/pages/configuration/debugging-pages/)
- [Rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)

## 관련 문서

- [콘텐츠 수정 가이드](CONTENT_GUIDE.md)
- [아키텍처](ARCHITECTURE.md)
- [기술 레퍼런스](REFERENCE.md)
- [프로젝트 README](../README.md)
