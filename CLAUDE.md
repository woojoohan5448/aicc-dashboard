<!-- GSD:project-start source:PROJECT.md -->
## Project

**AICC 대시보드 — 인사이트 섹션**

LG AICC 대시보드의 종합현황(p-ov) 탭에 KPI 데이터의 의미를 해석하는 인사이트 섹션을 추가하는 프로젝트. 단순 숫자 나열이 아닌, 달성률·트렌드·이상치를 자동 분석해 시각적으로 보여주는 기능이다.

**Core Value:** **수치가 갖는 의미를 자동으로 읽어주는 인사이트** — 사용자가 숫자를 해석할 필요 없이, 대시보드가 직접 "잘 가고 있는지, 문제가 있는지"를 알려준다.

### Constraints

- **코드 범위**: buildOv() 함수 내부에서만 수정 — 다른 탭 기능 불가침
- **의존성**: CDN 추가 금지, libs/ 폴더의 기존 라이브러리만 사용
- **저장소**: localStorage 사용 금지
- **스택**: 바닐라 JS/HTML/CSS — 프레임워크 없음
- **아키텍처**: 단일 index.html 파일 유지
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- HTML5 - Document structure and markup in `index.html`
- JavaScript (ES2020+) - Inline scripting in `index.html` (starting line 3538)
- CSS3 - Inline styling in `index.html` with CSS variables for theming
- JSON - Data serialization for dashboard state, seed data, and import/export operations
## Runtime
- Browser-based (no Node.js/server runtime required)
- Client-side execution only
- None (stateless, no package.json)
- External libraries loaded via local files and CDN
## Frameworks
- No traditional framework (vanilla HTML/CSS/JavaScript)
- Custom single-page application (SPA) architecture using tab-based page switching
- Chart.js 4.x (UMD build) - Line, bar, pie, and custom charts
- XLSX (SheetJS) full.min.js - Excel file reading/writing support
## Key Dependencies
- Chart.js - Real-time chart rendering for performance dashboards, KPI tracking, and trend analysis
- XLSX - Excel import/export for data exchange with external systems
- Google Fonts DM Mono (monospace for data display) - `https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500`
- Pretendard font via jsDelivr CDN - `https://cdn.jsdelivr.net/gh/orioncactus/pretendard`
- System fonts: "LG Smart", "LG SmartBody" (local font fallbacks)
## Configuration
- No .env file or environment variables detected
- Hardcoded configuration in JavaScript
- All settings embedded in HTML document
- No build system detected (no webpack, Vite, Rollup config)
- Single-file deployment: `index.html` is the entire application
- Backup copy: `index_backup.html` (1.5MB)
- Legacy version: `AICC_대시보드_v22.html` (155KB)
- CSS custom properties (variables) defined in `:root` pseudo-element:
## Platform Requirements
- Text editor or IDE (no build toolchain)
- Browser for testing (Chrome, Firefox, Safari, Edge)
- Git for version control (`.git` directory present)
- Static file hosting (any web server, GitHub Pages, AWS S3, Netlify, etc.)
- No server-side processing required
- No database required (in-memory data only)
## Performance Libraries
- Custom canvas plugins for data labels and grid lines
- Memory management: Chart instances stored in global `charts` object with cleanup function `dc(id)`
- Grid styling: Custom grid color `#f0f0f0` with transparent borders
- Locale-aware number formatting: `v.toLocaleString('ko-KR')` for Korean currency
- Custom formatting functions: `fmtK()` for thousands notation (1000→1천), `fmtP()` for percentages
- Vanilla JavaScript with `document.getElementById()`, `insertAdjacentHTML()`, `classList` manipulation
- No jQuery or DOM library
- Event handling via `onclick` attributes and event listeners
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Single HTML file structure: `index.html` (monolithic application with embedded CSS and JavaScript)
- Library files: kebab-case with `.min.js` suffix for minified libraries (e.g., `chart.umd.min.js`, `xlsx.full.min.js`)
- camelCase for all function names
- Verb-prefix pattern for action functions: `build*` (e.g., `buildOv`, `buildKpi`, `buildSub`, `buildBld`, `buildCh`, `buildComp`, `buildEdit`)
- Utility functions with simple verbs: `go`, `toast`, `dc`, `fmt`, `fmtP`, `fmtK`, `rebuildAll`
- Event handlers use verb or `toggle` pattern: `toggleSection`, `removeGenRow`, `removeMonRow`, `addMonRow`, `applyEditData`, `exportJson`
- Getter functions use `get` prefix: `g()` as inline lambda for `document.getElementById`
- Global data objects use UPPERCASE: `SEED`, `D`, `charts`
- Constants use UPPERCASE: `PINK`, `BLUE`, `GREEN`, `AMBER`, `GRAY`, `PD`, `PD2` (color values)
- Local variables use camelCase: `kpi`, `an`, `mon`, `ch`, `bld`, `kd`, `cm`, `ctx`, `meta`
- Array/object keys use camelCase: `cumIdx`, `bldYearIdxs`, `subRevData`, `bldRevData`
- Single-letter variables used in tight loops: `i`, `v`, `e`, `s`, `p`, `l`, `m` (acceptable in data mapping contexts)
- Abbreviations used for brevity: `nv()` (numeric value), `sv()` (string value), `el` (element), `ctx` (canvas context)
- Data objects as flat structures with underscore-separated keys: `y25_cum`, `m2601`, `y26_sum`, `sub_lines`, `bld_order`
- Nested object structures use camelCase properties: `current`, `target`, `grades`, `annual`, `monthly`
- DOM element IDs use kebab-case: `p-ov`, `c-ba`, `k-bld`, `tbody-mon`, `tbody-ind` (with prefix indicating element type)
## Code Style
- No external formatter detected; code uses compact single-line styles for CSS and mixed styles for JavaScript
- CSS: inline styles with compressed format (minimal whitespace, semicolon-terminated)
- JavaScript: mix of single-line and multi-line statements
- No ESLint or equivalent detected; code follows no formal linting rules
- Implicit console-based error logging: `console.error('buildOv error:', e)`
- Try-catch wrapping for initialization code to prevent silent failures
- 2 spaces for nested structures in JavaScript
- Template literals preserve indentation within backticks
## Import Organization
- External libraries loaded via `<script>` tags before inline code
- Chart.js: `Chart` global object
- XLSX: `XLSX` global object (not used but available)
- All application code in single `<script>` block starting at line 3538
- Not used; all references are direct global access
- Library access through global objects: `Chart`, `XLSX`
## Error Handling
- Silent failure with try-catch wrapper: `try { buildOv(); } catch(e) { console.error(...) }`
- Nullish coalescing for default values: `kpi.profit||0`, `an.sub_rev?.[ci]??139`
- Ternary operators for conditional returns: `v==null?'—':typeof v==='number'?v.toLocaleString('ko-KR'):String(v)`
- Guard clauses to prevent errors: `if(!el)return;`, `if(!chartArea)return;`
- No explicit validation; relies on optional chaining (`?.`) and nullish coalescing (`??`)
- Toast notifications for user-facing errors: `toast(icon, msg, sub)`
- Errors in chart rendering are silently caught and logged
- Missing DOM elements return undefined without throwing
- Invalid data values default to `null` or `0`
## Logging
- Error logging: `console.error('buildOv error:', e)` - minimal information
- No debug logging, warning, or info logs detected
- No centralized logging service
## Comments
- Section headers using ASCII art: `/* ── Section Name ── */`
- Few inline comments; code intent conveyed through function names
- Comments mark functional boundaries between major features
- Korean language comments used for specific domain terminology
- Not used; no formal documentation pattern
- Functions self-documented through descriptive names and parameter usage
## Function Design
- Functions range from 5 lines (utility formatters like `fmt`) to 150+ lines (complex builders like `applyEditData`)
- Larger functions group related data manipulation into logical blocks
- No explicit line limit enforced
- Most builder functions take no parameters (rely on global `D` object)
- Utility functions take simple types: `fmt(v)`, `fmtP(v)`, `dc(id)`
- Complex functions use object destructuring: `const {chartArea}=chart`
- Arrow functions used for inline callbacks and map/filter operations
- Builder functions return undefined (side effects: DOM manipulation)
- Formatter functions return strings or numbers: `fmt()`, `fmtP()`, `fmtK()`
- Event handlers return nothing; DOM updates trigger via `rebuildAll()`
- Data transformation functions return modified objects or arrays
## Module Design
- No module system; all functions are global scope
- Data structures stored in global variables: `SEED`, `D` (working copy)
- Not applicable; single file architecture
- Single `index.html` contains:
- Order within JavaScript:
## Data Access Patterns
- Global state: `D` object (mutable working copy of `SEED`)
- Data structure: nested objects with arrays
- Access pattern: destructuring at function start, then direct property access
- Direct mutation of `D` object properties in `applyEditData()`
- No intermediate state layer; all UI updates trigger full `rebuildAll()`
- `saveToLocal()` assumed to persist changes (implementation not shown in explored section)
## Spacing and Punctuation
- No spacing around colons in properties: `margin:0`, `padding:0`
- Comma-separated selectors on single line: `*, *::before, *::after { ... }`
- No spaces inside parentheses: `if(v===0)`, `function(a,b)`
- Spaces around binary operators: `a+b`, `a||b`
- Template literals: backticks for string interpolation
- Object destructuring without spaces: `const {chartArea}=chart`
## DOM ID Naming
- Page containers: `p-{pageName}` (e.g., `p-ov`, `p-kpi`, `p-sub`, `p-bld`, `p-ch`, `p-comp`, `p-edit`)
- Chart containers: `c-{chartName}` (e.g., `c-ba`, `c-bi`, `c-ca`, `c-ch-trend`)
- KPI card grids: `k-{sectionName}` (e.g., `k-bld`, `k-ch`)
- Table bodies: `tbody-{dataType}` (e.g., `tbody-mon`, `tbody-ind`, `tbody-contracts`)
- Edit sections: `s-{sectionName}` (e.g., `s-kpi`, `s-annual`, `s-mon`)
- Legend elements: `l-{chartName}` (e.g., `l-bi`)
- Input fields: ID pattern matches their data path (e.g., `mon_lbl_${mi}`, `prod_lines_${i}`)
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Monolithic HTML/CSS/JavaScript single file (6,380 lines)
- Data-driven rendering with reactive updates
- Chart.js visualization library for analytics
- Tab-based navigation with lazy rendering
- Embedded JSON data seed (SEED object) for all dashboard content
## Layers
- Purpose: DOM manipulation, event handling, chart rendering
- Location: `index.html` (lines 1-430, 3540+)
- Contains: CSS styles, HTML template, event listeners, DOM queries
- Depends on: Chart.js library, XLSX library, HTML DOM API
- Used by: User interactions, page navigation
- Purpose: Application state management and data transformation
- Location: `index.html` (lines 3540-3560 - SEED object definition)
- Contains: Hard-coded JSON data structure with summary, subscription, buildup, channel, competitor, top10 information
- Depends on: Nothing (self-contained)
- Used by: All rendering and visualization functions
- Purpose: Data manipulation, chart configuration, calculations
- Location: `index.html` (lines 3580-5400 - JavaScript functions)
- Contains: Functions for formatting, chart generation, data aggregation
- Depends on: Data layer, Chart.js
- Used by: Presentation layer for rendering
- Purpose: Build and update specific pages/sections dynamically
- Location: `index.html` (lines 3627+)
- Contains: buildOv(), buildKpi(), buildSub(), buildBld(), buildCh(), buildComp(), buildEdit() functions
- Depends on: Business logic, Chart.js
- Used by: Tab navigation handler (go function)
## Data Flow
- Single global object D stores mutable state
- SEED maintains original data as reference
- No formal state machine; mutation-based updates
- No persistence layer (changes lost on page refresh)
## Key Abstractions
- Purpose: Centralize chart lifecycle management
- Examples: `dc('ov-rev')`, `dc('sub-monthly')`
- Pattern: Destroy existing chart if present, prepare canvas for new chart
- Purpose: Standardize number/percentage display
- `fmt(v)`: Locale string for numbers, '—' for null
- `fmtP(v)`: Percentage formatting with % symbol
- `fmtK(v)`: Thousands abbreviation (1000 → 1천)
- Purpose: Generate and populate KPI card grids
- Examples: Used in KPI page and edit tab
- Pattern: Map data array to HTML template, append to container
- Purpose: Render 3-column KPI metric blocks
- Parameters: Element ID, KPI data, annual data
- Contains: Labels, values, tags, conditional formatting
## Entry Points
- Location: `/c/Users/한우주/Desktop/aicc-dashboard/index.html`
- Triggers: Browser load (displays overview page by default)
- Responsibilities: Complete UI rendering, all interactions
- Location: Lines ~3728-4124
- Triggers: Page load, tab click to "Overview"
- Responsibilities: Render summary blocks, annual revenue bars, monthly trend, competitor comparison
- Location: Lines ~4173+
- Triggers: Tab click to "Subscription"
- Responsibilities: Product breakdown, monthly trends, industry distribution
- Location: Lines ~4600+
- Triggers: Tab click to "Build-up"
- Responsibilities: Contract table, project pipeline, annual trends
- Location: Lines ~4900+
- Triggers: Tab click to "Channel"
- Responsibilities: Direct/indirect sales breakdown, dealer table
- Location: Lines ~5040+
- Triggers: Tab click to "Competitor"
- Responsibilities: Market share comparison, competitor data visualization
- Location: Lines ~5400+
- Triggers: Tab click to "KPI"
- Responsibilities: KPI metric cards with grade definitions and formulas
- Location: HTML template at lines ~1738-3536
- Triggers: Tab click to "Edit" or "수정" button
- Responsibilities: Form inputs for data modification, save/load functions
## Error Handling
- Null coalescing: `value ?? defaultValue`
- Optional chaining: `object?.property?.[index]`
- Conditional rendering: Hide elements if data missing
- Fallback labels: Display '—' for missing numeric values
- Safe array access: `(arr||[])[index]` prevents undefined index errors
- `cumIdx>=0 ? cumIdx : (an.sub_rev||[]).length-1` (safe fallback index)
- `an.sub_rev?.[ci] ?? 139` (null coalesce with default)
- `const cumIdx = rawLabels.findIndex(l=>String(l).includes('누적'))` (safe find)
## Cross-Cutting Concerns
- Input validation in edit tab (inline)
- No formal validation framework
- Type assumptions based on SEED structure
- CSS variables for theming (--pink, --bg, --border, etc.)
- Consistent spacing: 12px, 16px, 20px, 24px
- Consistent border radius: 6px, 8px, 10px, 12px
- Color scheme tied to business meaning (green=good, red=alert)
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
