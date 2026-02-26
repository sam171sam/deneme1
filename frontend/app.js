const urlInput = document.getElementById('url-input');
const contentFrame = document.getElementById('content-frame');
const fallback = document.getElementById('fallback');
const fallbackUrl = document.getElementById('fallback-url');

const historyStack = [];
let currentIndex = -1;

const normalizeUrl = (value) => {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).toString();
  } catch {
    return new URL(`https://${value}`).toString();
  }
};

const updateNavButtons = () => {
  document.getElementById('back-btn').disabled = currentIndex <= 0;
  document.getElementById('forward-btn').disabled = currentIndex >= historyStack.length - 1;
  document.getElementById('refresh-btn').disabled = currentIndex < 0;
};

const showFallback = (url) => {
  contentFrame.classList.add('hidden');
  fallback.classList.remove('hidden');
  fallbackUrl.textContent = `Açmayı deneyebileceğiniz adres: ${url}`;
};

const showFrame = () => {
  fallback.classList.add('hidden');
  contentFrame.classList.remove('hidden');
};

const navigate = (rawUrl, pushHistory = true) => {
  const normalizedUrl = normalizeUrl(rawUrl);

  if (!normalizedUrl) {
    return;
  }

  urlInput.value = normalizedUrl;

  if (pushHistory) {
    historyStack.splice(currentIndex + 1);
    historyStack.push(normalizedUrl);
    currentIndex = historyStack.length - 1;
  }

  showFrame();
  contentFrame.src = normalizedUrl;
  updateNavButtons();
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
  const expectedUrl = historyStack[currentIndex];

  if (!expectedUrl) {
    return;
  }

  window.setTimeout(() => {
    if (contentFrame.src === expectedUrl && contentFrame.contentWindow?.length === 0) {
      showFallback(expectedUrl);
    }
  }, 600);
});

updateNavButtons();
