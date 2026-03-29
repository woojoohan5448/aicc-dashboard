# Codebase Concerns

**Analysis Date:** 2026-03-29

## Architecture & Code Structure

**Monolithic Single HTML File:**
- Issue: Entire application (6,380 lines) is a single `index.html` file with inline styles, HTML, and JavaScript
- Files: `index.html`
- Impact: Makes maintenance difficult, code splitting impossible, testing hard to implement, version control less granular
- Fix approach: Extract JavaScript into separate modules, separate CSS into stylesheets, create reusable component library

**Global State Management:**
- Issue: Data is stored in global variables `SEED` and `D` with direct mutation throughout the codebase
- Files: `index.html` (lines 3538+, throughout JavaScript)
- Impact: No state isolation, difficult to track data changes, multiple paths to modify state leading to bugs
- Fix approach: Implement state management pattern (publish-subscribe, observable pattern, or simple event emitter)

**No Separation of Concerns:**
- Issue: Business logic, UI rendering, and data manipulation are deeply intertwined
- Files: `index.html` - chart rendering functions like `buildOv()`, `buildComp()`, `buildSub()` directly manipulate DOM and calculate data
- Impact: Hard to test logic independently, brittle UI bindings, difficult to reuse logic
- Fix approach: Extract pure functions for calculations, create data layer separate from rendering

## Data Handling Issues

**Embedded Data Structure (SEED Object):**
- Issue: Large nested data structure (~3500+ lines) embedded directly in HTML as JSON literal
- Files: `index.html` (lines 3538-3540)
- Impact: Difficult to update/version independently, makes file size large, hard to validate schema, loading all data at startup regardless of need
- Fix approach: Move SEED data to external JSON file, implement lazy loading, add data validation schema (JSON Schema)

**Hardcoded Mock Data Mixed with Real Data:**
- Issue: KPI data is added as mock data after SEED is defined (line 5733+)
- Files: `index.html` (line 5733: `SEED.kpi = {...}`)
- Impact: Unclear what is real vs test data, testing becomes inconsistent
- Fix approach: Separate test fixtures from source data, use environment variables or configuration

**Data Mutation Without Tracking:**
- Issue: Functions like `applyEdit()` directly mutate `D` object without validation or change tracking
- Files: `index.html` (lines 6093-6366)
- Impact: No audit trail, can't undo changes, changes not validated before state update
- Fix approach: Implement transaction pattern with validation before applying state changes

## UI & DOM Manipulation

**Direct DOM Manipulation:**
- Issue: Extensive use of `innerHTML`, `insertAdjacentHTML`, `querySelector` scattered throughout code
- Files: `index.html` - functions like `buildOv()`, `buildSub()`, `buildComp()`, `buildEdit()` extensively use this pattern
- Impact: XSS vulnerability if user input not properly escaped, DOM updates inefficient, hard to test
- Fix approach: Implement templating system or virtual DOM approach, sanitize all user input

**Dynamic Element ID Generation:**
- Issue: IDs are generated dynamically using template literals and numeric indices (e.g., `mon_lbl_${i}`, `dl_region_${i}`)
- Files: `index.html` (lines 1911-1974 for month rows, 5801-5810 for dealer rows, etc.)
- Impact: When rows are added/removed, ID mismatches can occur, getElementById lookups are fragile
- Fix approach: Use data attributes instead of IDs for row indexing, implement virtual list or data binding

**Manual Form Binding:**
- Issue: Form fields are manually bound to data model through element IDs with custom getters/setters
- Files: `index.html` - functions like `nv()` (numeric value), `sv()` (string value) manually read from DOM
- Impact: No two-way binding, easy to miss updating UI when data changes, form state sync issues
- Fix approach: Implement proper data binding framework or two-way binding system

## Chart Handling

**Chart Instance Management:**
- Issue: Chart.js instances stored in global `charts` object, destroyed and recreated on every tab switch
- Files: `index.html` (lines 3700+, function `dc()` at line 5540)
- Impact: Memory leaks if charts aren't fully cleaned up, performance degradation on frequent tab switches
- Fix approach: Implement chart lifecycle management, cache chart instances per tab, proper cleanup

**Hardcoded Chart Colors:**
- Issue: Colors defined as global constants (PINK, BLUE, GRAY, etc.) but color logic scattered across chart definitions
- Files: `index.html` (lines 3595+)
- Impact: No consistent color theming, difficult to implement dark mode or custom themes
- Fix approach: Extract color palette to configuration object, create theme system

**Complex Plugin Logic:**
- Issue: Each chart has custom rendering plugins with 200+ lines of canvas drawing code
- Files: `index.html` - afterDatasetsDraw, afterDraw, afterDatasetsDraw plugins repeated across 4+ charts
- Impact: Code duplication, hard to maintain, difficult to add new chart types
- Fix approach: Extract common label drawing into shared utility functions

## Performance Issues

**File Size:**
- Issue: Single HTML file is 412KB containing all CSS, JS, inline data, chart library CDN references
- Files: `index.html`
- Impact: Slow initial load, slow parsing, poor mobile experience
- Fix approach: Bundle separate modules, minify, implement code splitting, lazy load data

**Rendering Performance:**
- Issue: `rebuildAll()` function called after edit operations rebuilds ALL visualizations
- Files: `index.html` (line 6368)
- Impact: If 10+ charts exist on page, recreating all of them on small data change is wasteful
- Fix approach: Implement selective rendering, batch updates, debounce rebuild triggers

**DOM Query Inefficiency:**
- Issue: Form data collection iterates DOM with `querySelector()` for each field individually
- Files: `index.html` (lines 6098-6270)
- Impact: Multiple DOM traversals, slow for large forms (45+ dealer rows × 6 fields each)
- Fix approach: Single DOM walk with event delegation, or use FormData API

**Nested Loops Without Optimization:**
- Issue: Data calculations use nested loops without memoization or caching
- Files: `index.html` - example: map operations over arrays followed by filter operations
- Impact: Performance degrades as data grows, especially with 45+ dealers and 10+ monthly entries
- Fix approach: Use array methods efficiently, cache intermediate results, consider indexing

## Testing & Quality

**No Automated Tests:**
- Issue: No test files, no test framework, no assertions outside of UI
- Files: None - no test files exist
- Impact: Changes can break features silently, regression testing manual only
- Fix approach: Implement testing framework (Jest, Vitest), write unit tests for calc functions, add E2E tests

**No Input Validation:**
- Issue: Form inputs accepted without validation (numbers could be negative, strings unchecked)
- Files: `index.html` (lines 5801-5810 for dealer inputs, similar for other forms)
- Impact: Invalid data can corrupt charts and calculations
- Fix approach: Add input validation layer, constraints on number ranges, required field checks

**Error Handling Missing:**
- Issue: Try-catch only on `buildOv()` at startup (line 6376), no error handling in other build functions
- Files: `index.html` (line 6376)
- Impact: Runtime errors in one chart building function crash entire page, no user notification
- Fix approach: Add error boundaries, implement error logging, show user-friendly error messages

## Data Persistence

**Data Persistence Not Implemented:**
- Issue: `saveToLocal()` function referenced but never defined (line 6367)
- Files: `index.html` (line 6367: `saveToLocal();`)
- Impact: All edits are lost on page refresh, no way to save progress
- Fix approach: Implement actual localStorage or IndexedDB persistence, add save/load UI

**Backup Strategy Unclear:**
- Issue: Comment mentions "JSON 내보내기로 백업하세요" (line 5960) but no export function visible
- Files: `index.html` (line 5960)
- Impact: Users don't know how to back up their data
- Fix approach: Implement export/import JSON functionality with UI buttons

## Security Concerns

**Hardcoded Business Data:**
- Issue: Sensitive business data (customer names, deal amounts, competitor analysis) embedded in HTML
- Files: `index.html` - company names, financial figures, customer data from lines 1318 onwards
- Impact: If this file is committed to public repo or server, data is exposed
- Fix approach: Move data to secure backend, implement access control, never commit sensitive data

**No Input Sanitization:**
- Issue: User input from forms is directly inserted into HTML via innerHTML
- Files: `index.html` - functions like `applyEdit()` collect form data and use it directly in rebuild functions
- Impact: XSS vulnerability if user enters HTML/script tags
- Fix approach: Sanitize all user input, use safe DOM APIs (textContent instead of innerHTML)

**No Authentication/Authorization:**
- Issue: No user authentication, anyone with file access can edit all data
- Files: N/A - entire application is client-side only
- Impact: No audit trail, no access control, suitable only for single trusted user
- Fix approach: Move to web application with backend, implement authentication

## Browser Compatibility

**Library Versions Not Specified:**
- Issue: Chart.js and XLSX libraries loaded from CDN without version pinning
- Files: `index.html` (lines 8-9)
- Impact: Breaking changes in library updates could break dashboard, not reproducible
- Fix approach: Pin library versions, use package manager (npm), implement version management

**CSS Variables Used Without Fallback:**
- Issue: Extensive use of CSS custom properties (--pink, --bg, etc.) without fallbacks
- Files: `index.html` (lines 25-36, used throughout CSS)
- Impact: Breaks in older browsers that don't support CSS variables
- Fix approach: Add fallback colors, test in target browsers

## Missing Features / Gaps

**No Real-Time Data Updates:**
- Issue: Data is static once loaded, no way to get live data or refresh specific sections
- Files: `index.html` - all data from SEED object at startup
- Impact: Dashboard shows stale data, users must manually refresh entire page
- Fix approach: Implement data fetching from API, add refresh buttons, consider WebSocket for real-time

**Export Functionality Not Implemented:**
- Issue: No way to export dashboard as PDF, Excel, or image
- Files: `index.html` - no export functions visible
- Impact: Users can't share reports, hard to present data
- Fix approach: Implement HTML-to-PDF (jsPDF), Canvas-to-image export, Excel export

**No Print Styling:**
- Issue: No media queries for print, page layout not optimized for printing
- Files: `index.html`
- Impact: Dashboard doesn't print well
- Fix approach: Add @media print rules, hide navigation, optimize for 8.5x11 layout

**Accessibility Issues:**
- Issue: No ARIA labels, images lack alt text, color-only information (not screen reader friendly)
- Files: `index.html` - extensive use of color coding without labels
- Impact: Screen reader users can't understand charts, colorblind users can't distinguish series
- Fix approach: Add ARIA labels, semantic HTML, color + pattern differentiation

## Technical Debt Summary

| Area | Severity | Impact | Effort |
|------|----------|--------|--------|
| Monolithic file structure | High | Maintenance nightmare | High |
| No state management | High | Bug-prone, hard to debug | Medium |
| Embedded data structure | High | Not scalable, version control issues | High |
| Direct DOM manipulation | High | XSS risk, poor performance | High |
| No tests | High | No safety net for changes | Medium |
| Missing data persistence | Medium | Users lose work | Low |
| Chart rendering inefficiency | Medium | Performance on large datasets | Medium |
| No error handling | Medium | Page crashes silently | Low |
| Hardcoded business data | High | Security & privacy risk | Medium |
| No real-time updates | Low | Stale data | Medium |

---

*Concerns audit: 2026-03-29*
