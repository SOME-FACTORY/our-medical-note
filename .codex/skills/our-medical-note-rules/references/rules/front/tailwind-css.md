---
description: "Tailwind CSS v4 사용 규칙"
paths:
  - "**/*.tsx"
  - "**/*.css"
---

# Tailwind CSS v4 규칙

## 기본 설정

`@import "tailwindcss"` 로 전체 import (v4 방식)

커스텀 글로벌 스타일은 반드시 `@layer base { }` 안에 작성
- unlayered 스타일은 Tailwind 유틸리티보다 cascade 우선순위가 높아 `px-*`, `py-*` 등이 무시됨

```css
/* ✅ good */
@layer base {
  * { box-sizing: border-box; }
  body { font-family: sans-serif; }
}

/* ❌ bad - Tailwind 유틸리티가 덮어씌워짐 */
* { padding: 0; margin: 0; }
```

## v4 비표준 클래스 주의

표준 스케일에 없는 값은 arbitrary value 사용:

```
❌ border-3     →  ✅ border-[3px]
❌ border-l-3   →  ✅ border-l-[3px]
❌ z-999        →  ✅ z-[999]
```

## Arbitrary Value 사용 기준

표준 스케일(4, 8, 12, 16...)로 표현 안 될 때만 사용
반복되는 arbitrary value는 컴포넌트나 CSS 변수로 추출 검토

```tsx
// ✅ 표준 스케일 우선
className="px-4 py-2 rounded-lg"

// ✅ 불가피한 경우만
className="h-[200px] w-[280px]"

// ❌ 남용
className="px-[17px] py-[9px] mt-[13px]"
```

## 반응형

모바일 퍼스트 기본, `md:` breakpoint로 데스크탑 대응

```tsx
className="px-4 md:px-6"           // 모바일 작게, 데스크탑 크게
className="hidden md:block"         // 모바일 숨김, 데스크탑 표시
className="flex-col md:flex-row"    // 모바일 세로, 데스크탑 가로
```

## 조건부 클래스

```tsx
// 단순한 경우 - 템플릿 리터럴
className={`px-3 py-1.5 ${isActive ? "bg-blue-500 text-white" : "bg-white"}`}

// 복잡한 경우 - clsx 또는 cn 유틸 사용
className={cn("px-3 py-1.5", isActive && "bg-blue-500 text-white", isDisabled && "opacity-50")}
```

## 금지 사항

- ❌ `@apply` 남용 (Tailwind의 장점을 상쇄)
- ❌ globals.css에 unlayered 커스텀 스타일 추가
- ❌ 동적 레이아웃 값을 제외한 `style={}` 과 Tailwind 혼용
