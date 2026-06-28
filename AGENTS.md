# Our Medical Note 에이전트 가이드

이 파일은 이 저장소에서 작업하는 AI 에이전트가 가장 먼저 읽어야 하는 진입점입니다.

## 작업 시작 체크리스트

계획을 세우거나 파일을 수정하기 전에 아래 문서를 먼저 읽습니다.

- `docs/PRD.md`
- `docs/CUSTOMER.md`
- `docs/HARNESS.md`
- `.codex/skills/our-medical-note-rules/SKILL.md`

구현 작업을 할 때는 작업 범위에 맞는 규칙 파일도 함께 읽습니다.

- `.codex/skills/our-medical-note-rules/references/rules/common/`
- `.codex/skills/our-medical-note-rules/references/rules/front/`
- `.codex/skills/our-medical-note-rules/references/rules/back/`
- `.codex/skills/our-medical-note-rules/references/rules/project/`

## 제품 맥락

우리의 의료 노트(Our's Medical Note)는 병원 방문 전후의 의료 정보를 기록하고, 시간이 지난 뒤 3개월/6개월/12개월 단위로 방문 추이와 건강 기록을 리포트로 확인할 수 있게 하는 서비스입니다.

핵심은 개인 기록만이 아니라 **관계 기반 그룹 공유**입니다.

- 사용자는 가족, 친구, 돌봄 관계 등 여러 그룹을 만들 수 있습니다.
- 예를 들어 가족 그룹에는 엄마, 아빠, 형제자매를 초대할 수 있습니다.
- 엄마와 할머니만 포함된 별도 그룹처럼, 관계와 상황에 따라 여러 그룹을 만들 수 있습니다.
- 의료 기록은 저장할 때 공유할 그룹을 선택하며, 선택된 그룹 구성원에게만 보입니다.
- 특정 사람의 기록은 그 사람이 포함된 그룹 맥락에서만 노출되어야 합니다.

대표 사용 장면:

- 내가 엄마와 병원에 함께 가기 전에 엄마의 증상 메모를 미리 정리합니다.
- 진료 중에는 엄마를 대상자로 선택하고, 내가 대신 의사의 설명을 기록합니다.
- 약 봉투나 처방전 사진에서 OCR로 약 정보를 추출해 기록합니다.
- 기록 완료 시 어떤 그룹에 공유할지 선택합니다.
- 이후 3/6/12개월 리포트로 병원 방문과 증상/복약 변화 추이를 확인합니다.

## 현재 기술 방향

- 로그인은 Kakao 로그인만 고려합니다.
- 프론트엔드는 SEO를 중요하게 보고 Next.js를 우선 검토합니다.
- 속도도 중요하므로 프론트엔드 선택은 최종 확정 전입니다.
- 별도 백엔드 서버 없이 Supabase를 사용합니다.
- pnpm 모노레포 구조로 진행합니다.
- `apps/web`: 웹사이트
- `apps/app`: 사용자 앱
- `apps/admin`: 관리자 웹
- `services/supabase`: Supabase 관련 코드, 스키마, Edge Function, 클라이언트 연동 기반
- `packages/ui`: 공용 UI
- `packages/storybook`: Storybook 구성
- `packages/tailwind-config`: Tailwind 설정
- `packages/eslint-config`: ESLint 설정

## 반드시 지킬 원칙

- 의료 노트는 민감한 개인정보로 취급합니다.
- 그룹 권한과 기록 대상자 권한을 혼동하지 않습니다.
- 사용자가 기록 작성자일 수 있고, 기록 대상자는 다른 사람일 수 있습니다.
- 기록은 선택된 그룹에만 공유되어야 합니다.
- 임상적 사실, 진단, 치료 조언을 지어내지 않습니다.
- AI 자동화를 확장하기 전에 하네스 케이스로 동작을 검증합니다.
- 오래 남겨야 하는 제품 결정은 `docs/DECISIONS.md`에 기록합니다.

## 하네스 관점

하네스 엔지니어링은 부가 작업이 아니라 제품의 일부입니다.

AI가 관여하는 기능은 다음을 정의해야 합니다.

- 입력 형태
- 기대 출력 형태
- 안전 경계
- 그룹/권한 노출 경계
- 골든 예시
- 회귀 테스트 케이스
- 사람이 검토해야 하는 지점

AI 평가 전략의 원본은 `docs/HARNESS.md`입니다.
