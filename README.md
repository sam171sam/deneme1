# Mini Çevrimiçi İnternet Tarayıcısı

Basit bir HTML/CSS/JS uygulamasıyla URL girip siteleri `iframe` içinde açmanızı sağlar.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
```

Sonra tarayıcıdan `http://localhost:8000` adresine gidin.

## Online çalıştırma (deploy)

Bu proje tamamen statik olduğu için çok kolay deploy edilir.

### Seçenek 1: Netlify Drop (en hızlı)
1. Proje klasöründeki dosyaları (`index.html`, `app.js`, `styles.css`) zipleyin.
2. https://app.netlify.com/drop adresine girin.
3. Zip dosyasını sürükleyip bırakın.
4. Netlify size herkese açık bir URL verir.

### Seçenek 2: Vercel
```bash
npm i -g vercel
vercel
```
Komut sihirbazını tamamlayınca proje online URL ile yayınlanır.

### Seçenek 3: GitHub Pages
1. Bu repo'yu GitHub'a push edin.
2. **Settings → Pages** bölümüne gidin.
3. Source olarak ana branch'i ve root (`/`) klasörü seçin.
4. Kaydedin; birkaç dakika sonra `https://<kullanici>.github.io/<repo>` adresinden açılır.

## Not

Birçok modern web sitesi güvenlik başlıkları (`X-Frame-Options`, `Content-Security-Policy`) nedeniyle iframe içinde açılmayabilir. Bu durumda uygulama çalışıyor olsa bile hedef site görünmeyebilir.
