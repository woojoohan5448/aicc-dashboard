# External Integrations

**Analysis Date:** 2026-03-29

## APIs & External Services

**None Detected**

- No external API calls via `fetch()` or `XMLHttpRequest`
- No SDK integrations (Stripe, Auth0, Supabase, AWS, etc.)
- No authentication service integration
- All data is client-side, in-memory only

## Data Storage

**Databases:**
- None - Application is fully client-side
- No backend data persistence
- No SQL/NoSQL database connections

**File Storage:**
- Local filesystem only (no cloud storage integration)
- Export functionality: JSON export via browser's File API
  - Function: `exportJson()` at line 5452 in `index.html`
  - Creates blob and downloads to user's local machine
  - Filename pattern: `aicc_data_[YYYY-MM-DD].json`
- Import functionality: JSON import via file input
  - Function: `importJson(file)` at line 5460 in `index.html`
  - Accepts `.json` files only

**Caching:**
- None - No service workers, Redis, or caching service
- Data stored in memory (lost on page refresh)
- Note at line 5447: "localStorage 미사용" (localStorage not used)

## Authentication & Identity

**Auth Provider:**
- None

**Implementation:**
- No authentication required
- Dashboard accessible without credentials
- No user login/logout system
- No session management

## Data Sources

**Internal:**
- Hardcoded seed data in JavaScript object `SEED` (line 3538)
- Contains pre-populated business metrics for AICC (AI Contact Center) operations:
  - Annual revenue, subscription metrics, build-up projects
  - Customer segmentation by industry
  - Channel/dealer information
  - Competitor benchmarking data
  - Top 10 customer lists

**User Input:**
- Manual data entry via edit forms (section `.edit-section`)
- File uploads (JSON import via file input `#json-import`)
- Direct cell editing in tables (inline inputs with class `.edit-input*`)

## Monitoring & Observability

**Error Tracking:**
- None detected
- No Sentry, Datadog, or similar service

**Logs:**
- Browser console only (via `console.log`, `console.error`, etc.)
- No structured logging service
- No performance monitoring

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase
- Presumed: Any static file host (GitHub Pages, Netlify, Vercel, traditional web server, etc.)

**CI Pipeline:**
- None detected
- No GitHub Actions, GitLab CI, or CI/CD configuration files

**Version Control:**
- Git repository (`.git` directory present)
- Recent commits indicate manual versioning:
  - `4109cb5`: "v28 - [완료] index/v22 통합, 크롬호환, 직접입력방식 전환"
  - `ea91a7f`: "AICC 대시보드 v27"

## Environment Configuration

**Required env vars:**
- None - No environment variables used

**Configuration Location:**
- All configuration hardcoded in HTML:
  - CSS variables in `:root` selector (line 25-36)
  - Chart defaults at line 5386: `Chart.defaults.color`, `Chart.defaults.borderColor`, `Chart.defaults.font.family`
  - Formatting constants: `PINK`, `BLUE`, `GREEN`, `AMBER`, `GRAY` color codes
  - Grid styling function at line 5390: `grid()=>(color:'#f0f0f0', ...)`

**Secrets location:**
- No secrets management needed (public application)
- No API keys, tokens, or credentials

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Content Delivery

**Fonts:**
- Google Fonts (CDN): `fonts.googleapis.com` for "DM Mono" font
  - URL: `https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500`
  - Preconnect: `<link rel="preconnect" href="https://fonts.googleapis.com">` (line 6)

- jsDelivr CDN: Pretendard font
  - URL: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css` (line 11)

**Local Libraries:**
- Chart.js: `libs/chart.umd.min.js` (local file)
- XLSX: `libs/xlsx.full.min.js` (local file)

## Data Exchange Formats

**Supported:**
- JSON - Import/export for dashboard state via `importJson()` and `exportJson()`
- Excel (via XLSX library) - Potential support in code but primary method is JSON

**File I/O:**
- Download: Uses `URL.createObjectURL(blob)` to create downloadable files
- Upload: Uses HTML5 file input with `accept=".json"`
- No streaming or chunked uploads

## Browser APIs Used

**Enabled:**
- File API: `Blob`, `URL.createObjectURL()`, `HTMLInputElement.files`
- Canvas API: For Chart.js rendering
- DOM API: `getElementById`, `classList`, `insertAdjacentHTML`, etc.
- LocalStorage: Explicitly NOT used (see line 5447 comment)

**Not Used:**
- IndexedDB
- Web Workers
- Service Workers
- Geolocation
- Notifications API

---

*Integration audit: 2026-03-29*
