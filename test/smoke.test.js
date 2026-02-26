const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const requiredFiles = [
  'frontend/index.html',
  'frontend/styles.css',
  'frontend/app.js'
];

test('frontend temel dosyaları mevcut', () => {
  for (const filePath of requiredFiles) {
    assert.equal(fs.existsSync(filePath), true, `${filePath} bulunamadı`);
  }
});
