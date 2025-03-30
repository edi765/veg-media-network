# VEG Media Network - Prompt pentru Recreare

## Structura Generală
Site-ul VEG Media Network este o platformă educațională modernă cu următoarea structură:

```
veg-media-network/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── auth.js
├── pages/
│   ├── cursuri.html
│   ├── contact.html
│   ├── autentificare.html
│   ├── despre.html
│   └── certificate.html
├── images/
│   ├── team/
│   ├── favicon/
│   ├── reviews/
│   ├── courses/
│   └── logo.png
├── videos/
└── diplome/
```

## Specificații Tehnice

### Tehnologii Utilizate
- HTML5
- CSS3 (cu Bootstrap 5.3.2)
- JavaScript (ES6+)
- Font Awesome 6.0.0
- Google Fonts

### Design și Stil
- Tema principală: Albastru închis (#0f2649) cu accente de verde (#4CAF50)
- Font principal: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Design responsive și modern
- Efecte de blur și transparență pentru navbar
- Gradiente și umbre pentru adâncime vizuală

### Elemente de Design
- Navbar transparent cu blur
- Hero section cu gradient și imagine de fundal
- Carduri cu efecte de hover
- Butoane cu efecte de tranziție
- Iconițe Font Awesome
- Imagini optimizate pentru web

## Pagini și Conținut

### 1. Pagina Principală (index.html)
- Hero section cu titlu și descriere
- Secțiune de statistici
- Secțiune de cursuri populare
- Secțiune de recenzii
- Secțiune de echipă
- Footer cu informații de contact

### 2. Pagina de Cursuri (cursuri.html)
- Filtre pentru categorii
- Carduri de curs cu:
  - Imagine de copertă
  - Titlu
  - Descriere
  - Durată
  - Nivel
  - Preț
  - Buton de înscriere

### 3. Pagina de Contact (contact.html)
- Formular de contact
- Informații de contact
- Hartă Google Maps
- Social media links

### 4. Pagina de Autentificare (autentificare.html)
- Formular de login
- Formular de înregistrare
- Recuperare parolă
- Validare formular

### 5. Pagina Despre Noi (despre.html)
- Istoric
- Misiune și viziune
- Valori
- Echipa

### 6. Pagina de Certificate (certificate.html)
- Listă de certificate
- Sistem de verificare certificate
- Descărcare certificate

## Funcționalități JavaScript

### main.js
- Navigare smooth scroll
- Animații la scroll
- Validare formulare
- Gestionare navbar
- Sistem de notificări

### auth.js
- Autentificare utilizatori
- Gestionare sesiuni
- Validare token
- Logout

## Elemente de Securitate
- Validare formular pe client și server
- Protecție CSRF
- Criptare parole
- Sanitizare input
- Rate limiting

## Optimizări
- Lazy loading pentru imagini
- Minificare CSS și JavaScript
- Optimizare pentru mobile
- SEO friendly
- Accesibilitate (ARIA labels)

## Conținut Media
- Imagini optimizate (max 500KB)
- Logo în format PNG
- Favicon în multiple dimensiuni
- Imagini pentru cursuri și echipă
- Imagini pentru recenzii

## Responsive Design
- Breakpoints:
  - Mobile: < 576px
  - Tablet: 576px - 991px
  - Desktop: > 991px
- Adaptări pentru fiecare breakpoint
- Meniu hamburger pentru mobile

## Note Importante
- Păstrarea consistenței designului
- Accent pe accesibilitate
- Optimizare pentru performanță
- Compatibilitate cross-browser
- SEO optimization

## Informații de Contact
- Email: vegmedianetwork@gmail.com
- Telefon: 0759 388 695
- Adresă: Liceul Regina Maria Dorohoi
- Social Media:
  - Facebook
  - Instagram
  - LinkedIn
  - YouTube

## Credențiale și API Keys
[Acestea trebuie păstrate separate și securizate]

## Instrucțiuni de Deployment
1. Configurare server web
2. SSL certificate
3. Domain setup
4. Database setup
5. Environment variables
6. Backup system
7. Monitoring 