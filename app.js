const form = document.getElementById('browser-form');
const urlInput = document.getElementById('url-input');
const viewport = document.getElementById('viewport');
const statusText = document.getElementById('status');
const quickLinks = document.querySelector('.quick-links');

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

function navigateTo(rawValue) {
  const normalized = normalizeUrl(rawValue);

  if (!normalized) {
    statusText.textContent = 'Geçerli bir URL girin. Örnek: https://example.com';
    return;
  }

  viewport.src = normalized;
  urlInput.value = normalized;
  statusText.textContent = `Yükleniyor: ${normalized}`;
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
});

statusText.textContent = 'Başlamak için bir URL girin.';
