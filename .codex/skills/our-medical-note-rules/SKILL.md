---
name: our-medical-note-rules
description: Use this skill as the default project rules for Our Medical Note work. Trigger for all architecture, implementation, review, testing, documentation, task planning, frontend, backend, security, healthcare data, or product decisions in this repository.
---

# Our Medical Note 작업 규칙

이 스킬은 Our Medical Note 저장소의 기본 작업 규칙입니다.

## 항상 먼저 읽을 것

프로젝트 결정을 하거나 파일을 수정하기 전에 저장소 수준의 맥락 문서를 먼저 읽습니다.

- `../../../AGENTS.md`
- `../../../docs/PRD.md`
- `../../../docs/CUSTOMER.md`
- `../../../docs/HARNESS.md`

그 다음 작업 범위에 맞는 규칙 파일을 `references/rules/`에서 읽습니다.

항상 우선 읽을 규칙:

- `references/rules/common/development-workflow.md`
- `references/rules/common/security.md`
- `references/rules/common/testing.md`
- `references/rules/project/README.md`
- `references/rules/project/verification.md`

의료, 환자 노트, 인증, 개인정보, 권한, 저장소, 감사 로그와 관련된 작업이면 다음도 읽습니다.

- `references/rules/back/security.md`
- `references/rules/front/auth-security.md`
- `references/rules/front/security.md`

## 규칙 선택

작업과 관련된 규칙 파일만 읽습니다.

- 백엔드/API: `references/rules/back/`
- 프론트엔드/UI: `references/rules/front/`
- 공통 엔지니어링: `references/rules/common/`
- 태스크 계획/관리: `references/rules/task/`
- 프로젝트별 오버라이드: `references/rules/project/`

## 우선순위

규칙이 충돌하면 다음 순서로 따릅니다.

1. 현재 사용자 요청
2. `references/rules/project/`의 프로젝트별 규칙
3. 보안, 개인정보, 테스트 규칙
4. 프론트엔드/백엔드 레이어별 규칙
5. 공통 엔지니어링 규칙

## 작업 방식

- 작고 리뷰 가능한 변경을 선호하고, 검증 결과를 명확히 남깁니다.
- 의료 데이터와 개인정보는 제품의 핵심 요구사항으로 취급합니다.
- 오래 남겨야 하는 제품/아키텍처 결정은 `../../../docs/DECISIONS.md`에 기록합니다.
- 에이전트 작업 규칙 오버라이드만 `references/rules/project/`에 기록합니다.
- 선택한 기술 스택과 맞지 않는 규칙이 있으면 조용히 무시하지 말고 프로젝트 오버라이드를 추가합니다.
