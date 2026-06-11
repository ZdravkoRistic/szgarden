ZS GARDEN - Lokalno pokretanje i MongoDB instrukcije

## GitHub & Vercel Deployment

### Priprema za GitHub Push
1. Inicijalizujte git (ako već nije):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ZS GARDEN website with MongoDB backend, contact form, gallery, and FAQ"
   ```

2. Kreirajte novi repozitorijum na GitHub-u (https://github.com/new)
   - Naziv: `zs-garden` (ili drugi naziv po želji)
   - Vidljivost: Public ili Private

3. Dodajte remote i push-ujte kod:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/zs-garden.git
   git branch -M main
   git push -u origin main
   ```

### Deploy na Vercel
1. Idite na https://vercel.com i prijavite se sa GitHub nalogom
2. Kliknite "New Project" → Izaberite GitHub repozitorijum `zs-garden`
3. Pod "Environment Variables" dodajte:
   - `MONGODB_URI` — vaša MongoDB Atlas connection string
   - `MONGODB_DB` — `zs_garden`
   - `SMTP_HOST` — `smtp.gmail.com`
   - `SMTP_PORT` — `465`
   - `SMTP_USER` — `zsgarden.rs@gmail.com`
   - `SMTP_PASS` — app password (hbxa xjgz dsff byrh)
   - `CONTACT_RECIPIENT` — `zsgarden.rs@gmail.com`
   - `GALLERY_PASSWORD` — `zsgarden2026`

4. Kliknite "Deploy" — sajt će biti dostupan na `https://zs-garden.vercel.app` (ili na vašem custom domenu)

### Korišćenje Vlastitog Domena
1. Na Vercel -> Project Settings -> Domains dodajte `zsgarden.org`
2. Pratite uputstva za DNS konfiguraciju (dodajte CNAME ili A record kod registratora)

## Osnovno
- Projekat koristi Next.js (App Router), Tailwind CSS i MongoDB za backend storage metapodataka (URL-ovi slika i kontakt poruke).
- Slike se NE smeju čuvati u MongoDB-u; čuvaju se samo URL-ovi (preporučeno: Cloudinary ili Vercel Blob).


Env promenljive (locally)
1. Kreirajte fajl `.env.local` u korenu projekta sa sledećim varijablama:

MONGODB_URI=<your-mongodb-connection-string>
MONGODB_DB=zs_garden

- `MONGODB_URI` primer za Mongo Atlas: `mongodb+srv://USER:PASSWORD@cluster0.abcd.mongodb.net/?retryWrites=true&w=majority`
- `MONGODB_DB` je opcionalno; podrazumevano: `zs_garden`.

Kreiranje kolekcija
- Aplikacija automatski kreira kolekcije `gallery` i `contacts` prilikom prvog umetanja dokumenta.

Video sekcija
- Galerija podržava i video materijale: YouTube linkove i direktne `.mp4` URL-ove. Polje `mediaType` se čuva u kolekciji `gallery` kao `image` ili `video`.

Detaljna uputstva za MongoDB Atlas (korak-po-korak)
1. Napravite nalog na https://www.mongodb.com/atlas/register (ako već nemate nalog).
2. Kreirajte novi Free Cluster (Shared Cluster) — izaberite najbliži region.
3. U sekciji "Database Access" dodajte user-a (Create a database user) sa username i password koje ćete koristiti u `MONGODB_URI`.
4. U sekciji "Network Access" dodajte vašu IP adresu (ili 0.0.0.0/0 za testiranje sa bilo koje adrese). Za lokalni razvoj, možete dodati vašu trenutnu javnu IP.
5. Kliknite na "Connect" za taj cluster, izaberite "Connect your application" i kopirajte connection string (driver: Node.js). Zamenite `<password>` i (po potrebi) username u stringu.
6. U projektu, kreirajte `.env.local` u korenu i nalepite:

```
MONGODB_URI=<kopirani-connection-string>
MONGODB_DB=zs_garden
```

7. Pokrenite lokalno (`npm install` pa `npm run dev`). API rute će automatski kreirati kolekcije prilikom prvog upisa.

Bezbednost i produkcija
- Ne stavljajte `MONGODB_URI` u javni repozitorijum. Za Vercel, postavite varijable kroz Project Settings -> Environment Variables.
- Ograničite pristup Network Access na produkciji (ne ostavljajte 0.0.0.0/0).

Prepravke koda (po potrebi)
- API rute:
  - `app/api/gallery/route.ts` — podržava `GET`, `POST` i `DELETE` za upravljanje metapodacima slika.
  - `app/api/contact/route.ts` — podržava `POST` za čuvanje poruka.
- `lib/mongodb.ts` — sadrži helper `connectToDatabase()` koji koristi `MONGODB_URI`.

Kako lokalno testirati sajt
1. Instalirajte zavisnosti:
```bash
npm install
```
2. Kreirajte `.env.local` kao gore opisano.
3. Pokrenite razvojni server:
```bash
npm run dev
```
4. Otvorite `http://localhost:3000` u pregledaču.

Galerija & upload slika
- Trenutno `GalleryClient` prihvata URL slike (u polje `URL slike`). Preporučeno:
  - Postavite sliku na Cloudinary (ili Vercel Blob) i koristite taj URL.
  - Ako želite, mogu implementirati direktan upload (Cloudinary unsigned upload) — javite da implementiram.
- Lozinka za upload/brisanje: `zsgarden2026` (čuva se lokalno u `localStorage`).

Brisanje slika
- Autentifikacija na klijentu je jednostavna lozinka (kao gore). Kada ste autentifikovani, pojavljuje se dugme `Obriši` pored svake slike koje šalje `DELETE /api/gallery` sa JSON { id }.

Deploy (kratko za buduće pushovanje)
- Kada push-ujete kod na GitHub i deploy-ujete na Vercel, postavite `MONGODB_URI` i `MONGODB_DB` u Vercel environment variables.
- Konfigurišite Cloudinary ili Vercel Blob za skladištenje slika i koristite odgovarajući upload flow.

Ako želite, mogu sada:
- Implementirati direktan fajl-upload na Cloudinary (client-side unsigned) i prilagoditi UI.
- Dodati jednostavnu admin lozinku/sessiju sa vremenskim istekom umesto localStorage-flaga.
- Dodati unit / e2e testove za API rute.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
