const canvas = document.getElementById('browserCanvas');
const ctx = canvas.getContext('2d');
const webView = document.getElementById('webView');
const urlInput = document.getElementById('urlInput');
const statusText = document.getElementById('statusText');
const htmlInput = document.getElementById('htmlInput');

const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const reloadBtn = document.getElementById('reloadBtn');
const openExternalBtn = document.getElementById('openExternalBtn');
const previewBtn = document.getElementById('previewBtn');
const resetPreviewBtn = document.getElementById('resetPreviewBtn');
const navForm = document.getElementById('navForm');

const historyStack = [];
let historyIndex = -1;

const previewTemplate = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Önizleme</title>
    <style>
      body { margin: 0; font-family: system-ui, sans-serif; padding: 24px; }
      .card { max-width: 680px; padding: 20px; border: 1px solid #ddd; border-radius: 12px; }
      h1 { margin-top: 0; }
      button { padding: 8px 12px; border-radius: 8px; border: 1px solid #666; }
    </style>
  </head>
  <body>
    <article class="card">
      <h1>Önizleme Hazır</h1>
      <p>Bu alanı değiştirerek kendi HTML içeriğini canlı test edebilirsin.</p>
      <button onclick="alert('Çalışıyor!')">Test butonu</button>
    </article>
  </body>
</html>`;

function setStatus(message) {
  statusText.textContent = message;
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function paintOverlay() {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.18)';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 8, width - 16, height - 16);

  ctx.font = '14px Inter, sans-serif';
  ctx.fillStyle = 'rgba(226, 232, 240, 0.9)';
  ctx.fillText('Canvas overlay aktif', 20, 34);
}

function updateButtons() {
  backBtn.disabled = historyIndex <= 0;
  forwardBtn.disabled = historyIndex >= historyStack.length - 1;
}

function navigateTo(url, addHistory = true) {
  if (!url) return;

  if (addHistory) {
    historyStack.splice(historyIndex + 1);
    historyStack.push(url);
    historyIndex = historyStack.length - 1;
  }

  urlInput.value = url;
  webView.removeAttribute('srcdoc');
  webView.src = url;
  setStatus('Harici URL açılıyor... Eğer yüklenmezse Önizleme modunu kullanın.');
  updateButtons();
}

function applyPreview(html) {
  webView.removeAttribute('src');
  webView.srcdoc = html;
  setStatus('Önizleme modu aktif: içerik srcdoc üzerinden gösteriliyor.');
}

navForm.addEventListener('submit', (event) => {
  event.preventDefault();
  navigateTo(normalizeUrl(urlInput.value));
});

backBtn.addEventListener('click', () => {
  if (historyIndex <= 0) return;
  historyIndex -= 1;
  navigateTo(historyStack[historyIndex], false);
});

forwardBtn.addEventListener('click', () => {
  if (historyIndex >= historyStack.length - 1) return;
  historyIndex += 1;
  navigateTo(historyStack[historyIndex], false);
});

reloadBtn.addEventListener('click', () => {
  if (webView.srcdoc) {
    applyPreview(htmlInput.value);
    return;
  }

  if (webView.src) {
    webView.src = webView.src;
  }
});

openExternalBtn.addEventListener('click', () => {
  const url = normalizeUrl(urlInput.value);
  if (!url) {
    setStatus('Önce geçerli bir URL girin.');
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
  setStatus('URL yeni sekmede açıldı.');
});

previewBtn.addEventListener('click', () => {
  applyPreview(htmlInput.value);
});

resetPreviewBtn.addEventListener('click', () => {
  htmlInput.value = previewTemplate;
  applyPreview(previewTemplate);
});

webView.addEventListener('load', () => {
  paintOverlay();
});

window.addEventListener('resize', () => {
  const ratio = window.devicePixelRatio || 1;
  const bounds = canvas.getBoundingClientRect();

  canvas.width = Math.floor(bounds.width * ratio);
  canvas.height = Math.floor(bounds.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  paintOverlay();
});

htmlInput.value = previewTemplate;
window.dispatchEvent(new Event('resize'));
applyPreview(previewTemplate);
updateButtons();
