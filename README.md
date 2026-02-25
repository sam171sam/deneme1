# Mini Çevrimiçi İnternet Tarayıcısı

Basit bir HTML/CSS/JS uygulamasıyla URL girip siteleri `iframe` içinde açmanızı sağlar.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
```

Sonra tarayıcıdan `http://localhost:8000` adresine gidin.

## GitHub üzerinden çalıştırma (önerilen)

Bu repo artık GitHub Actions ile otomatik olarak GitHub Pages'e deploy olacak şekilde ayarlı.

1. Repoyu GitHub'a gönderin:
   ```bash
   git remote add origin <REPO_URL>
   git push -u origin <BRANCH_ADI>
   ```
2. GitHub'da **Settings → Pages** bölümüne girin.
3. **Build and deployment / Source** kısmında **GitHub Actions** seçin.
4. Repo'ya her push sonrası **Actions** altında "Deploy static site to GitHub Pages" workflow'u çalışır.
5. Deploy tamamlanınca site adresiniz şu formatta olur:
   - `https://<kullanici>.github.io/<repo>/`

> Not: Workflow varsayılan olarak `main`, `master` ve `work` branch'lerinde tetiklenir.

## Alternatif online çalıştırma (deploy)

Bu proje tamamen statik olduğu için farklı platformlara da kolay deploy edilir.

### Seçenek 1: Netlify Drop
1. Proje dosyalarını (`index.html`, `app.js`, `styles.css`) zipleyin.
2. https://app.netlify.com/drop adresine girin.
3. Zip dosyasını sürükleyip bırakın.

### Seçenek 2: Vercel
```bash
npm i -g vercel
vercel
```

## Not

Birçok modern web sitesi güvenlik başlıkları (`X-Frame-Options`, `Content-Security-Policy`) nedeniyle iframe içinde açılmayabilir. Bu durumda uygulama çalışıyor olsa bile hedef site görünmeyebilir.
