# MaktabTop — Qarshi xususiy maktablari katalogi

**maktabtop.uz** sayti asosida yaratilgan to'liq full-stack klon loyihasi.
Backend **Django + DRF**, frontend **React + Vite + Tailwind CSS** da yozilgan.
Ma'lumotlar bazasi Qarshidagi **25 ta real xususiy maktab** va **137 ta sharh** bilan to'ldirilgan.

---

## 📁 Loyiha tuzilishi

```
maktabtop-clone/
├── backend/          # Django REST API
│   ├── maktabtop/    # asosiy settings
│   ├── schools/      # asosiy app (models, views, admin, seed)
│   ├── db.sqlite3    # seed qilingan baza (tayyor)
│   └── manage.py
├── frontend/         # React SPA
│   ├── src/
│   │   ├── pages/       # Home, Schools, SchoolDetail, About, Contact
│   │   ├── components/  # Navbar, Footer, SchoolCard, Filter
│   │   └── api/         # axios client
│   └── package.json
└── README.md
```

---

## 🚀 Backend (Django) ishga tushirish

```bash
cd backend

# 1. Virtual environment
python3 -m venv venv
source venv/bin/activate        # Linux / macOS
# venv\Scripts\activate         # Windows

# 2. Kutubxonalar
pip install -r requirements.txt

# 3. Baza MIGRATSIYA QILINGAN va SEED BO'LGAN holida birga keladi (db.sqlite3)
# Agar toza boshlamoqchi bo'lsangiz:
#   rm db.sqlite3
#   python manage.py migrate
#   python manage.py seed_data

# 4. Serverni ishga tushirish
python manage.py runserver
```

Server: **http://127.0.0.1:8000**

### API endpointlar

| Endpoint | Nima qaytaradi |
|---|---|
| `GET /api/schools/` | Barcha maktablar (filter, pagination bilan) |
| `GET /api/schools/<slug>/` | Bitta maktab to'liq ma'lumoti |
| `GET /api/schools/featured/` | Tanlangan maktablar |
| `GET /api/schools/top/` | TOP reytingdagi maktablar |
| `POST /api/schools/<slug>/review/` | Sharh qo'shish |
| `GET /api/districts/` | Tumanlar ro'yxati |
| `GET /api/languages/` | Til variantlari |
| `GET /api/features/` | Xususiyatlar |
| `GET /api/stats/` | Umumiy statistika |

### Filterlar (`/api/schools/?...`)
`min_price`, `max_price`, `min_rating`, `district=<slug>`, `language=<id>`,
`grade=<n>`, `school_type=private|international|bilingual|specialized`,
`search=<matn>`, `ordering=-rating|price_monthly|-reviews_count`

### Admin panel

```bash
python manage.py createsuperuser
```
Kirish: **http://127.0.0.1:8000/admin**

---

## ⚛️ Frontend (React) ishga tushirish

```bash
cd frontend

# 1. Paketlarni o'rnatish
npm install

# 2. Dev rejimida ishga tushirish (backend ham ishlab turishi kerak)
npm run dev
```

Frontend: **http://localhost:5173**

Vite konfiguratsiyasida `/api` va `/media` so'rovlari avtomatik
`http://127.0.0.1:8000` ga proxy qilinadi, shuning uchun CORS muammosi bo'lmaydi.

### Production build

```bash
npm run build       # dist/ papkasiga build
npm run preview     # build'ni lokalda tekshirish
```

---

## 🏫 Ma'lumotlar bazasi

Seed skript quyidagi real Qarshi maktablarini to'ldiradi:

British School of Qarshi • Qarshi International School • Invento Qarshi •
Profi School Qarshi • Wunderkind Study Qarshi • Oxbridge International • Maple Bear •
ABIS • Horizon Academy • Global Elite School • Dream School • Registan •
Thompson • Smart School • Rahimov • OST • PDP School • Wisdom • Wise •
Humo • Ecole Francaise • Disney City • Genesis Education • Anis Premium •
Movorounnahr

Har bir maktab uchun: nomi, turi, telefon, email, sayt, manzil, tuman,
oylik narx, kirish to'lovi, sinflar diapazoni, tillar, kurrikulumlar,
xususiyatlar, reyting, koordinatalar.

---

## 🛠️ Texnologiyalar

**Backend:** Django 5, Django REST Framework, django-filter, django-cors-headers, SQLite, Pillow
**Frontend:** React 18, React Router 6, Vite 5, Tailwind CSS 3, Axios
**Til:** O'zbek (Lotin)

---

## 📝 Eslatma

- `db.sqlite3` fayli allaqachon seed qilingan holda keladi — ishga tushirishdan oldin hech narsa qilish shart emas.
- Dev rejimida `DEBUG=True`, `CORS_ALLOW_ALL_ORIGINS=True`. Production uchun `settings.py` ni moslang.
- Barcha UI matnlari o'zbek tilida.

---

Yaxshi ta'lim olishingizni tilaymiz! 🎓
