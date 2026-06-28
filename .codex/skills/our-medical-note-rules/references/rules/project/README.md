# project/ - 프로젝트 특화 규칙

이 폴더는 **Our Medical Note에서만 적용되는 에이전트 작업 규칙과 오버라이드**를 담는다.

- 제품 설명, 고객 모델, PRD, 하네스 전략은 `docs/`에 둔다.
- 이 폴더에는 Codex가 작업할 때 따라야 하는 프로젝트별 규칙만 둔다.
- `back/`, `common/`, `front/` 폴더의 규칙은 범용 규칙이다.
- `project/` 폴더의 규칙은 이 프로젝트 전용 오버라이드다.

## 어떤 내용을 넣는가

- 선택한 스택에 따른 규칙 오버라이드
- 의료/개인정보 도메인에서 에이전트가 지켜야 할 추가 작업 규칙
- 프로젝트 고유 네이밍, 라벨링, URL 구조 규칙
- 하네스 작성 시 필수 체크 항목
- 공통 룰의 버전/옵션 오버라이드

## 어떤 내용을 넣지 않는가

- 제품 요구사항: `../../../docs/PRD.md`
- 고객/사용자 모델: `../../../docs/CUSTOMER.md`
- AI 평가 전략: `../../../docs/HARNESS.md`
- 아키텍처 설명: `../../../docs/ARCHITECTURE.md`
- 의사결정 기록: `../../../docs/DECISIONS.md`

## 오버라이드 예시

```markdown
# project/stack.md
이 프로젝트는 Next.js와 FastAPI를 사용한다.
front/server-components.md와 back/fastapi.md를 우선 참고한다.
```

```markdown
# project/medical-safety.md
AI 출력은 진단이나 치료 지시를 생성하지 않는다.
사용자가 제공한 사실과 AI가 정리한 내용을 분리해서 보여준다.
```

## 다른 프로젝트에 rules 복사할 때

```
복사 가능: back/, common/, front/
복사 금지: project/
```

새 프로젝트에서는 `project/` 폴더를 해당 프로젝트에 맞게 새로 작성한다.
