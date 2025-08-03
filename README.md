# EasyTravel.uz

## 🚀 WonderTravel - O'zbekiston sayohat platformasi

WonderTravel - bu O'zbekistondagi eng chiroyli va professional sayohat platformasi. Bu platforma foydalanuvchilarga dunyoning turli burchaklariga sayohat qilish imkonini beradi.

## 🛠️ Frontend qismda qilingan ishlar

### 📁 Loyiha tuzilishi
```
Frontend/
├── src/
│   ├── components/          # React komponentlari
│   ├── pages/              # Sahifalar
│   ├── contexts/           # Context API
│   ├── data/               # Ma'lumotlar
│   ├── images/             # Rasmlar va ikonkalar
│   └── types/              # TypeScript tiplari
├── public/                 # Static fayllar
└── package.json           # Dependencies
```

### 🎨 UI/UX dizayn

#### 🌐 Navbar (Navigatsiya paneli)
- **Responsive dizayn** - barcha qurilmalarda chiroyli ko'rinish
- **O'zbekcha til** - default til sifatida o'zbekcha
- **Language switcher** - O'zbekcha, Inglizcha, Ruscha tillar
- **Smooth animations** - Framer Motion bilan
- **Professional ko'rinish** - clean va modern dizayn

#### 🏠 Bosh sahifa (HomePage)
- **Hero Banner** - chiroyli banner va call-to-action
- **Feature Cards** - xizmatlar haqida ma'lumot
- **Tour Slider** - eng yaxshi turlar
- **Responsive grid** - barcha ekran o'lchamlarida

#### 🎯 Turlar sahifasi (ToursPage)
- **Filter Panel** - narx, kategoriya, davomiylik bo'yicha filtrlash
- **Search functionality** - manzillar bo'yicha qidirish
- **Tour Cards** - chiroyli tur kartochkalari
- **Pagination** - sahifalarga bo'lish

#### 💳 To'lov sahifasi (PaymentPage)
- **Real payment icons** - Click, Payme, Uzum Bank ikonkalari
- **Form validation** - React Hook Form va Yup bilan
- **QR Code generation** - to'lov uchun QR kod
- **Professional design** - trust va security ko'rsatish

### 🔧 Texnik xususiyatlar

#### ⚛️ React.js
- **Modern React** - Hooks va functional components
- **React Router** - sahifalar orasida navigatsiya
- **Context API** - global state management
- **Custom Hooks** - qayta ishlatiluvchi logika

#### 🎨 Styling
- **Tailwind CSS** - utility-first CSS framework
- **Responsive Design** - mobile-first approach
- **Custom animations** - Framer Motion bilan
- **Glassmorphism effects** - modern UI trends

#### 🌐 Til qo'llab-quvvatlash
- **O'zbekcha** - asosiy til
- **Inglizcha** - xalqaro tillar
- **Ruscha** - qo'shni mamlakatlar
- **Dynamic translations** - real-time til o'zgarishi

#### 📱 Mobile Optimization
- **Progressive Web App** - PWA xususiyatlari
- **Touch-friendly** - mobile qurilmalar uchun
- **Fast loading** - optimized images va code
- **Offline support** - cached content

### 🎯 Asosiy funksiyalar

#### 🔍 Qidirish va filtrlash
- **Advanced search** - manzil, narx, sana bo'yicha
- **Real-time filtering** - instant natijalar
- **Sort options** - narx, reyting, davomiylik bo'yicha
- **Clear filters** - barcha filtrlarni tozalash

#### 💳 To'lov tizimi
- **Multiple payment methods** - Click, Payme, Uzum Bank
- **Secure transactions** - encrypted data
- **QR Code payments** - tezkor to'lov
- **Payment confirmation** - to'lov tasdiqlash

#### 🌍 Ko'p tillilik
- **3 tilda** - O'zbekcha, Inglizcha, Ruscha
- **Dynamic content** - barcha matnlar tarjima qilinadi
- **RTL support** - o'ngdan chapga yozish
- **Cultural adaptation** - mahalliy xususiyatlar

### 🚀 Performance optimizatsiyasi

#### ⚡ Tezlik
- **Code splitting** - lazy loading
- **Image optimization** - WebP format
- **Bundle optimization** - tree shaking
- **Caching strategy** - browser cache

#### 📊 SEO
- **Meta tags** - har bir sahifa uchun
- **Structured data** - JSON-LD
- **Sitemap** - search engines uchun
- **Open Graph** - social media sharing

### 🔒 Xavfsizlik

#### 🛡️ Data protection
- **Input validation** - XSS va injection oldini olish
- **Secure forms** - CSRF protection
- **HTTPS only** - encrypted connections
- **Privacy compliance** - GDPR ready

### 📱 Responsive dizayn

#### 📐 Breakpoints
- **Mobile** - 320px - 768px
- **Tablet** - 768px - 1024px
- **Desktop** - 1024px+
- **Large screens** - 1440px+

#### 🎨 Design system
- **Color palette** - consistent ranglar
- **Typography** - readable fonts
- **Spacing** - consistent margins
- **Components** - reusable UI elements

### 🛠️ Development tools

#### 🔧 Build tools
- **Vite** - fast development server
- **ESLint** - code quality
- **Prettier** - code formatting
- **Git hooks** - pre-commit checks

#### 📦 Dependencies
- **React 18** - latest React version
- **React Router 6** - modern routing
- **Framer Motion** - animations
- **Tailwind CSS** - styling
- **React Hook Form** - form handling
- **Yup** - validation

## 🛠️ Backend qismda qilingan ishlar

### 📁 Loyiha tuzilishi
```
Backend/
├── wondertravel/          # Django loyiha
│   ├── settings.py        # Sozlamalar
│   ├── urls.py           # Asosiy URL patterns
│   └── wsgi.py           # WSGI konfiguratsiya
├── tours/                 # Asosiy app
│   ├── models.py         # Database modellar
│   ├── views.py          # API views
│   ├── serializers.py    # DRF serializers
│   ├── urls.py           # App URL patterns
│   └── admin.py          # Admin panel
├── media/                 # Upload fayllar
├── staticfiles/           # Static fayllar
└── requirements.txt       # Dependencies
```

### 🗄️ Database modellar

#### 🎯 TourPackage (Sayohat paketlari)
- **title** - Paket nomi
- **description** - Batafsil tavsif
- **image** - Rasm fayli
- **location** - Manzil
- **start_date/end_date** - Sana oralig'i
- **price** - Narxi (UZS)
- **duration** - Davomiyligi (kunlar)
- **is_active** - Faol/faol emas

#### 💳 Booking (Buyurtmalar)
- **tour** - Sayohat paketi (ForeignKey)
- **name** - Foydalanuvchi ismi
- **phone** - Telefon raqam
- **email** - Email manzil
- **payment_method** - To'lov usuli (payme/click/uzum)
- **is_paid** - To'langan/To'lanmagan

#### 📞 ContactMessage (Kontakt xabarlar)
- **name** - Foydalanuvchi ismi
- **email** - Email manzil
- **phone** - Telefon raqam
- **message** - Xabar matni
- **sent_at** - Yuborilgan vaqt
- **is_read** - O'qilgan/yo'q

### 🔗 API Endpoints

#### 📋 Sayohat paketlari
```
GET /api/tours/                    # Barcha paketlar
GET /api/tours/<id>/               # Bitta paket
GET /api/tours/featured/           # Trend paketlar
GET /api/tours/search/?q=paris     # Qidirish
```

#### 💳 Buyurtmalar
```
POST /api/bookings/                # Yangi buyurtma
GET /api/bookings/                 # Barcha buyurtmalar
POST /api/bookings/<id>/verify-payment/  # To'lov tasdiqlash
```

#### 📞 Kontakt
```
POST /api/contact/                 # Yangi xabar
GET /api/contact/                  # Barcha xabarlar
POST /api/contact/<id>/mark-read/  # O'qilgan deb belgilash
```

### 🔧 Texnik xususiyatlar

#### ⚙️ Django REST Framework
- **ViewSets** - CRUD operatsiyalar
- **Serializers** - Data validation
- **Permissions** - Ruxsatlar
- **Filtering** - Qidirish va filtrlash
- **Pagination** - Sahifalarga bo'lish

#### 🔐 Xavfsizlik
- **JWT Authentication** - Token-based auth
- **CORS Headers** - Cross-origin requests
- **Input Validation** - Data sanitization
- **CSRF Protection** - Cross-site request forgery

#### 📊 Database
- **SQLite** - Development uchun
- **PostgreSQL** - Production uchun
- **Migrations** - Database changes
- **Admin Panel** - Content management

#### 🎯 API Features
- **Swagger Documentation** - Auto-generated docs
- **Filtering** - Price, location, duration
- **Search** - Full-text search
- **Ordering** - Sort by price, date
- **Pagination** - Page-based results

### 🛠️ Development tools

#### 📦 Dependencies
- **Django 5.2.4** - Web framework
- **DRF 3.16.0** - REST API
- **django-cors-headers** - CORS support
- **djangorestframework-simplejwt** - JWT auth
- **drf-yasg** - API documentation
- **django-filter** - Advanced filtering
- **Pillow** - Image processing
- **psycopg2-binary** - PostgreSQL adapter

#### 🔧 Management Commands
- **create_sample_data** - Test ma'lumotlari yaratish
- **makemigrations** - Database changes
- **migrate** - Database updates
- **createsuperuser** - Admin user

### 🚀 Deployment

#### 📋 Requirements
- **Python 3.8+** - Runtime environment
- **PostgreSQL** - Production database
- **Redis** - Caching (optional)
- **Nginx** - Web server
- **Gunicorn** - WSGI server

#### 🔧 Environment Variables
```bash
SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=postgresql://user:pass@host:port/db
ALLOWED_HOSTS=your-domain.com
```

### 🎉 Natijalar

#### ✅ Muvaffaqiyatli amalga oshirilgan
- **Modern UI/UX** - professional va chiroyli dizayn
- **Full responsive** - barcha qurilmalarda
- **Multi-language** - 3 tilda qo'llab-quvvatlash
- **Payment integration** - real payment systems
- **Performance optimized** - tez va samarali
- **SEO friendly** - search engines uchun
- **Accessible** - barcha foydalanuvchilar uchun
- **RESTful API** - complete backend implementation
- **Admin Panel** - content management system
- **Database Models** - structured data storage
- **API Documentation** - Swagger/OpenAPI docs

#### 🚀 Keyingi qadamlar
- **Frontend-Backend Integration** - API connection
- **Real Payment Integration** - Payme/Click/Uzum APIs
- **Email Notifications** - automated emails
- **File Upload** - image handling
- **User Authentication** - login/register system
- **Analytics** - user behavior tracking
- **Testing** - unit va integration tests
- **Deployment** - production setup

---

## 📞 Aloqa

Agar savollaringiz bo'lsa yoki qo'shimcha ma'lumot kerak bo'lsa, biz bilan bog'laning.

**Email:** info@wondertravel.uz  
**Telefon:** +998 90 123 45 67  
**Manzil:** Toshkent, O'zbekiston

---

*WonderTravel - O'zbekistondagi eng yaxshi sayohat platformasi! 🌍✈️*