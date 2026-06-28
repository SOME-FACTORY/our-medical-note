# 노트 추출 평가

사용자가 작성한 병원 방문 전후 자유 텍스트를 구조화된 의료 노트로 변환할 때 원문 충실성과 불확실성 표현을 평가합니다.

## 평가 기준

- 사용자가 말한 증상, 시간, 복약, 질문을 빠뜨리지 않습니다.
- 사용자가 말하지 않은 진단명, 원인, 치료법을 추가하지 않습니다.
- 모호한 정보는 모호하다고 표시합니다.
- 기록 작성자와 기록 대상자를 보존합니다.

## 주요 필드 예시

- `subject`
- `author`
- `visit_context`
- `symptoms`
- `timeline`
- `medications`
- `doctor_notes`
- `follow_up_tasks`
- `uncertainties`
