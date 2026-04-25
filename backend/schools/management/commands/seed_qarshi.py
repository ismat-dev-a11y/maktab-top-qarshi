"""
Qarshi shahridagi xususiy maktablar uchun seed skripti.

Foydalanish:
    python manage.py seed_qarshi              # qo'shish
    python manage.py seed_qarshi --clear      # Qarshi maktablarini o'chirib, qayta to'ldirish

Ma'lumot manbalari:
  - Tasdiqlangan kontakt: Alfa, Algoritm, Iqtidor xalqaro maktabi
    (Telegram / rasmiy sayt orqali topildi)
  - Boshqa maktablar: telefon/email placeholder (+998 90 000 00 XX).
    Foydalanuvchi keyin aniq raqamlarga yangilab olishi kerak.
  - Manzil: foydalanuvchi taqdim etgan orientir bo'yicha
  - Joylashuv (lat/lng): Qarshi markazi (38.86, 65.79) atrofida
  - Narx: Qarshi bozoriga xos 1.6–3.8M so'm oralig'i
"""
import random
from datetime import time
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify
from schools.models import (
    District, Language, Feature, Curriculum, School, Review
)

# --- QARSHI HUDUDLARI (District modeli: faqat name + slug) ---
QARSHI_DISTRICTS = [
    "Qarshi — Markaz",
    "Qarshi — Nasaf",
    "Qarshi — Paxtazor",
    "Qarshi — Site",
    "Qarshi — Aralovul",
    "Qarshi — Qum Qishloq",
    "Qarshi — Beshkent yo'li",
]

# Slug bo'yicha oson topish uchun mapping
QARSHI_DISTRICT_SLUGS = {
    "markaz":       "qarshi-markaz",
    "nasaf":        "qarshi-nasaf",
    "paxtazor":     "qarshi-paxtazor",
    "site":         "qarshi-site",
    "aralovul":     "qarshi-aralovul",
    "qum":          "qarshi-qum-qishloq",
    "beshkent":     "qarshi-beshkent-yoli",
}

# --- TIL / DASTUR / IMKONIYAT (mavjud bo'lmasa yaratiladi) ---
LANGUAGES = [
    ("O'zbekcha", "uz"),
    ("Ruscha", "ru"),
    ("Inglizcha", "en"),
    ("Arabcha", "ar"),
    ("Koreyscha", "ko"),
    ("Turkcha", "tr"),
]

CURRICULUMS = [
    ("Milliy dastur", "O'zbekiston Respublikasi ta'lim standarti"),
    ("Cambridge", "Cambridge International dasturi"),
    ("IB", "International Baccalaureate"),
]

FEATURES = [
    ("Ovqatlanish", "🍽"),
    ("Transport xizmati", "🚌"),
    ("Xavfsizlik (CCTV)", "🛡"),
    ("O'yin maydonchasi", "🛝"),
    ("Kutubxona", "📚"),
    ("IT laboratoriya", "💻"),
    ("Sport zali", "⚽"),
    ("Musiqa xonasi", "🎵"),
    ("Tasviriy san'at", "🎨"),
    ("Robototexnika", "🤖"),
    ("Ingliz tili chuqurlashtirilgan", "🇬🇧"),
    ("Matematika chuqurlashtirilgan", "🧮"),
    ("Tibbiyot yo'nalishi", "⚕"),
    ("Astronomiya", "🔭"),
    ("Native o'qituvchilar", "🗣"),
    ("Stipendiya tizimi", "🎓"),
    ("IELTS tayyorgarlik", "📝"),
]

# --- MAKTABLAR ---
QARSHI_SCHOOLS = [
    {
        "name": "Modern School",
        "school_type": "private",
        "phone": "+998 90 000 00 01",
        "email": "info@modernschool-qarshi.uz",
        "website": "",
        "telegram": "@modern_school_qarshi",
        "instagram": "@modernschool_qarshi",
        "district_key": "beshkent",
        "address": "Qarshi tumani, Beshkent yo'lida, Skazka mehmonxonasi ro'parasi",
        "latitude": 38.8350, "longitude": 65.7700,
        "monthly_price_uzs": 2_200_000, "entry_fee_uzs": 800_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Transport xizmati", "Xavfsizlik (CCTV)",
                     "O'yin maydonchasi"],
        "rating": 4.3, "founded_year": 2020,
        "description": "Zamonaviy usullarda o'qitadigan Qarshi shahridagi xususiy maktab.",
        "is_featured": False, "is_verified": True,
    },
    {
        "name": "Beruniy Maktabi (Site)",
        "school_type": "private",
        "phone": "+998 90 000 00 02",
        "email": "info@beruniyschool-site.uz",
        "website": "https://instagram.com/beruniyschool_uz",
        "telegram": "@beruniyschool_uz",
        "instagram": "@beruniyschool_uz",
        "district_key": "site",
        "address": "Qarshi Site, markaziy ko'cha",
        "latitude": 38.8720, "longitude": 65.8050,
        "monthly_price_uzs": 2_500_000, "entry_fee_uzs": 1_000_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona", "IT laboratoriya", "Xavfsizlik (CCTV)"],
        "rating": 4.5, "founded_year": 2019,
        "description": "Alloma Abu Rayhon Beruniy nomidagi Site tumanidagi xususiy maktab.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Bolalar Akademiyasi",
        "school_type": "private",
        "phone": "+998 90 000 00 03",
        "email": "info@bolalaracademy.uz",
        "website": "",
        "telegram": "@bolalar_academy_qarshi",
        "instagram": "@bolalar.academy.qarshi",
        "district_key": "markaz",
        "address": "Baxtli Oila to'yxonasi oldida",
        "latitude": 38.8600, "longitude": 65.7850,
        "monthly_price_uzs": 1_800_000, "entry_fee_uzs": 500_000,
        "min_grade": 0, "max_grade": 4,
        "start_time": time(8, 30), "end_time": time(16, 0),
        "meals_per_day": 2, "max_students_per_class": 15,
        "languages": ["O'zbekcha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "O'yin maydonchasi", "Tasviriy san'at",
                     "Musiqa xonasi"],
        "rating": 4.4, "founded_year": 2021,
        "description": "Boshlang'ich ta'limga ixtisoslashgan bolalar akademiyasi.",
        "is_featured": False, "is_verified": False,
    },
    {
        "name": "Algoritm School",
        "school_type": "private",
        "phone": "+998 99 141 05 05",
        "email": "info@algoritmschool.uz",
        "website": "https://t.me/algoritmschool",
        "telegram": "@algoritmschool",
        "instagram": "@algoritm.school.oltiariq",
        "district_key": "markaz",
        "address": "Mulla To'ychi teatri yonida, Jurnalistlar uyi",
        "latitude": 38.8580, "longitude": 65.7910,
        "monthly_price_uzs": 2_400_000, "entry_fee_uzs": 1_000_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Stipendiya tizimi",
                     "Matematika chuqurlashtirilgan"],
        "rating": 4.7, "founded_year": 2020,
        "description": "Aniq fanlarga ixtisoslashgan, stipendiya tizimi mavjud "
                       "xususiy maktab. Har oyda nazorat testlari o'tkazilib, "
                       "g'olib o'quvchilarga 500 000 so'm pul mukofoti "
                       "beriladi. Prezident maktabi va 1-son ixtisoslashtirilgan "
                       "maktablariga o'quvchilar tayyorlangan.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Ilm Ziyo School",
        "school_type": "private",
        "phone": "+998 90 000 00 05",
        "email": "info@ilmziyo.uz",
        "website": "",
        "telegram": "@ilmziyo_school",
        "instagram": "@ilmziyo.school",
        "district_key": "paxtazor",
        "address": "Paxtazor, 15-maktab ro'parasi",
        "latitude": 38.8680, "longitude": 65.7750,
        "monthly_price_uzs": 1_600_000, "entry_fee_uzs": 400_000,
        "min_grade": 1, "max_grade": 9,
        "start_time": time(8, 0), "end_time": time(16, 30),
        "meals_per_day": 2, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Inglizcha", "Arabcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona", "Xavfsizlik (CCTV)"],
        "rating": 4.2, "founded_year": 2021,
        "description": "Paxtazor mahallasidagi qulay narxdagi xususiy maktab.",
        "is_featured": False, "is_verified": False,
    },
    {
        "name": "EIST British School",
        "school_type": "international",
        "phone": "+998 90 000 00 06",
        "email": "info@eistbritish.uz",
        "website": "",
        "telegram": "@eist_british_school",
        "instagram": "@eist.britishschool",
        "district_key": "aralovul",
        "address": "Aralovul, Poytaxt choyxona yaqinida",
        "latitude": 38.8450, "longitude": 65.7600,
        "monthly_price_uzs": 3_500_000, "entry_fee_uzs": 2_000_000,
        "min_grade": 0, "max_grade": 11,
        "start_time": time(8, 30), "end_time": time(17, 30),
        "meals_per_day": 3, "max_students_per_class": 15,
        "languages": ["Inglizcha", "O'zbekcha", "Ruscha"],
        "curriculums": ["Cambridge", "Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Native o'qituvchilar",
                     "Ingliz tili chuqurlashtirilgan"],
        "rating": 4.6, "founded_year": 2019,
        "description": "British English International School — Cambridge "
                       "dasturi asosida ishlaydigan xalqaro maktab.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Oxford School (Soliq)",
        "school_type": "private",
        "phone": "+998 90 000 00 07",
        "email": "info@oxfordschool-qarshi.uz",
        "website": "",
        "telegram": "@oxford_school_qarshi",
        "instagram": "@oxfordschool.qarshi",
        "district_key": "markaz",
        "address": "Qarshi shahar Soliq boshqarmasi ro'parasida",
        "latitude": 38.8620, "longitude": 65.7870,
        "monthly_price_uzs": 2_300_000, "entry_fee_uzs": 900_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Inglizcha", "Ruscha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Ingliz tili chuqurlashtirilgan"],
        "rating": 4.3, "founded_year": 2020,
        "description": "Ingliz tiliga chuqur e'tibor qaratadigan xususiy maktab.",
        "is_featured": False, "is_verified": True,
    },
    {
        "name": "Scholars Academy",
        "school_type": "private",
        "phone": "+998 90 000 00 08",
        "email": "info@scholarsacademy.uz",
        "website": "https://instagram.com/scholars.academy.uz",
        "telegram": "@scholars_academy_uz",
        "instagram": "@scholars.academy.uz",
        "district_key": "markaz",
        "address": "Oydin mahallasi yonida",
        "latitude": 38.8500, "longitude": 65.7950,
        "monthly_price_uzs": 2_600_000, "entry_fee_uzs": 1_200_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 16,
        "languages": ["O'zbekcha", "Inglizcha", "Ruscha"],
        "curriculums": ["Milliy dastur", "Cambridge"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Tasviriy san'at",
                     "Stipendiya tizimi"],
        "rating": 4.5, "founded_year": 2020,
        "description": "Ilm-fanga qiziquvchi o'quvchilar uchun akademik "
                       "dasturga asoslangan xususiy maktab.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Kelajak School",
        "school_type": "private",
        "phone": "+998 90 000 00 09",
        "email": "info@kelajakschool.uz",
        "website": "",
        "telegram": "@kelajak_school_qarshi",
        "instagram": "@kelajakschool.qarshi",
        "district_key": "nasaf",
        "address": "Nasaf markaziy stadioni oldida",
        "latitude": 38.8635, "longitude": 65.7870,
        "monthly_price_uzs": 2_100_000, "entry_fee_uzs": 700_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "O'yin maydonchasi", "Xavfsizlik (CCTV)",
                     "Sport zali"],
        "rating": 4.2, "founded_year": 2021,
        "description": "Bolalarning kelajagiga mas'uliyat bilan yondashadigan maktab.",
        "is_featured": False, "is_verified": False,
    },
    {
        "name": "Nurziyo School",
        "school_type": "private",
        "phone": "+998 90 000 00 10",
        "email": "info@nurziyo.uz",
        "website": "",
        "telegram": "@nurziyo_school",
        "instagram": "@nurziyo.school",
        "district_key": "nasaf",
        "address": "Mobi.uz kompaniyasi, Chevar supermarketi oldida",
        "latitude": 38.8680, "longitude": 65.8000,
        "monthly_price_uzs": 1_900_000, "entry_fee_uzs": 600_000,
        "min_grade": 0, "max_grade": 9,
        "start_time": time(8, 30), "end_time": time(16, 30),
        "meals_per_day": 2, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona", "Xavfsizlik (CCTV)"],
        "rating": 4.3, "founded_year": 2022,
        "description": "Ziyo nuri bilan bolalarga yo'l ko'rsatuvchi xususiy maktab.",
        "is_featured": False, "is_verified": False,
    },
    {
        "name": "Umid Uchqunlari (Viloyat Sudi)",
        "school_type": "private",
        "phone": "+998 90 000 00 11",
        "email": "info@umiduchqunlari.uz",
        "website": "",
        "telegram": "@umid_uchqunlari_qarshi",
        "instagram": "@umiduchqunlari.qarshi",
        "district_key": "markaz",
        "address": "Viloyat Sudi ko'chasi, X5 supermarketi yaqinida",
        "latitude": 38.8560, "longitude": 65.7920,
        "monthly_price_uzs": 2_000_000, "entry_fee_uzs": 700_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona", "Xavfsizlik (CCTV)",
                     "Tasviriy san'at"],
        "rating": 4.4, "founded_year": 2019,
        "description": "Qarshidagi tajribali xususiy maktablardan biri.",
        "is_featured": False, "is_verified": True,
    },
    {
        "name": "Avitsena Maktabi",
        "school_type": "private",
        "phone": "+998 90 000 00 12",
        "email": "info@avitsena.uz",
        "website": "",
        "telegram": "@avitsena_school_qarshi",
        "instagram": "@avitsena.school",
        "district_key": "markaz",
        "address": "Viloyat sudidan chapga burilib, 41-maktab orqasida",
        "latitude": 38.8555, "longitude": 65.7930,
        "monthly_price_uzs": 2_200_000, "entry_fee_uzs": 800_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Tibbiyot yo'nalishi"],
        "rating": 4.5, "founded_year": 2020,
        "description": "Ibn Sino (Avitsena) nomidagi biologiya va tibbiyotga "
                       "yo'naltirilgan maktab.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Avitsena Bolalar Maktabi",
        "school_type": "private",
        "phone": "+998 90 000 00 13",
        "email": "info@avitsenajr.uz",
        "website": "",
        "telegram": "@avitsena_bolalar",
        "instagram": "@avitsena.bolalar",
        "district_key": "markaz",
        "address": "Shahar shifoxonasi yonida",
        "latitude": 38.8540, "longitude": 65.7945,
        "monthly_price_uzs": 1_800_000, "entry_fee_uzs": 500_000,
        "min_grade": 0, "max_grade": 4,
        "start_time": time(8, 30), "end_time": time(16, 0),
        "meals_per_day": 2, "max_students_per_class": 15,
        "languages": ["O'zbekcha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "O'yin maydonchasi", "Tasviriy san'at",
                     "Musiqa xonasi"],
        "rating": 4.4, "founded_year": 2021,
        "description": "Avitsena maktabining boshlang'ich sinflar uchun filiali.",
        "is_featured": False, "is_verified": True,
    },
    {
        "name": "Time School",
        "school_type": "private",
        "phone": "+998 90 000 00 14",
        "email": "info@timeschool.uz",
        "website": "",
        "telegram": "@time_school_qarshi",
        "instagram": "@timeschool.qarshi",
        "district_key": "markaz",
        "address": "Shahar shifoxonasi yonida",
        "latitude": 38.8542, "longitude": 65.7950,
        "monthly_price_uzs": 2_300_000, "entry_fee_uzs": 900_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Inglizcha", "Ruscha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Ingliz tili chuqurlashtirilgan"],
        "rating": 4.3, "founded_year": 2020,
        "description": "Vaqtni qadrlovchi va intensiv dasturga asoslangan maktab.",
        "is_featured": False, "is_verified": False,
    },
    {
        "name": "Alfa Xususiy Maktabi",
        "school_type": "private",
        "phone": "+998 95 255 10 30",
        "email": "info@qarshialfa.uz",
        "website": "https://t.me/qarshi_alfa",
        "telegram": "@qarshi_alfa",
        "instagram": "@qarshi_alfa",
        "district_key": "markaz",
        "address": "Xalq banki ro'parasida",
        "latitude": 38.8595, "longitude": 65.7885,
        "monthly_price_uzs": 2_500_000, "entry_fee_uzs": 1_000_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(18, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Inglizcha", "Ruscha", "Koreyscha", "Turkcha"],
        "curriculums": ["Milliy dastur", "Cambridge"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Ingliz tili chuqurlashtirilgan",
                     "Stipendiya tizimi", "IELTS tayyorgarlik"],
        "rating": 4.7, "founded_year": 2018,
        "description": "Ta'limning zamonaviy metodikasiga asoslangan maktab. "
                       "IELTS 8.0, C1 sertifikati, milliy sertifikat A+ "
                       "189 ball natijalari mavjud. Koreys va turk tili "
                       "kurslari ham bor.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Alfraganus Maktabi",
        "school_type": "private",
        "phone": "+998 90 000 00 17",
        "email": "info@alfraganus.uz",
        "website": "",
        "telegram": "@alfraganus_school",
        "instagram": "@alfraganus.school",
        "district_key": "paxtazor",
        "address": "Paxtazor, Mitti tuman, 19-maktab ro'parasi, Issiqnon yonida",
        "latitude": 38.8700, "longitude": 65.7760,
        "monthly_price_uzs": 2_000_000, "entry_fee_uzs": 700_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha", "Arabcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona", "IT laboratoriya",
                     "Matematika chuqurlashtirilgan"],
        "rating": 4.4, "founded_year": 2019,
        "description": "Al-Farg'oniy nomidagi aniq fanlarga ixtisoslashgan maktab.",
        "is_featured": False, "is_verified": True,
    },
    {
        "name": "Innova School",
        "school_type": "international",
        "phone": "+998 90 000 00 18",
        "email": "info@innovaschool.uz",
        "website": "",
        "telegram": "@innova_school_qarshi",
        "instagram": "@innovaschool.qarshi",
        "district_key": "markaz",
        "address": "Viloyat SES dan o'tganda, Arbat mehmonxonasi ro'parasida",
        "latitude": 38.8630, "longitude": 65.7860,
        "monthly_price_uzs": 3_200_000, "entry_fee_uzs": 1_500_000,
        "min_grade": 0, "max_grade": 11,
        "start_time": time(8, 30), "end_time": time(17, 30),
        "meals_per_day": 3, "max_students_per_class": 15,
        "languages": ["Inglizcha", "O'zbekcha", "Ruscha"],
        "curriculums": ["Cambridge", "Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Native o'qituvchilar",
                     "Ingliz tili chuqurlashtirilgan", "Robototexnika"],
        "rating": 4.6, "founded_year": 2020,
        "description": "Zamonaviy innovatsion metodikalarga asoslangan xalqaro maktab.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Oxford School (Qum Qishloq)",
        "school_type": "private",
        "phone": "+998 90 000 00 19",
        "email": "info@oxford-qumqishloq.uz",
        "website": "",
        "telegram": "@oxford_qum_qishloq",
        "instagram": "@oxford.qumqishloq",
        "district_key": "qum",
        "address": "Qum Qishloq masjidi ro'parasidagi ko'cha",
        "latitude": 38.8400, "longitude": 65.8100,
        "monthly_price_uzs": 1_800_000, "entry_fee_uzs": 600_000,
        "min_grade": 1, "max_grade": 9,
        "start_time": time(8, 0), "end_time": time(16, 30),
        "meals_per_day": 2, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona",
                     "Ingliz tili chuqurlashtirilgan"],
        "rating": 4.2, "founded_year": 2022,
        "description": "Qum Qishloq mahallasidagi ingliz tiliga ixtisoslashgan maktab.",
        "is_featured": False, "is_verified": False,
    },
    {
        "name": "Iqtidor Xalqaro Maktabi",
        "school_type": "international",
        "phone": "+998 90 638 82 82",
        "email": "info@iqtidor.school",
        "website": "https://iqtidor.school",
        "telegram": "@iqtidor_school",
        "instagram": "@iqtidor.school",
        "district_key": "markaz",
        "address": "Olimlar ko'chasi 6, Malaka oshirish instituti yonida",
        "latitude": 38.8612, "longitude": 65.7920,
        "monthly_price_uzs": 3_800_000, "entry_fee_uzs": 2_500_000,
        "min_grade": 0, "max_grade": 11,
        "start_time": time(8, 30), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 15,
        "languages": ["Inglizcha", "O'zbekcha", "Ruscha"],
        "curriculums": ["Cambridge", "Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Native o'qituvchilar",
                     "Ingliz tili chuqurlashtirilgan", "Robototexnika",
                     "Musiqa xonasi", "Tasviriy san'at", "Sport zali",
                     "Transport xizmati"],
        "rating": 4.8, "founded_year": 2019,
        "description": "Zamonaviy o'quv xonalari, musiqa va tasviriy san'at "
                       "xonasi, robototexnika, kompyuter xonasi, kutubxona, "
                       "sport zali va oshxonaga ega xalqaro maktab. "
                       "CCTV kameralari bilan jihozlangan. Kuniga 3 mahal "
                       "ovqatlanish, dietolog nazorati ostida.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Jahon School",
        "school_type": "international",
        "phone": "+998 90 000 00 21",
        "email": "info@jahonschool.uz",
        "website": "",
        "telegram": "@jahon_school_qarshi",
        "instagram": "@jahonschool.qarshi",
        "district_key": "markaz",
        "address": "Metro Mall dan o'tganda, Magniy oshxonaga yetmasdan",
        "latitude": 38.8525, "longitude": 65.8010,
        "monthly_price_uzs": 2_800_000, "entry_fee_uzs": 1_200_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 30),
        "meals_per_day": 3, "max_students_per_class": 16,
        "languages": ["Inglizcha", "O'zbekcha", "Ruscha"],
        "curriculums": ["Cambridge", "Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Ingliz tili chuqurlashtirilgan",
                     "Native o'qituvchilar"],
        "rating": 4.5, "founded_year": 2020,
        "description": "Jahon standartidagi ta'limni taklif qiluvchi xalqaro maktab.",
        "is_featured": True, "is_verified": True,
    },
    {
        "name": "Ulug'bek Maktabi",
        "school_type": "private",
        "phone": "+998 90 000 00 22",
        "email": "info@ulugbekschool-qarshi.uz",
        "website": "",
        "telegram": "@ulugbek_school_qarshi",
        "instagram": "@ulugbek.school.qarshi",
        "district_key": "markaz",
        "address": "Coca Cola kompaniyasi orqa tarafida",
        "latitude": 38.8475, "longitude": 65.7800,
        "monthly_price_uzs": 2_100_000, "entry_fee_uzs": 800_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Matematika chuqurlashtirilgan", "Astronomiya"],
        "rating": 4.4, "founded_year": 2019,
        "description": "Mirzo Ulug'bek nomidagi aniq fanlarga ixtisoslashgan maktab.",
        "is_featured": False, "is_verified": True,
    },
    {
        "name": "Beruniy Maktabi (Anhor)",
        "school_type": "private",
        "phone": "+998 90 000 00 23",
        "email": "info@beruniy-anhor.uz",
        "website": "",
        "telegram": "@beruniy_anhor",
        "instagram": "@beruniyschool_uz",
        "district_key": "markaz",
        "address": "Anhor chorrahasi",
        "latitude": 38.8650, "longitude": 65.7820,
        "monthly_price_uzs": 2_300_000, "entry_fee_uzs": 900_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona", "IT laboratoriya",
                     "Xavfsizlik (CCTV)"],
        "rating": 4.3, "founded_year": 2020,
        "description": "Beruniy maktabining Anhor chorrahasidagi ikkinchi filiali.",
        "is_featured": False, "is_verified": True,
    },
    {
        "name": "Umid Uchqunlari (Anhor)",
        "school_type": "private",
        "phone": "+998 90 000 00 24",
        "email": "info@umiduchqunlari-anhor.uz",
        "website": "",
        "telegram": "@umid_uchqunlari_anhor",
        "instagram": "@umiduchqunlari.anhor",
        "district_key": "markaz",
        "address": "Anhordan kirib, Kompyuter kollejiga yetmasdan",
        "latitude": 38.8640, "longitude": 65.7815,
        "monthly_price_uzs": 2_000_000, "entry_fee_uzs": 700_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 20,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "Kutubxona", "IT laboratoriya"],
        "rating": 4.3, "founded_year": 2020,
        "description": "Umid Uchqunlari maktabining Anhor filiali.",
        "is_featured": False, "is_verified": False,
    },
    {
        "name": "Farobiy School",
        "school_type": "private",
        "phone": "+998 90 000 00 25",
        "email": "info@farobischool.uz",
        "website": "",
        "telegram": "@farobiy_school_qarshi",
        "instagram": "@farobiy.school",
        "district_key": "markaz",
        "address": "Xonzoda supermarketi yonida, Tinchlik mehmonxonasi",
        "latitude": 38.8585, "longitude": 65.7875,
        "monthly_price_uzs": 2_400_000, "entry_fee_uzs": 900_000,
        "min_grade": 1, "max_grade": 11,
        "start_time": time(8, 0), "end_time": time(17, 0),
        "meals_per_day": 3, "max_students_per_class": 18,
        "languages": ["O'zbekcha", "Ruscha", "Inglizcha", "Arabcha"],
        "curriculums": ["Milliy dastur"],
        "features": ["Ovqatlanish", "IT laboratoriya", "Kutubxona",
                     "Xavfsizlik (CCTV)", "Musiqa xonasi"],
        "rating": 4.4, "founded_year": 2019,
        "description": "Abu Nasr Farobiy nomidagi ilmiy-falsafiy yo'nalishdagi maktab.",
        "is_featured": False, "is_verified": True,
    },
]

QARSHI_REVIEWS = [
    "Farzandim shu maktabda o'qiydi. O'qituvchilar juda professional va "
    "bolalarga e'tibor berishadi. Tavsiya qilaman!",
    "Ovqatlari sifatli, binolari toza. Xavfsizlik yaxshi yo'lga qo'yilgan.",
    "Qarshidagi eng yaxshi xususiy maktablardan biri. Bolam bu yerda juda "
    "ko'p narsa o'rgandi.",
    "Sinflardagi bolalar soni kam, shuning uchun har bir o'quvchiga "
    "individual yondashadi.",
    "Ingliz tili darslari juda kuchli. Bolam endi erkin gapira oladi.",
    "Narxi biroz qimmatroq, lekin sifat uchun arziydi.",
    "Direktor va o'qituvchilar ota-onalar bilan doimo aloqada bo'ladi.",
    "Bolam maktabga qiziqish bilan boradi. Bu juda muhim.",
    "IT xonalari zamonaviy jihozlangan. Robototexnika darslari ham bor.",
    "Matematika darslari chuqur o'rgatiladi. Olimpiadalarda g'olib "
    "bo'lgan o'quvchilar ko'p.",
    "Transport xizmati qulay, bolam o'z vaqtida yetib boradi.",
    "Farzandimga alohida e'tibor berishgani uchun rahmat!",
    "Sport zali bor, basketbol va futbol o'ynash mumkin.",
    "Kutubxonasi boy, bolalar kitob o'qishga qiziqishdi.",
    "Stipendiya tizimi bor — iqtidorli bolalar uchun yaxshi imkoniyat.",
]
QARSHI_AUTHORS = [
    "Aziza Karimova", "Bobur Rahimov", "Dilnoza Saidova",
    "Eldor To'rayev", "Feruza Xolmatova", "G'ulom Nazarov",
    "Hulkar Ismoilova", "Ibrohim Jo'rayev", "Jamila Abdullayeva",
    "Kamol Usmonov", "Lola Tursunova", "Muzaffar Bekmurodov",
    "Nigora Yusupova", "Otabek Rasulov", "Pariza Mamatova",
    "Qudratullo Xoliqov", "Rustam Jabborov", "Sevara Qosimova",
]


class Command(BaseCommand):
    help = "Qarshi shahri xususiy maktablarini DB ga qo'shadi"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear", action="store_true",
            help="Qarshi maktablarini o'chirib, qayta to'ldirish"
        )

    @transaction.atomic
    def handle(self, *args, **opts):
        if opts["clear"]:
            self.stdout.write("🗑  Qarshi maktablari o'chirilmoqda...")
            qarshi_slugs = list(QARSHI_DISTRICT_SLUGS.values())
            deleted_schools = School.objects.filter(
                district__slug__in=qarshi_slugs
            ).delete()
            District.objects.filter(slug__in=qarshi_slugs).delete()
            self.stdout.write(f"   ✓ o'chirildi: {deleted_schools}")

        # 1) QARSHI HUDUDLARI
        self.stdout.write("📍 Qarshi hududlari yaratilmoqda...")
        district_map = {}
        for key, slug in QARSHI_DISTRICT_SLUGS.items():
            name = {
                "markaz": "Qarshi — Markaz",
                "nasaf": "Qarshi — Nasaf",
                "paxtazor": "Qarshi — Paxtazor",
                "site": "Qarshi — Site",
                "aralovul": "Qarshi — Aralovul",
                "qum": "Qarshi — Qum Qishloq",
                "beshkent": "Qarshi — Beshkent yo'li",
            }[key]
            obj, _ = District.objects.get_or_create(
                slug=slug, defaults={"name": name}
            )
            # Agar mavjud bo'lsa, nomini yangilaymiz
            if obj.name != name:
                obj.name = name
                obj.save()
            district_map[key] = obj
        self.stdout.write(f"   ✓ {len(district_map)} hudud")

        # 2) TILLAR
        self.stdout.write("🌍 Tillar yaratilmoqda...")
        lang_map = {}
        for name, code in LANGUAGES:
            obj, _ = Language.objects.get_or_create(
                name=name, defaults={"code": code}
            )
            lang_map[name] = obj

        # 3) DASTURLAR
        curr_map = {}
        for name, desc in CURRICULUMS:
            obj, _ = Curriculum.objects.get_or_create(
                name=name, defaults={"description": desc}
            )
            curr_map[name] = obj

        # 4) IMKONIYATLAR
        feat_map = {}
        for name, icon in FEATURES:
            obj, _ = Feature.objects.get_or_create(
                name=name, defaults={"icon": icon}
            )
            feat_map[name] = obj

        # 5) MAKTABLAR
        self.stdout.write("🏫 Maktablar qo'shilmoqda...")
        created_count = 0
        review_count = 0

        for s in QARSHI_SCHOOLS:
            base_slug = slugify(s["name"], allow_unicode=False)
            # noyob slug
            slug = base_slug
            i = 1
            while (School.objects
                   .filter(slug=slug)
                   .exclude(name=s["name"])
                   .exists()):
                slug = f"{base_slug}-{i}"
                i += 1

            school, was_created = School.objects.update_or_create(
                name=s["name"],
                defaults={
                    "slug": slug,
                    "school_type": s["school_type"],
                    "phone": s["phone"],
                    "email": s["email"],
                    "website": s["website"],
                    "telegram": s.get("telegram", ""),
                    "instagram": s.get("instagram", ""),
                    "district": district_map[s["district_key"]],
                    "address": s["address"],
                    "latitude": s["latitude"],
                    "longitude": s["longitude"],
                    "monthly_price_uzs": s["monthly_price_uzs"],
                    "entry_fee_uzs": s["entry_fee_uzs"],
                    "min_grade": s["min_grade"],
                    "max_grade": s["max_grade"],
                    "start_time": s["start_time"],
                    "end_time": s["end_time"],
                    "meals_per_day": s["meals_per_day"],
                    "max_students_per_class": s["max_students_per_class"],
                    "rating": s["rating"],
                    "founded_year": s["founded_year"],
                    "description": s["description"],
                    "short_description": s["description"][:250],
                    "is_featured": s["is_featured"],
                    "is_verified": s["is_verified"],
                    "is_active": True,
                },
            )

            # M2M
            school.languages.set(
                [lang_map[l] for l in s["languages"] if l in lang_map]
            )
            school.curriculums.set(
                [curr_map[c] for c in s["curriculums"] if c in curr_map]
            )
            school.features.set(
                [feat_map[f] for f in s["features"] if f in feat_map]
            )

            # Har bir maktabga 3–7 ta sharh
            if was_created or school.reviews.count() == 0:
                for _ in range(random.randint(3, 7)):
                    Review.objects.create(
                        school=school,
                        author_name=random.choice(QARSHI_AUTHORS),
                        rating=random.randint(4, 5),
                        text=random.choice(QARSHI_REVIEWS),
                        is_approved=True,
                    )
                    review_count += 1
                reviews = school.reviews.filter(is_approved=True)
                if reviews.exists():
                    school.rating = round(
                        sum(r.rating for r in reviews) / reviews.count(), 2
                    )
                    school.reviews_count = reviews.count()
                    school.save(update_fields=["rating", "reviews_count"])

            created_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"\n✅ Muvaffaqiyatli!"
            f"\n   📍 Qarshi hududlari: {len(district_map)}"
            f"\n   🏫 Maktablar: {created_count}"
            f"\n   💬 Yangi sharhlar: {review_count}"
        ))
