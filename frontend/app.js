const urlInput = document.getElementById('url-input');
const contentFrame = document.getElementById('content-frame');
const fallback = document.getElementById('fallback');
const fallbackUrl = document.getElementById('fallback-url');
const externalLink = document.getElementById('open-external-link');
const statusText = document.getElementById('status-text');

const historyStack = [];
let currentIndex = -1;
let fallbackTimer = null;

const setStatus = (message) => {
  statusText.textContent = `Durum: ${message}`;
};

const normalizeUrl = (value) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    return new URL(`https://${trimmed}`).toString();
  }
};

const updateNavButtons = () => {
  document.getElementById('back-btn').disabled = currentIndex <= 0;
  document.getElementById('forward-btn').disabled = currentIndex >= historyStack.length - 1;
  document.getElementById('refresh-btn').disabled = currentIndex < 0;
};

const showFallback = (url, reason) => {
  contentFrame.classList.add('hidden');
  fallback.classList.remove('hidden');
  fallbackUrl.textContent = `Adres: ${url}`;
  externalLink.href = url;
  setStatus(reason);
};

const showFrame = () => {
  fallback.classList.add('hidden');
  contentFrame.classList.remove('hidden');
};

const clearFallbackTimer = () => {
  if (fallbackTimer) {
    window.clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
};

const navigate = (rawUrl, pushHistory = true) => {
  let normalizedUrl;

  try {
    normalizedUrl = normalizeUrl(rawUrl);
  } catch {
    setStatus('Geçersiz URL');
    return;
  }

  if (!normalizedUrl) {
    setStatus('URL giriniz');
    return;
  }

  urlInput.value = normalizedUrl;

  if (pushHistory) {
    historyStack.splice(currentIndex + 1);
    historyStack.push(normalizedUrl);
    currentIndex = historyStack.length - 1;
  }

  clearFallbackTimer();
  showFrame();
  contentFrame.src = normalizedUrl;
  setStatus('Yükleniyor...');
  updateNavButtons();

  fallbackTimer = window.setTimeout(() => {
    showFallback(
      normalizedUrl,
      'Site iframe içinde engelli olabilir. Önizleme için yeni sekmede açmayı deneyin.'
    );
  }, 3500);
};

document.getElementById('go-btn').addEventListener('click', () => navigate(urlInput.value));

urlInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    navigate(urlInput.value);
  }
});

document.getElementById('back-btn').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    navigate(historyStack[currentIndex], false);
  }
});

document.getElementById('forward-btn').addEventListener('click', () => {
  if (currentIndex < historyStack.length - 1) {
    currentIndex += 1;
    navigate(historyStack[currentIndex], false);
  }
});

document.getElementById('refresh-btn').addEventListener('click', () => {
  if (currentIndex >= 0) {
    navigate(historyStack[currentIndex], false);
  }
});

contentFrame.addEventListener('load', () => {
  clearFallbackTimer();
  setStatus('Yüklendi');
});

contentFrame.addEventListener('error', () => {
  const activeUrl = historyStack[currentIndex] ?? urlInput.value;
  showFallback(activeUrl, 'Yükleme hatası oluştu.');
});

updateNavButtons();
