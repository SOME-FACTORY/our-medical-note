# 아키텍처

## 상태

초안입니다. 시스템 구조와 주요 기술 선택의 원본 문서로 발전시킵니다.

## 저장소 구조 방향

pnpm 모노레포로 진행합니다.

```text
apps/
  web/       # SEO 중심 웹사이트
  app/       # 사용자 앱
  admin/     # 관리자 웹
services/
  supabase/  # Supabase 스키마, 마이그레이션, Edge Function, 클라이언트 연동 기반
packages/
  ui/
  storybook/
  tailwind-config/
  eslint-config/
harness/
  evals/
  fixtures/
  prompts/
  runs/
  scripts/
docs/
.codex/
```

## 현재 기술 방향

- 인증: Kakao 로그인만 고려합니다.
- 프론트엔드: SEO를 위해 Next.js를 우선 검토합니다.
- 성능: 속도가 중요하므로 Next.js 선택은 성능 요구사항과 함께 검증합니다.
- 백엔드: 별도 백엔드 서버 없이 Supabase를 사용합니다.
- 데이터/권한: Supabase Auth, DB, Storage, RLS 정책 중심으로 설계합니다.

## 도메인 모델 초안

- 사용자
- 그룹
- 그룹 멤버
- 기록 대상자
- 병원 방문
- 의료 노트
- 처방/약 정보
- OCR 결과
- 공유 범위
- 리포트
- 감사 이벤트

## 아키텍처 원칙

- 기록 작성자와 기록 대상자를 분리합니다.
- 그룹 권한은 데이터 모델과 RLS 정책에서 강제합니다.
- 의료 기록은 선택된 그룹에만 노출됩니다.
- OCR/AI 결과는 원본과 함께 저장하고 검토 가능하게 합니다.
- 리포트는 기록 기반 추이 정리에 집중하고 의학적 판단을 하지 않습니다.
- 가능하면 전체 운영 인프라 없이도 하네스를 실행할 수 있게 합니다.

## 아직 결정되지 않은 것

- `apps/web`과 `apps/app`의 역할 분리 기준
- Next.js 사용 확정 여부와 렌더링 전략
- Supabase RLS 상세 정책
- OCR 제공자
- AI 모델 제공자
- 리포트 생성 방식
- 배포 대상

결정된 내용은 `docs/DECISIONS.md`에 기록합니다.
