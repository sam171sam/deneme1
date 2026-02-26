# Mini Web Viewer İskeleti

Bu repo, önizleme bölmesinde (preview pane) hızlıca harici URL açmak için hazırlanmış bir web görüntüleyici iskeleti içerir.

## Proje Yapısı

- `frontend/index.html`: URL alanı, gezinme kontrolleri, önizleme paneli ve fallback ekranı.
- `frontend/styles.css`: Araç çubuğu + önizleme bölmesi yerleşimi.
- `frontend/app.js`: URL normalizasyonu, geri/ileri/yenile, durum metni ve fallback akışı.
- `test/smoke.test.js`: Temel dosyaların varlığını doğrulayan test.

## Çalıştırma

```bash
npm run start
```

Ardından `http://localhost:4173/frontend/` adresini açın.

## Önizleme Bölmesi İçin Teknik Notlar

- Bu sürümde içerik iframe ile sağ taraftaki önizleme bölmesinde gösterilir.
- Birçok site `X-Frame-Options` veya `CSP frame-ancestors` nedeniyle iframe'de açılmaz.
- Böyle bir durumda uygulama fallback ekranı gösterir ve **"Yeni sekmede aç"** bağlantısı sunar.

## Tam Tarayıcı Motoru Gereksinimi (Electron)

Eğer hedef; geliştirici araçları, daha güvenilir gezinme yönetimi ve gerçek tarayıcı davranışıysa Electron yaklaşımı tercih edilmelidir:

- `BrowserWindow`
- `webContents.loadURL(...)`
- `webContents.goBack() / goForward() / reload()`

## Komutlar

- `npm run start`: Python tabanlı statik sunucu açar.
- `npm run lint`: `frontend/app.js` için sözdizimi kontrolü yapar.
- `npm test`: Node test runner ile smoke testi çalıştırır.
