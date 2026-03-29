# Coding Conventions

**Analysis Date:** 2026-03-29

## Naming Patterns

**Files:**
- Single HTML file structure: `index.html` (monolithic application with embedded CSS and JavaScript)
- Library files: kebab-case with `.min.js` suffix for minified libraries (e.g., `chart.umd.min.js`, `xlsx.full.min.js`)

**Functions:**
- camelCase for all function names
- Verb-prefix pattern for action functions: `build*` (e.g., `buildOv`, `buildKpi`, `buildSub`, `buildBld`, `buildCh`, `buildComp`, `buildEdit`)
- Utility functions with simple verbs: `go`, `toast`, `dc`, `fmt`, `fmtP`, `fmtK`, `rebuildAll`
- Event handlers use verb or `toggle` pattern: `toggleSection`, `removeGenRow`, `removeMonRow`, `addMonRow`, `applyEditData`, `exportJson`
- Getter functions use `get` prefix: `g()` as inline lambda for `document.getElementById`

**Variables:**
- Global data objects use UPPERCASE: `SEED`, `D`, `charts`
- Constants use UPPERCASE: `PINK`, `BLUE`, `GREEN`, `AMBER`, `GRAY`, `PD`, `PD2` (color values)
- Local variables use camelCase: `kpi`, `an`, `mon`, `ch`, `bld`, `kd`, `cm`, `ctx`, `meta`
- Array/object keys use camelCase: `cumIdx`, `bldYearIdxs`, `subRevData`, `bldRevData`
- Single-letter variables used in tight loops: `i`, `v`, `e`, `s`, `p`, `l`, `m` (acceptable in data mapping contexts)
- Abbreviations used for brevity: `nv()` (numeric value), `sv()` (string value), `el` (element), `ctx` (canvas context)

**Types/Objects:**
- Data objects as flat structures with underscore-separated keys: `y25_cum`, `m2601`, `y26_sum`, `sub_lines`, `bld_order`
- Nested object structures use camelCase properties: `current`, `target`, `grades`, `annual`, `monthly`
- DOM element IDs use kebab-case: `p-ov`, `c-ba`, `k-bld`, `tbody-mon`, `tbody-ind` (with prefix indicating element type)

## Code Style

**Formatting:**
- No external formatter detected; code uses compact single-line styles for CSS and mixed styles for JavaScript
- CSS: inline styles with compressed format (minimal whitespace, semicolon-terminated)
- JavaScript: mix of single-line and multi-line statements
  - Simple assignments and function calls on single lines
  - Complex logic (conditionals, loops) use line breaks for readability
  - Template literals used extensively for HTML generation
  - Object destructuring used for parameter extraction: `const {chartArea}=chart`

**Linting:**
- No ESLint or equivalent detected; code follows no formal linting rules
- Implicit console-based error logging: `console.error('buildOv error:', e)`
- Try-catch wrapping for initialization code to prevent silent failures

**Indentation:**
- 2 spaces for nested structures in JavaScript
- Template literals preserve indentation within backticks

## Import Organization

**Global Scope:**
- External libraries loaded via `<script>` tags before inline code
- Chart.js: `Chart` global object
- XLSX: `XLSX` global object (not used but available)
- All application code in single `<script>` block starting at line 3538

**Execution Order:**
1. HTML document load
2. CSS parsing (inline `<style>`)
3. External library loading (`chart.umd.min.js`, `xlsx.full.min.js`)
4. Application initialization (SEED data, global variables)
5. Chart.defaults configuration
6. Function definitions (no explicit import/export pattern)
7. Window load event listener for `buildOv()` initialization

**Path Aliases:**
- Not used; all references are direct global access
- Library access through global objects: `Chart`, `XLSX`

## Error Handling

**Patterns:**
- Silent failure with try-catch wrapper: `try { buildOv(); } catch(e) { console.error(...) }`
- Nullish coalescing for default values: `kpi.profit||0`, `an.sub_rev?.[ci]??139`
- Ternary operators for conditional returns: `v==null?'—':typeof v==='number'?v.toLocaleString('ko-KR'):String(v)`
- Guard clauses to prevent errors: `if(!el)return;`, `if(!chartArea)return;`
- No explicit validation; relies on optional chaining (`?.`) and nullish coalescing (`??`)
- Toast notifications for user-facing errors: `toast(icon, msg, sub)`

**No Error Propagation:**
- Errors in chart rendering are silently caught and logged
- Missing DOM elements return undefined without throwing
- Invalid data values default to `null` or `0`

## Logging

**Framework:** console (native browser API)

**Patterns:**
- Error logging: `console.error('buildOv error:', e)` - minimal information
- No debug logging, warning, or info logs detected
- No centralized logging service

## Comments

**When to Comment:**
- Section headers using ASCII art: `/* ── Section Name ── */`
- Few inline comments; code intent conveyed through function names
- Comments mark functional boundaries between major features
- Korean language comments used for specific domain terminology

**JSDoc/TSDoc:**
- Not used; no formal documentation pattern
- Functions self-documented through descriptive names and parameter usage

## Function Design

**Size:**
- Functions range from 5 lines (utility formatters like `fmt`) to 150+ lines (complex builders like `applyEditData`)
- Larger functions group related data manipulation into logical blocks
- No explicit line limit enforced

**Parameters:**
- Most builder functions take no parameters (rely on global `D` object)
- Utility functions take simple types: `fmt(v)`, `fmtP(v)`, `dc(id)`
- Complex functions use object destructuring: `const {chartArea}=chart`
- Arrow functions used for inline callbacks and map/filter operations

**Return Values:**
- Builder functions return undefined (side effects: DOM manipulation)
- Formatter functions return strings or numbers: `fmt()`, `fmtP()`, `fmtK()`
- Event handlers return nothing; DOM updates trigger via `rebuildAll()`
- Data transformation functions return modified objects or arrays

## Module Design

**Exports:**
- No module system; all functions are global scope
- Data structures stored in global variables: `SEED`, `D` (working copy)

**Barrel Files:**
- Not applicable; single file architecture

**File Organization:**
- Single `index.html` contains:
  1. HTML structure (400 lines)
  2. Inline CSS styles (1800+ lines)
  3. Inline JavaScript (3200+ lines)
- Order within JavaScript:
  1. Global data initialization (`SEED`, `D`)
  2. Configuration (Chart.defaults, color constants)
  3. Utility functions (formatters, helpers)
  4. Tab navigation (`go`, `buildPage`)
  5. Display builders (`buildOv`, `buildKpi`, `buildSub`, etc.)
  6. Chart rendering plugins
  7. Data editing functions (`applyEditData`, export/import)
  8. Event initialization (`window.addEventListener`)

## Data Access Patterns

**Hierarchy:**
- Global state: `D` object (mutable working copy of `SEED`)
- Data structure: nested objects with arrays
- Access pattern: destructuring at function start, then direct property access

**Example:**
```javascript
function buildOv(){
  const kpi=D.summary.kpi, an=D.summary.annual,
        mon=D.subscription.monthly, ch=D.channel, bld=D.buildup;
  const el=document.getElementById('p-ov');
  // Use kpi, an, mon, ch, bld directly throughout function
}
```

**State Mutation:**
- Direct mutation of `D` object properties in `applyEditData()`
- No intermediate state layer; all UI updates trigger full `rebuildAll()`
- `saveToLocal()` assumed to persist changes (implementation not shown in explored section)

## Spacing and Punctuation

**CSS:**
- No spacing around colons in properties: `margin:0`, `padding:0`
- Comma-separated selectors on single line: `*, *::before, *::after { ... }`

**JavaScript:**
- No spaces inside parentheses: `if(v===0)`, `function(a,b)`
- Spaces around binary operators: `a+b`, `a||b`
- Template literals: backticks for string interpolation
- Object destructuring without spaces: `const {chartArea}=chart`

## DOM ID Naming

**Patterns:**
- Page containers: `p-{pageName}` (e.g., `p-ov`, `p-kpi`, `p-sub`, `p-bld`, `p-ch`, `p-comp`, `p-edit`)
- Chart containers: `c-{chartName}` (e.g., `c-ba`, `c-bi`, `c-ca`, `c-ch-trend`)
- KPI card grids: `k-{sectionName}` (e.g., `k-bld`, `k-ch`)
- Table bodies: `tbody-{dataType}` (e.g., `tbody-mon`, `tbody-ind`, `tbody-contracts`)
- Edit sections: `s-{sectionName}` (e.g., `s-kpi`, `s-annual`, `s-mon`)
- Legend elements: `l-{chartName}` (e.g., `l-bi`)
- Input fields: ID pattern matches their data path (e.g., `mon_lbl_${mi}`, `prod_lines_${i}`)

---

*Convention analysis: 2026-03-29*
