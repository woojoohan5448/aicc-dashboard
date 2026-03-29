# AICC 대시보드 — 인사이트 섹션

## What This Is

LG AICC 대시보드의 종합현황(p-ov) 탭에 KPI 데이터의 의미를 해석하는 인사이트 섹션을 추가하는 프로젝트. 단순 숫자 나열이 아닌, 달성률·트렌드·이상치를 자동 분석해 시각적으로 보여주는 기능이다.

## Core Value

**수치가 갖는 의미를 자동으로 읽어주는 인사이트** — 사용자가 숫자를 해석할 필요 없이, 대시보드가 직접 "잘 가고 있는지, 문제가 있는지"를 알려준다.

## Requirements

### Validated

- ✓ 종합현황 탭(p-ov) 렌더링 — existing (buildOv 함수)
- ✓ KPI 데이터 구조 (D.kpi) — existing
- ✓ Chart.js 기반 시각화 — existing
- ✓ 직접입력 방식 데이터 관리 — existing
- ✓ 탭 네비게이션 (go 함수) — existing

### Active

- [ ] KPI 진척률 미니 게이지 (RRMS / KA레퍼런스 / 구축형수주액)
- [ ] 목표 대비 달성률 시각화 (직접입력 목표값 활용)
- [ ] 온고잉 판단 — 최근 3개월 평균 기반 연말 목표 달성 가능 여부
- [ ] 트렌드 감지 — 전월 대비 증감 방향 표시
- [ ] 이상치 감지 — 전월 대비 ±20% 이상 변동 시 경고
- [ ] RRMS 시장 지위 — 전년 대비 상승/하락 (D.kpi 전년도 데이터 활용)
- [ ] 인사이트 카드 색상 코딩 (초록/노랑/빨강)
- [ ] 인사이트 섹션 위치: 차트 아래 별도 섹션

### Out of Scope

- AI/ML 기반 예측 — 룰 기반으로 충분, 복잡도 불필요
- localStorage 사용 — 제약사항
- 새로운 CDN 추가 — libs/ 폴더만 사용
- 다른 탭 수정 — buildOv() 내부에서만 작업
- 실시간 외부 데이터 연동 — 기존 직접입력 방식 유지

## Context

- 기존 코드베이스: 단일 index.html 파일 (~6,380 lines), 바닐라 JS SPA
- 차트 라이브러리: Chart.js 4.x (libs/chart.umd.min.js)
- 데이터: D.kpi 객체에 현재/전년도 KPI 데이터 포함
- 목표값: 사용자가 직접입력하는 방식 (기존 직접입력 시스템 활용)
- 렌더링: buildOv() 함수가 종합현황 탭 전체 담당
- 인사이트 섹션 위치: 기존 차트들 아래에 새로운 섹션으로 배치

## Constraints

- **코드 범위**: buildOv() 함수 내부에서만 수정 — 다른 탭 기능 불가침
- **의존성**: CDN 추가 금지, libs/ 폴더의 기존 라이브러리만 사용
- **저장소**: localStorage 사용 금지
- **스택**: 바닐라 JS/HTML/CSS — 프레임워크 없음
- **아키텍처**: 단일 index.html 파일 유지

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 온고잉 판단: 최근 3개월 평균 기반 | 단순 선형 추정보다 최근 추세 반영이 정확 | — Pending |
| 목표값: 직접입력 방식 활용 | 기존 시스템 일관성, 외부 의존 없음 | — Pending |
| 위치: 차트 아래 별도 섹션 | KPI 카드 → 차트 → 인사이트 순서로 자연스러운 흐름 | — Pending |
| 전년도 RRMS: D.kpi 내 기존 데이터 활용 | 추가 데이터 소스 불필요 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-29 after initialization*
