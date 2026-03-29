# Requirements: AICC 대시보드 인사이트 섹션

**Defined:** 2026-03-29
**Core Value:** 수치가 갖는 의미를 자동으로 읽어주는 인사이트

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### 게이지 (Gauge)

- [x] **GAUGE-01**: KPI 미니 게이지에서 RRMS 목표 대비 현재 달성률을 시각적으로 표시
- [x] **GAUGE-02**: KPI 미니 게이지에서 KA레퍼런스 목표 대비 현재 달성률을 시각적으로 표시
- [x] **GAUGE-03**: KPI 미니 게이지에서 구축형수주액 목표 대비 현재 달성률을 시각적으로 표시

### 인사이트 (Insight)

- [ ] **INST-01**: 최근 3개월 평균 기반으로 연말 목표 달성 가능 여부 판단 및 표시
- [ ] **INST-02**: 전월 대비 증감 방향(트렌드) 표시
- [ ] **INST-03**: 전월 대비 ±20% 이상 변동 시 "이례적 변동 — 원인 파악 필요" 경고 표시
- [ ] **INST-04**: RRMS 전년 대비 시장 지위 상승/하락 표시

### UI

- [ ] **UI-01**: 인사이트 카드에 상태별 색상 코딩 적용 (초록=좋음, 노랑=주의, 빨강=원인파악)
- [x] **UI-02**: 인사이트 섹션을 차트 아래 별도 영역에 배치

## v2 Requirements

### 고급 분석

- **ADV-01**: 계절성 패턴 기반 예측 (단순 평균이 아닌 계절 보정)
- **ADV-02**: 인사이트 코멘트 사용자 커스터마이징 (임계값 변경 등)

## Out of Scope

| Feature | Reason |
|---------|--------|
| AI/ML 기반 예측 | 룰 기반으로 충분, 복잡도 불필요 |
| localStorage 저장 | 프로젝트 제약사항 |
| 새 CDN 라이브러리 | libs/ 폴더만 사용 제약 |
| 다른 탭 수정 | buildOv() 내부에서만 작업 제약 |
| 실시간 외부 데이터 | 기존 직접입력 방식 유지 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| GAUGE-01 | Phase 1 | Complete |
| GAUGE-02 | Phase 1 | Complete |
| GAUGE-03 | Phase 1 | Complete |
| INST-01 | Phase 2 | Pending |
| INST-02 | Phase 2 | Pending |
| INST-03 | Phase 3 | Pending |
| INST-04 | Phase 2 | Pending |
| UI-01 | Phase 3 | Pending |
| UI-02 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-29 after roadmap creation*
