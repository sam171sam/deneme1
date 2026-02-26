const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const requiredFiles = ['frontend/index.html', 'frontend/styles.css', 'frontend/app.js'];

test('frontend temel dosyaları mevcut', () => {
  for (const filePath of requiredFiles) {
    assert.equal(fs.existsSync(filePath), true, `${filePath} bulunamadı`);
  }
});

test('önizleme bileşenleri index.html içinde tanımlı', () => {
  const html = fs.readFileSync('frontend/index.html', 'utf8');

  assert.match(html, /id="url-input"/);
  assert.match(html, /id="go-btn"/);
  assert.match(html, /id="content-frame"/);
  assert.match(html, /id="fallback"/);
  assert.match(html, /id="open-external-link"/);
});
