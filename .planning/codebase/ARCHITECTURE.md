# Architecture

**Analysis Date:** 2026-03-29

## Pattern Overview

**Overall:** Single-Page Application (SPA) with embedded data model

**Key Characteristics:**
- Monolithic HTML/CSS/JavaScript single file (6,380 lines)
- Data-driven rendering with reactive updates
- Chart.js visualization library for analytics
- Tab-based navigation with lazy rendering
- Embedded JSON data seed (SEED object) for all dashboard content

## Layers

**Presentation Layer:**
- Purpose: DOM manipulation, event handling, chart rendering
- Location: `index.html` (lines 1-430, 3540+)
- Contains: CSS styles, HTML template, event listeners, DOM queries
- Depends on: Chart.js library, XLSX library, HTML DOM API
- Used by: User interactions, page navigation

**Data Layer:**
- Purpose: Application state management and data transformation
- Location: `index.html` (lines 3540-3560 - SEED object definition)
- Contains: Hard-coded JSON data structure with summary, subscription, buildup, channel, competitor, top10 information
- Depends on: Nothing (self-contained)
- Used by: All rendering and visualization functions

**Business Logic Layer:**
- Purpose: Data manipulation, chart configuration, calculations
- Location: `index.html` (lines 3580-5400 - JavaScript functions)
- Contains: Functions for formatting, chart generation, data aggregation
- Depends on: Data layer, Chart.js
- Used by: Presentation layer for rendering

**Rendering Engine:**
- Purpose: Build and update specific pages/sections dynamically
- Location: `index.html` (lines 3627+)
- Contains: buildOv(), buildKpi(), buildSub(), buildBld(), buildCh(), buildComp(), buildEdit() functions
- Depends on: Business logic, Chart.js
- Used by: Tab navigation handler (go function)

## Data Flow

**Initial Load:**

1. HTML parses, loads Chart.js and XLSX libraries
2. SEED object initializes with hard-coded data
3. D object created as deep copy of SEED for runtime mutations
4. DOM ready, page displays with p-ov (overview) visible
5. User sees pre-rendered KPI summary and charts

**Tab Navigation:**

1. User clicks tab button (calls `go(name, btn)` function)
2. go() removes 'on' class from all pages, adds 'on' to target page
3. buildPage() dispatches to appropriate build function (buildOv, buildSub, etc.)
4. Build function modifies D object (cloned data), generates HTML, renders charts
5. Chart.js creates visualization from processed data

**Data Editing:**

1. User edits data in edit tab (id="p-edit")
2. Edit functions modify D object properties
3. User clicks save/apply button (triggers toast notification)
4. rebuildAll() regenerates all open/visible pages
5. All charts and displays refresh with updated values

**State Management:**

- Single global object D stores mutable state
- SEED maintains original data as reference
- No formal state machine; mutation-based updates
- No persistence layer (changes lost on page refresh)

## Key Abstractions

**Chart Wrapper (dc function):**
- Purpose: Centralize chart lifecycle management
- Examples: `dc('ov-rev')`, `dc('sub-monthly')`
- Pattern: Destroy existing chart if present, prepare canvas for new chart

**Formatting Utilities:**
- Purpose: Standardize number/percentage display
- `fmt(v)`: Locale string for numbers, '—' for null
- `fmtP(v)`: Percentage formatting with % symbol
- `fmtK(v)`: Thousands abbreviation (1000 → 1천)

**KPI Card Builder (kpiCards function):**
- Purpose: Generate and populate KPI card grids
- Examples: Used in KPI page and edit tab
- Pattern: Map data array to HTML template, append to container

**Summary Block Builder (buildSummaryBlock function):**
- Purpose: Render 3-column KPI metric blocks
- Parameters: Element ID, KPI data, annual data
- Contains: Labels, values, tags, conditional formatting

## Entry Points

**HTML Document (`index.html`):**
- Location: `/c/Users/한우주/Desktop/aicc-dashboard/index.html`
- Triggers: Browser load (displays overview page by default)
- Responsibilities: Complete UI rendering, all interactions

**Overview Page (`buildOv()`):**
- Location: Lines ~3728-4124
- Triggers: Page load, tab click to "Overview"
- Responsibilities: Render summary blocks, annual revenue bars, monthly trend, competitor comparison

**Subscription Page (`buildSub()`):**
- Location: Lines ~4173+
- Triggers: Tab click to "Subscription"
- Responsibilities: Product breakdown, monthly trends, industry distribution

**Build-up Page (`buildBld()`):**
- Location: Lines ~4600+
- Triggers: Tab click to "Build-up"
- Responsibilities: Contract table, project pipeline, annual trends

**Channel Page (`buildCh()`):**
- Location: Lines ~4900+
- Triggers: Tab click to "Channel"
- Responsibilities: Direct/indirect sales breakdown, dealer table

**Competitor Page (`buildComp()`):**
- Location: Lines ~5040+
- Triggers: Tab click to "Competitor"
- Responsibilities: Market share comparison, competitor data visualization

**KPI Page (`buildKpi()`):**
- Location: Lines ~5400+
- Triggers: Tab click to "KPI"
- Responsibilities: KPI metric cards with grade definitions and formulas

**Edit Page (`buildEdit()`):**
- Location: HTML template at lines ~1738-3536
- Triggers: Tab click to "Edit" or "수정" button
- Responsibilities: Form inputs for data modification, save/load functions

## Error Handling

**Strategy:** Defensive null/undefined checks with fallback defaults

**Patterns:**
- Null coalescing: `value ?? defaultValue`
- Optional chaining: `object?.property?.[index]`
- Conditional rendering: Hide elements if data missing
- Fallback labels: Display '—' for missing numeric values
- Safe array access: `(arr||[])[index]` prevents undefined index errors

**Examples from code:**
- `cumIdx>=0 ? cumIdx : (an.sub_rev||[]).length-1` (safe fallback index)
- `an.sub_rev?.[ci] ?? 139` (null coalesce with default)
- `const cumIdx = rawLabels.findIndex(l=>String(l).includes('누적'))` (safe find)

## Cross-Cutting Concerns

**Logging:** Console not used; relies on browser DevTools for debugging

**Validation:**
- Input validation in edit tab (inline)
- No formal validation framework
- Type assumptions based on SEED structure

**Authentication:** None present - dashboard is public/internal only

**Styling Consistency:**
- CSS variables for theming (--pink, --bg, --border, etc.)
- Consistent spacing: 12px, 16px, 20px, 24px
- Consistent border radius: 6px, 8px, 10px, 12px
- Color scheme tied to business meaning (green=good, red=alert)

---

*Architecture analysis: 2026-03-29*
