# UI Package Rules

`packages/ui`는 앱과 도메인 로직이 아니라 재사용 가능한 UI 단위를 제공한다.

## 구조

```txt
src/
  components/
    (component-name)/
      index.ts
      *.tsx
      *.types.ts
  containers/
    (container-name)/
      index.ts
      *.tsx
  index.ts
styles/
  *.css
```

## components

`components`는 단일 UI 컴포넌트의 모양과 직접 상호작용만 담당한다.

- props로 받은 데이터만 렌더링한다.
- 앱 라우터, URL, 인증, API, Supabase, 의료 도메인 상태를 알지 않는다.
- Context Provider나 전역 상태 큐를 만들지 않는다.
- 드래그, dismiss, focus 같은 컴포넌트 자체의 UI 상호작용은 허용한다.
- 예: `ToastItem`, `Button`, `Input`, `Badge`, `Modal`.

## containers

`containers`는 여러 `components`를 조합해 UI 구조나 UI 상태 흐름을 만든다.

- 여러 컴포넌트를 배치하거나 묶는다.
- Context, Provider, viewport, stack, queue 같은 UI 상태 관리는 허용한다.
- 앱 도메인 결정은 하지 않는다.
- URL 파라미터, 인증 상태, 그룹 권한, 의료 기록 데이터는 앱에서 해석한 뒤 props로 넘긴다.
- 예: `ToastProvider`, `ToastOnMount`, `DialogProvider`.

## styles

공용 UI가 의존하는 CSS는 패키지 루트의 `styles/`에 둔다.

- Tailwind CSS v4 규칙에 맞춰 커스텀 글로벌 스타일은 `@layer base` 안에 작성한다.
- 앱은 필요한 스타일을 명시적으로 import한다.

## Import Boundary

앱에서는 공개 export만 사용한다.

```ts
import { ToastItem } from "@ours-medical-note/ui/components/toast";
import { ToastProvider } from "@ours-medical-note/ui/containers/toast";
import "@ours-medical-note/ui/styles/toast.css";
```

내부 파일 경로를 직접 import하지 않는다.
