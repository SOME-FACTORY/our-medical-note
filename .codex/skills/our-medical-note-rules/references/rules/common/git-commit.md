---
description: "Git 커밋 컨벤션"
---

# Git Commit Convention

## Conventional Commits Format

- `feat(scope): description` - 새로운 기능
- `fix(scope): description` - 버그 수정
- `refactor(scope): description` - 코드 리팩토링
- `docs(scope): description` - 문서 변경
- `test(scope): description` - 테스트 추가/수정
- `style(scope): description` - 포맷팅, 세미콜론 등 (기능 변경 없음)
- `perf(scope): description` - 성능 개선
- `chore(scope): description` - 빌드, 툴링 변경

## 예시

- `feat(auth): add JWT-based authentication hook`
- `fix(auth): resolve SSR localStorage error`
- `docs(readme): update setup instructions`

## 커밋 전 체크리스트

1. 테스트 통과 확인
2. 빌드 성공 확인
3. 필요한 경우 문서 업데이트
4. Conventional Commits 형식 준수
