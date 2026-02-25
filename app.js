const form = document.getElementById('browser-form');
const urlInput = document.getElementById('url-input');
const viewport = document.getElementById('viewport');
const statusText = document.getElementById('status');
const quickLinks = document.querySelector('.quick-links');
const browserCanvas = document.getElementById('browser-canvas');

const canvasState = {
  url: 'https://example.com',
  phase: 'hazır',
  error: '',
};

function normalizeUrl(rawValue) {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return null;
    }
  }
}

function drawCanvas() {
  const ctx = browserCanvas.getContext('2d');
  if (!ctx) return;

  const { width, height } = browserCanvas;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, width, 42);

  const dots = ['#ef4444', '#f59e0b', '#22c55e'];
  dots.forEach((color, i) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(24 + i * 18, 21, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#334155';
  ctx.fillRect(95, 10, width - 115, 22);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText(canvasState.url, 105, 25);

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText(`Durum: ${canvasState.phase}`, 22, 74);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  if (canvasState.error) {
    ctx.fillStyle = '#fca5a5';
    ctx.fillText(canvasState.error, 22, 100);
  } else {
    ctx.fillText('Not: Bazı siteler iframe içinde güvenlik nedeniyle açılmaz.', 22, 100);
  }
}

function setState(nextState) {
  Object.assign(canvasState, nextState);
  drawCanvas();
}

function navigateTo(rawValue) {
  const normalized = normalizeUrl(rawValue);

  if (!normalized) {
    statusText.textContent = 'Geçerli bir URL girin. Örnek: https://example.com';
    setState({ phase: 'hata', error: 'Geçersiz URL girdiniz.' });
    return;
  }

  viewport.src = normalized;
  urlInput.value = normalized;
  statusText.textContent = `Yükleniyor: ${normalized}`;
  setState({ url: normalized, phase: 'yükleniyor', error: '' });
}

function syncCanvasSize() {
  const ratio = window.devicePixelRatio || 1;
  const displayWidth = browserCanvas.clientWidth;
  const displayHeight = browserCanvas.clientHeight;
  browserCanvas.width = Math.floor(displayWidth * ratio);
  browserCanvas.height = Math.floor(displayHeight * ratio);
  const ctx = browserCanvas.getContext('2d');
  if (ctx) {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  drawCanvas();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  navigateTo(urlInput.value);
});

quickLinks.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  navigateTo(target.dataset.url ?? '');
});

viewport.addEventListener('load', () => {
  statusText.textContent = `Açıldı: ${urlInput.value}`;
  setState({ phase: 'açıldı', error: '' });
});

viewport.addEventListener('error', () => {
  statusText.textContent = 'Site yüklenemedi veya iframe içinde engellendi.';
  setState({ phase: 'hata', error: 'Site yüklenemedi/engellendi.' });
});

window.addEventListener('resize', syncCanvasSize);

statusText.textContent = 'Başlamak için bir URL girin.';
syncCanvasSize();
