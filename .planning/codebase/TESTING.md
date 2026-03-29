# Testing Patterns

**Analysis Date:** 2026-03-29

## Test Framework

**Status:** Not detected

**Runner:**
- No test runner detected (Jest, Vitest, Mocha, etc. not present)
- No test configuration files (`jest.config.js`, `vitest.config.ts`, etc.)
- No test command in package.json (no package.json detected)

**Assertion Library:**
- Not used; no formal testing framework

**Manual Testing Approach:**
- Browser-based manual testing only
- No automated test suite
- Error tracking via `try-catch` wrapper at initialization: `window.addEventListener('load', () => { try { buildOv(); } catch(e) { console.error(...) } })`

## Testing Structure

**Current Approach:**
- Monolithic single-file architecture (`index.html`) prevents unit testing
- All logic is DOM-dependent; no separation of business logic from UI
- Manual verification through browser console and visual inspection

**Implicit Tests (Validation Patterns):**

The codebase has implicit validation in data transformation:

```javascript
// Nullish coalescing for safe fallbacks
const cumIdx = (an.labels||[]).findIndex(l=>String(l).includes('누적'));
const ci = cumIdx>=0 ? cumIdx : (an.sub_rev||[]).length-1;
const subRev = an.sub_rev?.[ci] ?? 139;  // Default to 139 if missing
```

**Error Handling Tests (Implicit):**

```javascript
// Guard clauses prevent null-reference errors
if(!chartArea)return;  // Silent failure for missing canvas area
if(!el)return;         // Skip render if element missing
if(v==null)return;     // Skip data rendering if null
```

## Common Testing Scenarios

**Data Loading:**
- SEED object loaded at startup with large hardcoded JSON (~3500 lines)
- Deep copy via `JSON.parse(JSON.stringify(SEED))` creates working `D` object
- Implicitly tests JSON parsing and data structure integrity

**Data Editing:**
The `applyEditData()` function (lines 6100-6370) is the primary data mutation function:
```javascript
function applyEditData(){
  const nv=id=>{const el=g(id);return el&&el.value!==''?parseFloat(el.value):null;};
  const sv=id=>{const el=g(id);return el?el.value.trim()||null:null;};

  // Type coercion: parseFloat for numbers, trim for strings
  kpi.base_period=sv('kpi_base')||kpi.base_period;
  kpi.total_rev=nv('kpi_total_rev')??kpi.total_rev;

  // Array mapping and accumulation
  rows.forEach(tr=>{
    const lbl=tr.querySelector(`#mon_lbl_${idx}`)?.value.trim();
    if(!lbl)return;  // Guard: skip empty rows
    newLabels.push(lbl);
  });
}
```

**Chart Rendering:**
- Chart destruction before creation: `dc('c-ba'); charts['c-ba']=new Chart(...)`
- Plugin-based label rendering validates canvas context availability
- Implicit null-value handling in data arrays

```javascript
// Chart dataset filtering
const bldAllOrders=[...bldOrders,bldCumOrder];
const bldAllCounts=[...bldCounts,bldCumCount];
const bldMax=Math.max.apply(null,(bldAllOrders||[]).filter(function(v){return v!=null;}));
```

**Number Formatting Tests (Implicit):**

```javascript
const fmt=v=>v==null?'—':typeof v==='number'?v.toLocaleString('ko-KR'):String(v);
const fmtP=v=>{if(v==null)return'—';const n=v<=1?v*100:v;return Math.round(n)+'%';};
const fmtK=v=>{
  if(v===0)return '0';
  if(v>=1000){const k=v/1000;return (k===Math.floor(k)?k:k.toFixed(1))+'천';}
  return v+'';
};
```

Test cases (implicit):
- `fmt(null)` → `'—'`
- `fmt(1000)` → `'1,000'`
- `fmt('text')` → `'text'`
- `fmtP(0.6)` → `'60%'`
- `fmtP(null)` → `'—'`
- `fmtK(2500)` → `'2.5천'`
- `fmtK(1000)` → `'1천'`

## Data Validation Patterns

**Input Validation in Edit Functions:**

```javascript
// Monthly data: skip rows with empty labels
const lbl=tr.querySelector(`#mon_lbl_${idx}`)?.value.trim();
if(!lbl)return;  // Guard clause

// Top10 customers: filter out falsy results
const items=rows.map(tr=>{...}).filter(Boolean);
if(items.length>0)D.top10[pname]=items;
```

**Type Coercion:**
- `parseFloat()` for numeric inputs (may return `NaN`)
- `trim()` for string inputs
- Nullish coalescing (`??`) for fallbacks
- Logical OR (`||`) for default values

**Example - Dealer Data Processing:**
```javascript
const dealers=[];
rows.forEach(tr=>{
  const region=tr.querySelector(`#dl_region_${idx}`)?.value.trim()||'';
  const name=tr.querySelector(`#dl_name_${idx}`)?.value.trim()||'';
  const y25=parseFloat(tr.querySelector(`#dl_y25_${idx}`)?.value)||0;  // Default to 0
  if(name)dealers.push({...});  // Only add if name present
});
if(dealers.length>0){...}  // Only update if data exists
```

## Browser Compatibility Testing

**Detected Patterns:**

Modern JavaScript features used:
- Optional chaining: `?.` (ECMAScript 2020)
- Nullish coalescing: `??` (ECMAScript 2020)
- Template literals (ES6)
- Arrow functions (ES6)
- `Array.findIndex()`, `Array.includes()` (ES6+)
- `Object.values()`, `Object.entries()` not extensively used

**Browser Requirements:**
- Chrome/Edge: Full support
- Safari: Full support (ES2020 compatible)
- Firefox: Full support
- IE11: **Not supported** (optional chaining, nullish coalescing not available)

## UI State Testing (Implicit)

**Tab Navigation:**
```javascript
function go(name,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.tb').forEach(b=>b.classList.remove('on'));
  document.getElementById('p-'+name).classList.add('on');
  btn.classList.add('on');
  buildPage(name);
}
```
Implicit tests:
- All pages deactivated before new page activation
- Button state synchronized with page state
- Page name correctly routes to builder function

**Section Toggle:**
```javascript
function toggleSection(id){
  const el=document.getElementById(id);
  if(!el)return;
  const sh=el.previousElementSibling;
  if(!sh)return;
  el.classList.toggle('on');
  sh.querySelector('span').textContent=el.classList.contains('on')?'▲':'▼';
}
```

## Performance Implicit Assumptions

**Chart Caching:**
```javascript
let charts={};
function dc(id){
  if(charts[id]){charts[id].destroy();delete charts[id];}
}
```
Prevents memory leaks by destroying old chart instances before creating new ones.

**DOM Batching:**
- Full `rebuildAll()` called after data changes (single redraw cycle)
- Not ideal for large datasets but acceptable for ~50 charts

**Data Copying:**
```javascript
let D = JSON.parse(JSON.stringify(SEED));
```
Deep copy prevents accidental mutation of original data during development.

## No Mocking Framework Detected

- No mock data generators (factories)
- Large hardcoded SEED object serves as test data
- Single global `D` object prevents independent test isolation
- No spy/stub patterns for function verification

## Testing Gaps

**Critical Untested Areas:**

1. **Chart.js Integration:**
   - Plugin callbacks (`afterDatasetsDraw`, `afterDatasetsDraw`) not tested
   - Canvas rendering logic (pixel coordinates, text positioning)
   - Tooltip formatting and legend rendering

2. **Data Mutation:**
   - `applyEditData()` function (200+ lines) has no validation
   - Array index manipulation (monthly data, Top10 reordering)
   - Edge case: adding/removing rows while rendering

3. **DOM Manipulation:**
   - Dynamic table row generation and deletion
   - Event handler attachment/detachment
   - HTML template literal correctness

4. **Number Formatting:**
   - Rounding precision (`toFixed(1)` vs `toFixed(2)`)
   - Locale-specific formatting (`toLocaleString('ko-KR')`)
   - Large number handling (>999,999)

5. **Export/Import:**
   - `exportJson()` function (not fully explored)
   - `JSON.stringify(D)` serialization completeness
   - Import validation for external JSON files

## Recommended Testing Strategy

**If implementing automated tests:**

1. **Extract Business Logic:**
   - Move formatters to separate module: `fmt`, `fmtP`, `fmtK`
   - Create data validation module for `applyEditData` logic
   - Separate chart configuration from rendering

2. **Unit Tests (with Jest/Vitest):**
   - Number formatter tests (all edge cases)
   - Data transformation tests (month/industry/contract parsing)
   - Grade calculation for KPI system

3. **Integration Tests:**
   - Data editing workflow (input → `applyEditData()` → DOM update)
   - Tab navigation and page building
   - Export/import JSON round-trip

4. **E2E Tests (Playwright/Cypress):**
   - Full user workflows (data entry, chart verification)
   - Export to Excel (requires XLSX library integration testing)
   - Cross-browser compatibility (Safari, Edge)

---

*Testing analysis: 2026-03-29*
