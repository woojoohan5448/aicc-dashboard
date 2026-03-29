# Technology Stack

**Analysis Date:** 2026-03-29

## Languages

**Primary:**
- HTML5 - Document structure and markup in `index.html`
- JavaScript (ES2020+) - Inline scripting in `index.html` (starting line 3538)
- CSS3 - Inline styling in `index.html` with CSS variables for theming

**Secondary:**
- JSON - Data serialization for dashboard state, seed data, and import/export operations

## Runtime

**Environment:**
- Browser-based (no Node.js/server runtime required)
- Client-side execution only

**Package Manager:**
- None (stateless, no package.json)
- External libraries loaded via local files and CDN

## Frameworks

**Core:**
- No traditional framework (vanilla HTML/CSS/JavaScript)
- Custom single-page application (SPA) architecture using tab-based page switching

**Charting:**
- Chart.js 4.x (UMD build) - Line, bar, pie, and custom charts
  - Location: `libs/chart.umd.min.js` (881KB)
  - Loaded via `<script src="libs/chart.umd.min.js"></script>` line 9

**Data Processing:**
- XLSX (SheetJS) full.min.js - Excel file reading/writing support
  - Location: `libs/xlsx.full.min.js` (201KB)
  - Loaded via `<script src="libs/xlsx.full.min.js"></script>` line 8

## Key Dependencies

**Critical:**
- Chart.js - Real-time chart rendering for performance dashboards, KPI tracking, and trend analysis
- XLSX - Excel import/export for data exchange with external systems

**Fonts & Styling:**
- Google Fonts DM Mono (monospace for data display) - `https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500`
- Pretendard font via jsDelivr CDN - `https://cdn.jsdelivr.net/gh/orioncactus/pretendard`
- System fonts: "LG Smart", "LG SmartBody" (local font fallbacks)

## Configuration

**Environment:**
- No .env file or environment variables detected
- Hardcoded configuration in JavaScript
- All settings embedded in HTML document

**Build:**
- No build system detected (no webpack, Vite, Rollup config)
- Single-file deployment: `index.html` is the entire application
- Backup copy: `index_backup.html` (1.5MB)
- Legacy version: `AICC_대시보드_v22.html` (155KB)

**Theme/Styling:**
- CSS custom properties (variables) defined in `:root` pseudo-element:
  - Color palette: `--pink`, `--green`, `--red`, `--blue`, `--amber`, `--bg`, `--card`, `--border`
  - Shadows: `--shadow`, `--shadow-md`
  - Base font-size: 16px in `html` selector

## Platform Requirements

**Development:**
- Text editor or IDE (no build toolchain)
- Browser for testing (Chrome, Firefox, Safari, Edge)
- Git for version control (`.git` directory present)

**Production:**
- Static file hosting (any web server, GitHub Pages, AWS S3, Netlify, etc.)
- No server-side processing required
- No database required (in-memory data only)

## Performance Libraries

**Chart Rendering:**
- Custom canvas plugins for data labels and grid lines
- Memory management: Chart instances stored in global `charts` object with cleanup function `dc(id)`
- Grid styling: Custom grid color `#f0f0f0` with transparent borders

**Data Formatting:**
- Locale-aware number formatting: `v.toLocaleString('ko-KR')` for Korean currency
- Custom formatting functions: `fmtK()` for thousands notation (1000→1천), `fmtP()` for percentages

**DOM Manipulation:**
- Vanilla JavaScript with `document.getElementById()`, `insertAdjacentHTML()`, `classList` manipulation
- No jQuery or DOM library
- Event handling via `onclick` attributes and event listeners

---

*Stack analysis: 2026-03-29*
