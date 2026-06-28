---
description: "에러 처리 패턴 - API 에러, Error Boundary, 사용자 피드백"
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Error Handling

## 기본 원칙

에러는 발생한 레이어에서 처리하거나, 처리할 수 없으면 위로 전파한다.
사용자에게는 항상 의미 있는 피드백을 제공한다.

## API 에러 처리

```typescript
// ✅ 응답 상태 체크 후 명확한 에러 throw
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}
```

catch절은 `unknown` 타입으로 받는다 (typescript-standards.md 참고).

## TanStack Query에서의 에러

`useQuery`/`useMutation`의 `error`는 `Error | null` 타입.
컴포넌트에서 직접 렌더링할 때는 `instanceof Error` 체크 후 사용.

```tsx
const { error } = useQuery({ ... });

if (error) {
  return <ErrorMessage message={error instanceof Error ? error.message : "오류 발생"} />;
}
```

## Error Boundary 위치

- **앱 최상단**: 예상치 못한 전체 크래시 방어
- **주요 섹션별**: 한 영역의 에러가 전체 UI를 망가뜨리지 않도록

```tsx
// 섹션 단위 Error Boundary
<ErrorBoundary fallback={<SectionError />}>
  <ChannelList />
</ErrorBoundary>
```

## 사용자 피드백

| 상황 | 처리 방법 |
|------|----------|
| 데이터 로딩 실패 | 인라인 에러 메시지 + 재시도 버튼 |
| 폼 제출 실패 | 폼 하단 에러 메시지 |
| 예상치 못한 에러 | Error Boundary fallback UI |

## 금지 사항

- 에러를 조용히 삼키는 빈 catch (`catch {}`)
- `console.error`만 하고 사용자 피드백 없음
- 에러 메시지에 내부 스택 트레이스 노출
