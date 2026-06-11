# ZS GARDEN - Deployment & Launch Guide

## 🚀 Pre-Launch Checklist

### ✅ Code Quality
- [x] Sve TypeScript greške ispravljene
- [x] Svi meta tagovi optimizovani
- [x] Schema markup dodan (LocalBusiness, FAQ, Services, Breadcrumbs)
- [x] robots.txt i sitemap.xml kreirani
- [x] .gitignore pravilno konfigurisan
- [x] Env variables ne sadrže sensitive data u repozitorijumu

### ✅ Functional Testing
- [x] Contact forma proveravana - Email stižu na zsgarden.rs@gmail.com
- [x] Sve stranice dostupne i funkcionalne
- [x] FAQ accordion radi
- [x] Gallery compatible sa upload-om
- [x] Navigation linkovi rade sa svim stranica
- [x] Mobile responsivnost proveravana

---

## 📋 Korak-po-Korak Deployment

### KORAK 1: GitHub Repository Setup

```bash
# 1. Inicijalizuj Git lokalno
cd "c:\Coding\ZS Garden\zs-garden"
git init
git add .
git commit -m "Initial commit: ZS GARDEN website with full SEO optimization"

# 2. Kreiraj novi repo na GitHub.com
# https://github.com/new
# Naziv: zs-garden
# Vidljivost: Public (za bolje SEO) ili Private (za sigurnost)

# 3. Linkuj sa lokalnim git-om
git remote add origin https://github.com/YOUR_USERNAME/zs-garden.git
git branch -M main
git push -u origin main

# Napomena: GitHub će traži da se uloguješ sa personal access token
# Generiši token na https://github.com/settings/tokens (scope: repo)
```

### KORAK 2: Vercel Deployment

#### Opcija A: Direktno iz GitHub-a (PREPORUČENO)

1. Idi na https://vercel.com/dashboard
2. Kliknij "New Project"
3. Izaberite GitHub repozitorijum `zs-garden`
4. Pod "Configure Project":
   - Framework: Next.js
   - Root Directory: `./` (korijen)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. Pod "Environment Variables" dodaj sve:
   ```
   MONGODB_URI=mongodb+srv://[user]:[password]@[cluster].mongodb.net/[database]
   MONGODB_DB=zs_garden
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=zsgarden.rs@gmail.com
   SMTP_PASS=hbxa xjgz dsff byrh
   CONTACT_RECIPIENT=zsgarden.rs@gmail.com
   GALLERY_PASSWORD=zsgarden2026
   ```

6. Kliknij "Deploy" - čekaj ~3-5 minuta

#### Opcija B: Vercel CLI (Alternative)

```bash
# 1. Instaliraj Vercel CLI
npm i -g vercel

# 2. Login u Vercel
vercel login

# 3. Deploy
vercel

# 4. Sledi uprompe (linkuj sa GitHub ako još nije)
```

---

## 🌐 Custom Domain Setup (zsgarden.org)

### Ako koristi Vercel + Custom Domain

1. **Na Vercel Dashboard**:
   - Settings → Domains
   - Dodaj `zsgarden.org`
   - Vercel će dati DNS instructions

2. **Na registratoru domena** (np. Godaddy, Namecheap, etc):
   - DNS Settings → Add CNAME record
   - Host: `www`
   - Value: `cname.vercel-dns.com.` (Vercel će dati tačnu vrednost)
   
   - Ili A record:
     - Host: `@` (root domain)
     - Value: `76.76.19.89` (Vercel IP - proveriti kod Vercel-a)

3. **DNS propagacija**: 24-48 sati

---

## 📊 Post-Launch Configuration

### 1. Google Search Console Setup (BITNO!)

```
1. Idi na https://search.google.com/search-console
2. Dodaj sajt: https://zsgarden.org
3. Verificiraj vlasništvo:
   - HTML file upload, ili
   - DNS TXT record, ili
   - Google Analytics, ili
   - Google Tag Manager

4. Upload sitemap.xml:
   - Settings → Sitemaps
   - Dodaj: https://zsgarden.org/sitemap.xml

5. Proverite prvo na https://zsgarden.org/robots.txt
   - Trebalo bi videti content (test sa curl ili browser-a)
```

### 2. Google Analytics 4 Setup

```bash
# 1. Kreiraj GA4 property na https://analytics.google.com
# 2. Dobij Measurement ID (npr. G-XXXXXXXXXX)
# 3. Dodaj u layout.tsx:

import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 3. Google My Business (Za Local SEO!)

```
1. Idi na https://business.google.com
2. Kreiraj novo poslovanjeje:
   - Naziv: ZS GARDEN
   - Kategorija: Landscape Maintenance Services
   - Adresa: Čukarica, Beograd
   - Telefon: 061 371 00 54
   - Website: https://zsgarden.org
   - Business Hours: Po dogovoru

3. Verifikuj adresu (Google će poslati postcard)
4. Upload slike radova
5. Podsticaj klijente da ostave reviews
```

### 4. Lighthouse Performance Audit

```bash
# U Chrome DevTools (F12):
1. Idi na Lighthouse tab
2. Kliknij "Analyze page load"
3. Čekaj rezultat
4. Proverite:
   - Performance: >80
   - Accessibility: >90
   - Best Practices: >90
   - SEO: >90

# Ako je nekad loše, optimizuj:
- Slici: Koristi Next.js Image
- Font: Preload Google Fonts
- CSS: Minimizuj unused CSS
- JS: Code splitting
```

---

## 📧 Email System Maintenance

### Ako Gmail SMTP prestane da radi:

```
1. Proverite App Password:
   - https://accounts.google.com/apppasswords
   - Izaberi "Mail" → "Windows Computer" (ili relevantno)
   - Google će dati 16-karakterni password

2. Updateuj SMTP_PASS u Vercel env variables
   - Vercel Dashboard → Settings → Environment Variables
   - Edit SMTP_PASS
   - Redeploy

3. Testiranje:
   - Pošalji testnu poruku sa kontakt forme
   - Proverite inbox na zsgarden.rs@gmail.com
```

---

## 🔍 Monitoring & Maintenance

### Daily Checks
- [ ] Google Search Console - Errors ili crawl issues?
- [ ] Google Analytics - Normal traffic patterns?
- [ ] Email - Dolaze li kontakt poruke?

### Weekly Checks
- [ ] Uptime monitoring - Vercel status page
- [ ] Performance - Lighthouse score

### Monthly Checks
- [ ] SEO ranking - Check za glavne ključne reči
- [ ] Backlinks - Tools kao Ahrefs ili Moz
- [ ] Competitor analysis
- [ ] Content updates - Je li sve relevantan i tačno?

---

## 🆘 Troubleshooting

### Problem: "Vercel deployment failed"
**Rešenje:**
1. Proverite build log na Vercel Dashboard
2. Eventualno nedostaju env variables - dodaj ih
3. Lokalno testirati: `npm run build` → `npm start`

### Problem: "Emails ne stižu"
**Rešenje:**
1. Proverite SMTP credentials u env variables
2. Proverite da li je 2FA omogućen na Gmail-u
3. Kreiraj novi App Password
4. Testiraj sa curl-om:
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","phone":"061000000","message":"Test"}'
   ```

### Problem: "Sajt spor"
**Rešenje:**
1. Pokreni Lighthouse audit
2. Slike: Pretvori u WebP, compresuj
3. Defer non-critical JavaScript
4. Koristi Vercel Analytics (Real User Monitoring)

### Problem: "Google ne indeksira novog sadržaja"
**Rešenje:**
1. U Google Search Console → URL Inspection
2. Zatraži "Inspect URL", onda "Request indexing"
3. Čekaj 24-48 sati

---

## 📞 Support & Next Steps

### Za dalje optimizacije:
- [ ] Dodaj Crisp Live Chat
- [ ] Postavi newsletter signup
- [ ] Kreiraj blog sekciju sa SEO člancima
- [ ] Integriraj booking sistem
- [ ] Postavi A/B testove na CTA dugmadi

### Kontakt za pomoć:
- GitHub Issues: https://github.com/YOUR_USERNAME/zs-garden/issues
- Vercel Support: https://vercel.com/help
- MongoDB Support: https://support.mongodb.com

---

**Status**: ✅ Ready for Production
**Last Checked**: June 11, 2026
