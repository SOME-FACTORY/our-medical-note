---
description: "개발 워크플로우: 커밋 규칙, 패키지 매니저, 코드 분할"
---

# Development Workflow

## 커밋 규칙

사용자가 명시적으로 요청할 때만 커밋한다. 자동 커밋, 제안 후 커밋 금지.

## 패키지 매니저

개발 전 `package.json`의 `packageManager` 필드 또는 lock 파일을 확인하고, 해당 패키지 매니저 명령어만 사용한다. 혼용 금지.

## 패키지 버전 고정

외부 패키지는 항상 정확한 버전으로 고정한다.

- `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`에 `^`, `~`, `>`, `>=`, `<`, `<=`, `*`, `latest` 같은 범위 지정자를 쓰지 않는다.
- 새 패키지를 설치할 때는 반드시 정확한 버전을 명시한다.
  - 예: `pnpm add react@19.2.4`
  - 예: `pnpm add -D eslint@9.39.4`
- 설치 후 `package.json`에 저장된 specifier가 정확한 버전인지 확인한다.
- 내부 워크스페이스 패키지는 `workspace:*`를 사용할 수 있다.
- 플랫폼별로 필요한 major가 다르면 하나로 억지 통일하지 말고 앱/패키지별로 정확한 버전을 분리해서 고정한다.
  - 예: web은 Tailwind CSS 4, Expo/NativeWind 앱은 Tailwind CSS 3을 각각 고정한다.

## 코드 분할

파일이 200줄을 넘으면 분할을 검토한다. 300줄 이상은 반드시 분할.

분할 기준:
- 컴포넌트: UI 로직과 비즈니스 로직 분리
- 훅: 단일 책임 (하나의 훅 = 하나의 관심사)
- 타입: 도메인별 `.types.ts` 파일로 분리

```
// ✅ 분할된 구조
feature/
├── ui/feature-form.tsx       (UI)
├── hooks/use-feature.ts      (로직)
├── model/feature.types.ts    (타입)
└── index.ts
```

## 테스트

순수 함수, 유틸리티, 커스텀 훅은 테스트 작성을 권장한다.
스타일 변경, 프로토타입, 사용자가 명시적으로 제외 요청 시 생략 가능.

## PRD 참고

요구사항이 불명확하면 구현 전에 사용자와 스펙을 먼저 정리한다.
