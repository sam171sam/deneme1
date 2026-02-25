# Canvas Destekli Mini Çevrimiçi Tarayıcı

Bu proje, URL girerek siteleri `iframe` içinde açmayı dener ve üstteki HTML5 `canvas` panelinde gezinme durumunu görselleştirir.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
```

Ardından `http://localhost:8000` adresine gidin.

## GitHub üzerinden çalıştırma

Repo'da GitHub Pages için workflow hazırdır (`.github/workflows/deploy-pages.yml`).

1. Repo'yu GitHub'a push edin.
2. GitHub'da **Settings → Pages** bölümünde **Source = GitHub Actions** seçin.
3. Push sonrası Actions sekmesindeki deploy job'ı tamamlanınca site yayınlanır:
   - `https://<kullanici>.github.io/<repo>/`

## Önemli not

Birçok site `X-Frame-Options` veya `Content-Security-Policy` nedeniyle iframe içinde görüntülenemez. Bu durumda canvas paneli durum bilgisini göstermeye devam eder.
