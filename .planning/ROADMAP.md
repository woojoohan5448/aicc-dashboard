# Roadmap: AICC Dashboard Insight Section

## Overview

KPI 숫자를 자동으로 해석하는 인사이트 섹션을 buildOv() 함수 내에 구축한다. 먼저 인사이트 섹션 컨테이너와 KPI 게이지를 만들고, 트렌드/전망 분석 카드를 추가한 뒤, 이상치 감지와 색상 코딩으로 마무리한다.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Insight Section & KPI Gauges** - 인사이트 섹션 영역을 생성하고 3개 KPI 달성률 게이지를 표시 (completed 2026-03-29)
- [ ] **Phase 2: Trend & Projection Analysis** - 트렌드, 연말 전망, 시장 지위 분석 카드 구현
- [ ] **Phase 3: Anomaly Detection & Visual Polish** - 이상치 경고와 상태별 색상 코딩 적용

## Phase Details

### Phase 1: Insight Section & KPI Gauges
**Goal**: 사용자가 종합현황 탭에서 KPI 목표 대비 달성률을 한눈에 파악할 수 있다
**Depends on**: Nothing (first phase)
**Requirements**: UI-02, GAUGE-01, GAUGE-02, GAUGE-03
**Success Criteria** (what must be TRUE):
  1. 종합현황 탭의 차트 아래에 인사이트 섹션이 별도 영역으로 보인다
  2. RRMS 달성률이 미니 게이지로 목표 대비 현재값을 시각적으로 표시한다
  3. KA레퍼런스 달성률이 미니 게이지로 목표 대비 현재값을 시각적으로 표시한다
  4. 구축형수주액 달성률이 미니 게이지로 목표 대비 현재값을 시각적으로 표시한다
**Plans**: 1 plan
**UI hint**: yes

Plans:
- [x] 01-01-PLAN.md -- Insight section HTML + drawGauge() + 3 KPI canvas gauges

### Phase 2: Trend & Projection Analysis
**Goal**: 사용자가 KPI 추세와 연말 목표 달성 가능성을 자동 분석 결과로 확인할 수 있다
**Depends on**: Phase 1
**Requirements**: INST-01, INST-02, INST-04
**Success Criteria** (what must be TRUE):
  1. 각 KPI에 대해 최근 3개월 평균 기반으로 연말 목표 달성 가능 여부가 표시된다
  2. 각 KPI에 전월 대비 증감 방향(상승/하락/유지)이 표시된다
  3. RRMS의 전년 대비 시장 지위 상승/하락이 표시된다
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 02-01: TBD

### Phase 3: Anomaly Detection & Visual Polish
**Goal**: 사용자가 이례적 변동을 즉시 인지하고, 모든 인사이트 카드의 상태를 색상으로 직관적으로 구분할 수 있다
**Depends on**: Phase 2
**Requirements**: INST-03, UI-01
**Success Criteria** (what must be TRUE):
  1. 전월 대비 +-20% 이상 변동 시 "이례적 변동 -- 원인 파악 필요" 경고가 표시된다
  2. 모든 인사이트 카드에 상태별 색상 코딩이 적용된다 (초록=좋음, 노랑=주의, 빨강=원인파악)
  3. 색상 코딩이 게이지와 분석 카드 모두에 일관되게 적용된다
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Insight Section & KPI Gauges | 1/1 | Complete   | 2026-03-29 |
| 2. Trend & Projection Analysis | 0/0 | Not started | - |
| 3. Anomaly Detection & Visual Polish | 0/0 | Not started | - |
