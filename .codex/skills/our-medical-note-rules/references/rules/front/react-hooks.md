---
description: "React Hooks 설계 원칙 및 사용 규칙"
paths:
  - "**/use*.ts"
  - "**/use*.tsx"
---

# React Hooks Rules

## 커스텀 훅 설계 원칙

### 단일 책임
하나의 훅은 하나의 관심사만 다룬다. 여러 역할이 섞이면 분리한다.

```typescript
// ❌ 너무 많은 역할
function useUserDashboard() { /* 인증 + 데이터 + UI 상태 전부 */ }

// ✅ 역할 분리
function useAuth() { /* 인증만 */ }
function useUserData(userId: string) { /* 데이터만 */ }
```

### 훅 추출 기준
다음 중 하나라도 해당하면 커스텀 훅으로 추출한다:
- 동일한 로직이 2개 이상의 컴포넌트에서 반복됨
- 컴포넌트에서 `useEffect` + 관련 state가 3개 이상 묶임
- 비즈니스 로직이 UI 로직과 섞여 테스트가 어려움

## useEffect

클린업 함수를 항상 반환한다 (이벤트 리스너, 타이머, 구독 등).

```typescript
useEffect(() => {
  const handler = (e: Event) => { /* ... */ };
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);
```

빈 의존성 배열(`[]`)은 마운트/언마운트에만 실행됨을 의미한다. 의존성을 의도적으로 생략하는 것은 금지.

## 성능 훅 사용 기준

`useCallback`, `useMemo`는 실제 성능 문제가 있을 때만 사용한다. 선제적 최적화는 오히려 코드를 복잡하게 만든다.

적합한 경우:
- 자식 컴포넌트에 함수를 props로 전달하고, 그 자식이 `React.memo`로 감싸져 있을 때
- 비용이 큰 계산 (대용량 배열 정렬, 복잡한 파생 데이터)

```typescript
// ✅ 자식에게 전달되는 핸들러
const handleSubmit = useCallback(() => {
  onSubmit(formData);
}, [formData, onSubmit]);

// ❌ 단순 이벤트 핸들러에 불필요한 useCallback
const handleClick = useCallback(() => setOpen(true), []); // 과잉
```

## SSR Safety

브라우저 전용 API 접근 시 반드시 체크한다.

```typescript
// ✅ 초기값에서 체크
const [value, setValue] = useState(() => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
});

// ✅ effect에서 체크
useEffect(() => {
  if (typeof window === "undefined") return;
  // browser-only code
}, []);
```

## 네이밍

- 훅 이름은 `use` 접두사 필수
- 동작을 명확히 표현: `useXxx` (조회), `useSaveXxx` (저장), `useDeleteXxx` (삭제)
- boolean 반환값: `isLoading`, `isOpen`, `hasError`
