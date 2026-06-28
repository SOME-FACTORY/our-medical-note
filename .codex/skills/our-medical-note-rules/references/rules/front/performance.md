# 프론트엔드 성능 튜닝

초기 진입 JS 번들 100KB 이하 유지를 목표로 한다.

## 번들 예산

| 항목 | 목표 |
|------|------|
| 초기 JS (First Load JS) | **100KB 이하** |
| 페이지별 청크 | 50KB 이하 |
| 이미지 (LCP 대상) | WebP/AVIF, 200KB 이하 |

`next build` 출력에서 `First Load JS`가 100KB를 초과하면 즉시 최적화한다.

## dynamic import (코드 스플리팅)

무거운 라이브러리, 차트, 에디터, 모달은 첫 번들에 포함하지 않는다.

```typescript
// ✅ 차트 — 뷰포트 진입 또는 탭 전환 시 로드
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/src/widgets/chart/ui/chart"), {
  ssr: false,           // 브라우저 전용 라이브러리
  loading: () => <Skeleton />,
});

// ✅ 모달 — 버튼 클릭 시 로드
const Modal = dynamic(() => import("@/src/shared/ui/modal"));
```

### dynamic import 기준

- 초기 뷰포트에 보이지 않는 컴포넌트 (모달, 드로워, 탭 내부)
- 10KB 이상의 서드파티 의존성을 가진 컴포넌트
- `ssr: false`는 `window`, `document` 등 브라우저 API를 직접 쓸 때만

## 서버 컴포넌트 활용

서버 컴포넌트는 클라이언트 번들에 포함되지 않는다. 인터랙션 없는 UI는 서버 컴포넌트로 유지한다.

```
❌ 조회 전용 페이지에 'use client' → 전체가 번들에 포함
✅ 서버 컴포넌트 기본 → 인터랙션 부분만 'use client' 분리
```

## 이미지 최적화

```tsx
// ✅ next/image — WebP 자동 변환, lazy load, CLS 방지
import Image from "next/image";

<Image
  src="/hero.png"
  alt="hero"
  width={1200}
  height={630}
  priority   // LCP 대상 이미지만
/>
```

- `priority`는 LCP(Largest Contentful Paint) 대상 1개에만 사용
- 나머지는 기본 lazy load
- 외부 이미지는 `next.config.ts`의 `remotePatterns`에 도메인 등록

## 폰트 최적화

```typescript
// ✅ next/font — 폰트 다운로드 대기 없이 레이아웃 시프트 방지
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });
```

- `@import url(...)` 직접 사용 금지 — 렌더 블로킹 발생

## 서드파티 스크립트

```tsx
// ✅ next/script — 메인 번들과 분리 로드
import Script from "next/script";

<Script src="https://analytics.example.com/script.js" strategy="afterInteractive" />
```

| strategy | 설명 | 용도 |
|----------|------|------|
| `beforeInteractive` | HTML 파싱 전 | 필수 폴리필만 |
| `afterInteractive` | hydration 후 | GA, GTM |
| `lazyOnload` | idle 시 | 채팅 위젯, 비필수 |

## 번들 분석

```bash
ANALYZE=true next build
```

`@next/bundle-analyzer` 설치 후 사용. 큰 모듈 파악 → dynamic import 또는 경량 대체재 탐색.

## 체크리스트

- [ ] `next build` 후 First Load JS 100KB 이하 확인
- [ ] 차트/에디터/모달 dynamic import 적용
- [ ] LCP 이미지에 `priority` 속성
- [ ] 폰트 `next/font`로 로드
- [ ] 서드파티 스크립트 `next/script`로 분리
- [ ] 서버 컴포넌트로 전환 가능한 컴포넌트 검토

## 금지 사항

- ❌ 페이지 최상단에서 무거운 라이브러리 정적 import
- ❌ `<img>` 태그 직접 사용 (next/image 사용)
- ❌ `<link rel="stylesheet">` 또는 `@import`로 폰트 로드
- ❌ `strategy="beforeInteractive"`를 GA/GTM에 사용
