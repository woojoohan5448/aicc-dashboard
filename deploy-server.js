/**
 * 배포 서버 — 2단계 순차 실행
 *   POST /save-seed  → D 데이터로 index.html SEED 업데이트
 *   POST /git-push   → git add + commit + push
 * 실행: node deploy-server.js
 * 포트: 4444
 */
const http = require('http');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4444;
const REPO = path.resolve(__dirname);
const HTML = path.join(REPO, 'index.html');

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString())); } catch(e) { reject(e); } });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // ── Step 1: SEED 업데이트 ──
  if (req.method === 'POST' && req.url === '/save-seed') {
    try {
      const body = await readBody(req);
      const D = body.data;
      if (!D) throw new Error('data 필드가 없습니다');

      let html = fs.readFileSync(HTML, 'utf-8');
      const seedRe = /^(let SEED = ).*$/m;
      if (!seedRe.test(html)) throw new Error('SEED 패턴을 찾을 수 없습니다');
      html = html.replace(seedRe, `$1${JSON.stringify(D)};`);
      fs.writeFileSync(HTML, html, 'utf-8');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      const errMsg = (e.stderr || e.stdout || e.message || '').toString().trim();
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: errMsg }));
    }
    return;
  }

  // ── Step 2: git add + commit + push ──
  if (req.method === 'POST' && req.url === '/git-push') {
    try {
      const now = new Date();
      const ts = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const msg = `v29 - 데이터 업데이트 (${ts})`;

      execSync('git add index.html', { cwd: REPO, encoding: 'utf-8' });
      execSync(`git commit -m "${msg}"`, { cwd: REPO, encoding: 'utf-8' });
      execSync('git push', { cwd: REPO, encoding: 'utf-8', timeout: 30000 });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: ts }));
    } catch (e) {
      const errMsg = (e.stderr || e.stdout || e.message || '').toString().trim();
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: errMsg }));
    }
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Deploy server running on http://localhost:${PORT}`);
  console.log(`  POST /save-seed → index.html SEED 업데이트`);
  console.log(`  POST /git-push  → git add + commit + push`);
});
