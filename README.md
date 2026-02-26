# Canvas Tarayıcı + Önizleme Demo

Bu proje, canvas katmanı ve iframe kullanan basit bir tarayıcı benzeri arayüzdür.

## Çalıştırma

```bash
python3 -m http.server 4173
```

Sonrasında `http://localhost:4173` adresini açın.

## Önizlemede kullanım

- **Önizleme modu** varsayılan olarak açıktır ve `srcdoc` üzerinden HTML içerik gösterir.
- Üstteki editörde HTML değiştirip **Önizlemeyi Uygula** butonuna basarak anında test edebilirsiniz.
- URL ile gitmek istediğinizde adres çubuğunu kullanın.
- Site iframe içinde engellenirse **Yeni Sekmede Aç** butonuna tıklayın.

## Notlar

- Bu bir gerçek browser engine değildir; sistem tarayıcınız içinde çalışan bir arayüzdür.
- Birçok site güvenlik nedeniyle iframe içinde açılmayı engeller (`X-Frame-Options`, `CSP`).
