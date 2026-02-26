# Mini Web Viewer İskeleti

Bu repo, temel bir web görüntüleyici arayüzü için başlangıç iskeleti içerir.

## Proje Yapısı

- `frontend/index.html`: URL alanı, gezinme butonları ve iframe/fallback görünümü.
- `frontend/styles.css`: Basit arayüz stilleri.
- `frontend/app.js`: URL yönlendirme, geri/ileri/yenile akışı ve fallback davranışı.

## Çalıştırma

```bash
npm run start
```

Sonrasında tarayıcıdan `http://localhost:4173/frontend/` adresini açın.

## Teknik Yaklaşım

### 1) Gerçek tarayıcı motoru hedefi (önerilen)
Gerçek bir tarayıcı deneyimi (tam geçmiş yönetimi, güvenlik modeli, olaylar, yükleme durumları vb.) hedefleniyorsa **Electron** tabanlı yaklaşım tercih edilmelidir:

- `BrowserWindow` ile uygulama penceresi oluşturulur.
- `webContents.loadURL(...)` ile sayfa yüklenir.
- `webContents.goBack()`, `goForward()`, `reload()` gibi API'ler kullanılır.

### 2) Gömülü görünüm hedefi (bu iskelet)
Bu repo, hızlı prototip için **iframe tabanlı** yaklaşımı uygular.

Kısıtlar:
- Birçok site `X-Frame-Options` veya `Content-Security-Policy: frame-ancestors` nedeniyle iframe içinde açılamaz.
- Cross-origin politikaları nedeniyle iframe içeriğinin durumunu güvenilir biçimde denetlemek sınırlıdır.
- Bu nedenle uygulamada kullanıcıya bilgilendirici bir fallback ekranı gösterilir.

## Komutlar

- `npm run start`: Python tabanlı statik geliştirme sunucusu başlatır.
- `npm run lint`: `frontend/app.js` için sözdizimi kontrolü çalıştırır.
- `npm test`: Node test runner ile temel doğrulama testini çalıştırır.
