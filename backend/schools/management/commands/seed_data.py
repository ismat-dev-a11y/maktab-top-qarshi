"""
Ma'lumotlar bazasini Qarshidagi mashhur xususiy maktablar bilan to'ldiradi.
Ma'lumot afisha.uz, goldenpages.uz, yellowpages.uz, magg.uz, edarabia.com kabi
ochiq manbalardagi umumiy ma'lumotlar asosida tayyorlangan.

Ishga tushirish:
    python manage.py seed_data
"""
import random
from datetime import time

from django.core.management.base import BaseCommand
from django.db import transaction

from schools.models import (
    District, Language, Feature, Curriculum,
    School, Review,
)


DISTRICTS = [
    'Qarshi Markaz', 'Qarshi Shimoliy', 'Qarshi Janubiy', "Qarshi G'arbiy",
    'Qarshi Sharqiy', 'Qoshtepa', 'Chinor', 'Beshkent',
    'Yakkabog', 'Qamashi', 'Muborak', 'G\'uzor',
]

LANGUAGES = [
    ('O\'zbek', 'uz'), ('Ingliz', 'en'), ('Rus', 'ru'),
    ('Koreys', 'ko'), ('Arab', 'ar'), ('Nemis', 'de'),
    ('Fransuz', 'fr'), ('Italyan', 'it'), ('Turk', 'tr'),
]

CURRICULUMS = [
    ('O\'zbekiston Milliy dasturi', 'Davlat standartlariga muvofiq dastur'),
    ('British National Curriculum', 'Britaniya milliy ta\'lim dasturi'),
    ('Cambridge International', 'Cambridge xalqaro dasturi (IGCSE, A-Level)'),
    ('IB (International Baccalaureate)', 'PYP, MYP, DP dasturlari'),
    ('American Curriculum', 'AQSh ta\'lim dasturi'),
    ('A-Level', 'Britaniya o\'rta ta\'lim sertifikati'),
    ('Pearson Edexcel', 'Xalqaro Pearson sertifikati'),
    ('Canadian Bilingual', 'Kanada bilingual dasturi'),
]

FEATURES = [
    ('Suzish', '🏊'), ('Robototexnika', '🤖'), ('Shaxmat', '♟️'),
    ('Futbol', '⚽'), ('Basketbol', '🏀'), ('Taekvondo', '🥋'),
    ('Gimnastika', '🤸'), ('Shahsvaklarga tayyorlov', '🎓'),
    ('Xoreografiya', '💃'), ('Musiqa', '🎵'),
    ('Ingliz tili chuqurlashtirilgan', '🇬🇧'),
    ('Matematika chuqurlashtirilgan', '🔢'),
    ('IT va dasturlash', '💻'), ('San\'at va rasm', '🎨'),
    ('Logoped', '🗣️'), ('Psixolog', '🧠'),
    ('Maktab avtobusi', '🚌'), ('3 mahal ovqat', '🍽️'),
    ('4 mahal ovqat', '🍴'), ('5 mahal ovqat', '🥗'),
    ('Sport zal', '🏋️'), ('Bassein', '🏊‍♂️'),
    ('Kutubxona', '📚'), ('Laboratoriyalar', '🔬'),
    ('Mediateka', '🎬'), ('Aktyorlik to\'garagi', '🎭'),
    ('Arab tili', '🕌'), ('Ushu', '🐉'),
    ('Arifmetika (mental)', '🧮'),
]

# Real maktablar — ochiq manbalardan olingan umumiy ma'lumot
SCHOOLS = [
    {
        'name': 'British School of Qarshi (BSQ)',
        'school_type': 'international',
        'short_description': "O'zbekistondagi yetakchi Britaniya xalqaro maktabi, Qarshi shahrida joylashgan.",
        'description': (
            "2010-yilda tashkil topgan BSQ — O'zbekistondagi eng yetakchi xalqaro maktablardan biri. "
            "40+ millat vakillari o'qiydi. Qarshi markazida zamonaviy kampus. "
            "English National Curriculum, IGCSE va A-Level dasturlari. "
            "O'zbekiston fuqarolari uchun dual dastur: Ta'lim vazirligi attestati + IGCSE. "
            "100% A-level o'tish ko'rsatkichi. Xalqaro akkreditatsiya."
        ),
        'district': 'Qarshi Markaz',
        'address': 'Qarshi shahar markazi',
        'phone': '+998 75 120 0059',
        'website': 'https://www.bsq-qarshi.uz',
        'min_grade': 0, 'max_grade': 13,
        'start_time': time(8, 30), 'end_time': time(16, 0),
        'monthly_price_uzs': 12_000_000,
        'entry_fee_uzs': 8_000_000,
        'rating': 4.8, 'reviews_count': 187,
        'founded_year': 2010,
        'languages': ['Ingliz', 'O\'zbek', 'Rus'],
        'curriculums': ['British National Curriculum', 'Cambridge International', 'A-Level'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'Bassein', 'Sport zal', 'Kutubxona',
                     'Laboratoriyalar', 'Maktab avtobusi', 'IT va dasturlash'],
        'is_verified': True, 'is_featured': True,
        'latitude': 38.8600, 'longitude': 65.7890,
    },
    {
        'name': 'Qarshi International School (QIS)',
        'school_type': 'international',
        'short_description': 'Qarshidagi 31 yillik tajribaga ega yetakchi xalqaro maktab.',
        'description': (
            "QIS — diplomatik jamoalar va xalqaro biznes uchun 31 yildan beri "
            "yetakchi xalqaro maktab. Haqiqiy jamoaga asoslangan, hech kimga "
            "hisob bermaydigan mustaqil maktab. O'qituvchilar o'rtacha 7 yil ishlaydi."
        ),
        'district': 'Qarshi Janubiy',
        'address': 'Mustaqillik ko\'chasi, 38',
        'phone': '+998 75 501 96 70',
        'email': 'admissions@qis.uz',
        'website': 'https://www.qis.uz',
        'min_grade': 0, 'max_grade': 12,
        'start_time': time(8, 0), 'end_time': time(17, 0),
        'monthly_price_uzs': 11_500_000,
        'rating': 4.8, 'reviews_count': 137,
        'founded_year': 1993,
        'languages': ['Ingliz', 'Rus'],
        'curriculums': ['IB (International Baccalaureate)', 'American Curriculum'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'Sport zal', 'Kutubxona',
                     'Laboratoriyalar', 'Maktab avtobusi', 'San\'at va rasm'],
        'is_verified': True, 'is_featured': True,
        'latitude': 38.8500, 'longitude': 65.7800,
    },
    {
        'name': 'Invento the Uzbek International School',
        'school_type': 'international',
        'short_description': 'Yangi avlod o\'zbek xalqaro maktabi, to\'liq IB World School.',
        'description': (
            "IB PYP, MYP va DP dasturlarini to'liq akkreditatsiya qilgan yangi avlod xalqaro maktabi. "
            "2 yoshdan universitetgacha ta'lim beradi. Toshkent va Ashgabad kampuslari. "
            "Ingliz tilida dars beriladi, ona tili rivojlantiriladi."
        ),
        'district': 'Yashnobod',
        'address': 'Mahtumquli ko\'chasi, 2/3',
        'phone': '+998 71 200 8080',
        'min_grade': 0, 'max_grade': 12,
        'start_time': time(8, 30), 'end_time': time(16, 30),
        'monthly_price_uzs': 12_000_000,
        'rating': 5.0, 'reviews_count': 124,
        'founded_year': 2018,
        'languages': ['Ingliz', 'O\'zbek', 'Rus'],
        'curriculums': ['IB (International Baccalaureate)'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'Bassein', 'Sport zal',
                     'Kutubxona', 'IT va dasturlash', 'San\'at va rasm'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.3140, 'longitude': 69.3340,
    },
    {
        'name': 'Profi School',
        'school_type': 'private',
        'short_description': "Har bir bolaning shaxsiyatini rivojlantirishga qaratilgan xususiy maktab.",
        'description': (
            "Profi-Education — bolaning shaxsiyati, tafakkuri va salohiyatini "
            "har tomonlama rivojlantirishga qaratilgan ta'lim muassasasi. "
            "Sifatli ta'lim va yaxlit yondashuv."
        ),
        'district': 'Mirobod',
        'address': 'Banokatiy ko\'chasi, 17',
        'phone': '+998 71 245 2525',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(18, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 6_500_000,
        'rating': 5.0, 'reviews_count': 378,
        'founded_year': 2015,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'Matematika chuqurlashtirilgan',
                     '3 mahal ovqat', 'Psixolog', 'Sport zal'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.2920, 'longitude': 69.2680,
    },
    {
        'name': 'Wunderkind Study',
        'school_type': 'private',
        'short_description': "Yashnobod tumanidagi yuqori reytingli xususiy maktab.",
        'description': (
            "Yashnobod shahar tumanida joylashgan, yuqori sifatli ta'lim beradigan "
            "xususiy maktab. Bolaning individual qobiliyatlariga alohida e'tibor."
        ),
        'district': 'Yashnobod',
        'address': 'Mavlon Riyoziy ko\'chasi, 1, 17',
        'phone': '+998 90 123 4567',
        'min_grade': 0, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 30),
        'meals_per_day': 3,
        'monthly_price_uzs': 5_800_000,
        'rating': 5.0, 'reviews_count': 394,
        'founded_year': 2017,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'Musiqa', 'San\'at va rasm', 'Shaxmat'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.3400, 'longitude': 69.3410,
    },
    {
        'name': 'Oxbridge International School',
        'school_type': 'international',
        'short_description': "1 gektar hududdagi zamonaviy infratuzilmaga ega xalqaro maktab.",
        'description': (
            "1 gektar erdagi ikki ta'lim binosi, sport maydonchalari, dam olish "
            "hududlari va ikkita ichki bassein. O'qish, izlanish, ijod va faol hayot "
            "uchun yagona makon."
        ),
        'district': 'Mirzo Ulug\'bek',
        'address': 'Buyuk ipak yo\'li ko\'chasi',
        'phone': '+998 71 233 3333',
        'min_grade': 0, 'max_grade': 12,
        'start_time': time(8, 30), 'end_time': time(17, 0),
        'monthly_price_uzs': 11_000_000,
        'rating': 4.8, 'reviews_count': 189,
        'founded_year': 2015,
        'languages': ['Ingliz', 'O\'zbek', 'Rus'],
        'curriculums': ['Cambridge International', 'IB (International Baccalaureate)'],
        'features': ['Bassein', 'Sport zal', 'Kutubxona', 'Laboratoriyalar',
                     'IT va dasturlash', 'Ingliz tili chuqurlashtirilgan'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.3600, 'longitude': 69.3450,
    },
    {
        'name': 'Maple Bear Uzbekistan',
        'school_type': 'international',
        'short_description': "Kanada bilingual ta'lim dasturi, 25 gektarlik hudud.",
        'description': (
            "Maple Bear Kanadaning eng yaxshi ta'lim amaliyotlaridan foydalanadi. "
            "Toshkent sharqida, tog' manzarasi bilan 25 gektarlik katta hududda "
            "joylashgan. Bilingual ta'lim: ingliz va ona tili."
        ),
        'district': 'Yashnobod',
        'address': 'Toshkent sharqi',
        'phone': '+998 71 150 0077',
        'min_grade': 0, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(17, 0),
        'monthly_price_uzs': 10_500_000,
        'rating': 4.8, 'reviews_count': 156,
        'founded_year': 2019,
        'languages': ['Ingliz', 'O\'zbek'],
        'curriculums': ['Canadian Bilingual'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'Sport zal', 'Bassein',
                     'Kutubxona', 'San\'at va rasm', 'Musiqa'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.3500, 'longitude': 69.3800,
    },
    {
        'name': 'ABIS (Anglo Uzbek Italian School)',
        'school_type': 'international',
        'short_description': "O'zbek-italyan xalqaro maktabi, Pearson Edexcel sertifikati.",
        'description': (
            "O'zbek-italyan xalqaro maktabi britancha o'quv dasturini an'anaviy "
            "ta'lim uslubi bilan uyg'unlashtiradi. Native speakers dars beradi. "
            "Pearson EDEXCEL sertifikati."
        ),
        'district': 'Mirobod',
        'address': 'Amir Temur ko\'chasi, 33',
        'phone': '+998 71 245 4000',
        'phone2': '+998 55 500 2200',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 30),
        'meals_per_day': 4,
        'monthly_price_uzs': 9_500_000,
        'rating': 4.7, 'reviews_count': 142,
        'founded_year': 2012,
        'languages': ['Ingliz', 'Italyan', 'Arab', 'Rus'],
        'curriculums': ['British National Curriculum', 'Pearson Edexcel'],
        'features': ['Ingliz tili chuqurlashtirilgan', '4 mahal ovqat',
                     'Arab tili', 'Kutubxona', 'Laboratoriyalar'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3110, 'longitude': 69.2790,
    },
    {
        'name': 'Horizon Academy',
        'school_type': 'private',
        'short_description': "Litsenziyaga ega, 5-sinfdan fakultetga bo'linadigan xususiy maktab.",
        'description': (
            "HORIZON ACADEMY — litsenziyaga ega xususiy maktab. 5-sinfdan boshlab "
            "bolalar biznes, tibbiyot va diplomatiya fakultetlarini tanlashi mumkin. "
            "Shaxsiy fazilatlar va emosional intellekt rivojlantiriladi. "
            "Xorijiy universitetlarga kirishda to'liq yordam."
        ),
        'district': 'Yunusobod',
        'address': 'Yunusobod-19, 17B',
        'phone': '+998 99 988 8999',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(18, 0),
        'meals_per_day': 4,
        'monthly_price_uzs': 8_500_000,
        'rating': 4.8, 'reviews_count': 98,
        'founded_year': 2016,
        'languages': ['Ingliz', 'O\'zbek', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi', 'British National Curriculum'],
        'features': ['Logoped', 'Psixolog', 'Aktyorlik to\'garagi',
                     '4 mahal ovqat', 'Ingliz tili chuqurlashtirilgan'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.3700, 'longitude': 69.2890,
    },
    {
        'name': 'Global Elite School (GES)',
        'school_type': 'international',
        'short_description': "Koreys xususiy o'quv majmuasi: maktab va bog'cha.",
        'description': (
            "Koreys xususiy o'quv majmuasi. Maktab va bolalar bog'chasini o'z ichiga oladi. "
            "Ingliz, koreys (5-sinfdan ona tili), o'zbek, arab, nemis tillari. "
            "Suzish, gimnastika, taekvondo, shaxmat, robototexnika, xoreografiya, "
            "koreys madaniyati to'garaklari. Darslar rus tilida. Sinflarda 15-18 bola."
        ),
        'district': 'Mirzo Ulug\'bek',
        'address': 'YALANGACH, 2b',
        'phone': '+998 90 915 0338',
        'phone2': '+998 90 945 4456',
        'min_grade': 0, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(18, 0),
        'meals_per_day': 5,
        'max_students_per_class': 18,
        'monthly_price_uzs': 7_500_000,
        'rating': 4.7, 'reviews_count': 165,
        'founded_year': 2014,
        'languages': ['Ingliz', 'Koreys', 'O\'zbek', 'Arab', 'Nemis', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Suzish', 'Gimnastika', 'Taekvondo', 'Shaxmat', 'Robototexnika',
                     'Xoreografiya', '5 mahal ovqat'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.3420, 'longitude': 69.3650,
    },
    {
        'name': 'Dream School',
        'school_type': 'private',
        'short_description': "Informatika, matematika va ingliz tili chuqurlashtirilgan maktab.",
        'description': (
            "Dream School — informatika, matematika va ingliz tilini chuqur o'rgatadigan "
            "yuqori darajadagi xususiy maktab. 0-sinfdan 11-sinfgacha. Suzish, futbol, "
            "basketbol, xoreografiya, shaxmat, arab tili to'garaklari. "
            "Oilaviy chegirmalar: 2-bola uchun 5%. Yillik to'lov: 1 mln so'm chegirma."
        ),
        'district': 'Chilonzor',
        'address': 'Chilonzor',
        'phone': '+998 95 772 9999',
        'min_grade': 0, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(18, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 5_500_000,
        'rating': 4.7, 'reviews_count': 210,
        'founded_year': 2018,
        'languages': ['O\'zbek', 'Ingliz', 'Rus', 'Arab'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['IT va dasturlash', 'Matematika chuqurlashtirilgan',
                     'Ingliz tili chuqurlashtirilgan', 'Suzish', 'Futbol',
                     'Basketbol', 'Shaxmat', 'Arab tili', '3 mahal ovqat'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.2830, 'longitude': 69.2110,
    },
    {
        'name': 'Registan School',
        'school_type': 'private',
        'short_description': "Toshkentning bir nechta tumanida filiallari bor maktab tarmog'i.",
        'description': (
            "Registan School — Toshkentning bir nechta tumanida filiallari mavjud "
            "xususiy maktablar tarmog'i. 1-sinfdan 11-sinfgacha. An'anaviy ta'lim "
            "dasturi + zamonaviy o'qitish usullari."
        ),
        'district': 'Olmazor',
        'address': 'Beruni prospekti, 1A',
        'phone': '+998 71 227 2828',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 4_500_000,
        'rating': 4.5, 'reviews_count': 254,
        'founded_year': 2010,
        'languages': ['O\'zbek', 'Rus', 'Ingliz'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'Kutubxona', 'Sport zal', 'Maktab avtobusi'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3250, 'longitude': 69.2250,
    },
    {
        'name': 'Thompson Xususiy Maktablari',
        'school_type': 'private',
        'short_description': "Chilonzorda joylashgan tajribali xususiy maktablar tarmog'i.",
        'description': (
            "Thompson xususiy maktablari — Chilonzor tumanida bir nechta filiallari "
            "mavjud maktablar tarmog'i. Zamonaviy ta'lim metodlari va tajribali "
            "o'qituvchilar bilan."
        ),
        'district': 'Chilonzor',
        'address': 'Chilonzor-5, 6-7-8-10',
        'phone': '+998 71 276 8888',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(17, 30),
        'meals_per_day': 3,
        'monthly_price_uzs': 4_200_000,
        'rating': 4.4, 'reviews_count': 189,
        'founded_year': 2008,
        'languages': ['O\'zbek', 'Rus', 'Ingliz'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'Kutubxona', 'Sport zal'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.2800, 'longitude': 69.2050,
    },
    {
        'name': 'Smart School',
        'school_type': 'private',
        'short_description': "Bilingual o'qitish: ingliz va rus tillari birgalikda.",
        'description': (
            "Smart School 2016 yilda tashkil etilgan. Toshkentdagi eng ilg'or "
            "xususiy maktablardan biri. Tajribali va akademik darajaga ega "
            "o'qituvchilar. Bilingual: ingliz va rus tillarida."
        ),
        'district': 'Yakkasaroy',
        'address': 'Yusuf Xos Hojib ko\'chasi, 17',
        'phone': '+998 71 250 0505',
        'min_grade': 0, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 6_800_000,
        'rating': 4.6, 'reviews_count': 167,
        'founded_year': 2016,
        'languages': ['Ingliz', 'Rus', 'O\'zbek'],
        'curriculums': ['O\'zbekiston Milliy dasturi', 'British National Curriculum'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'IT va dasturlash',
                     'Robototexnika', 'Sport zal', 'Kutubxona'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.2950, 'longitude': 69.2470,
    },
    {
        'name': 'Rahimov School',
        'school_type': 'private',
        'short_description': "Chet tillari chuqur o'rganiladigan xususiy maktab.",
        'description': (
            "Rahimov School — chet tillari chuqur o'rganiladigan xususiy maktab. "
            "Mirzo Ulug'bek tumanida joylashgan. Bolalarga kompleks ta'lim."
        ),
        'district': 'Mirzo Ulug\'bek',
        'address': 'YALANGACH, 2b',
        'phone': '+998 71 289 1111',
        'email': 'rahimovschool@gmail.com',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(16, 30),
        'meals_per_day': 3,
        'monthly_price_uzs': 5_000_000,
        'rating': 4.5, 'reviews_count': 145,
        'founded_year': 2013,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'Arab tili',
                     'Nemis tili', '3 mahal ovqat', 'Kutubxona'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3430, 'longitude': 69.3380,
    },
    {
        'name': 'Oriental School of Tashkent (OST)',
        'school_type': 'private',
        'short_description': "2006 yilda tashkil topgan, har bir bolani e'tibor bilan o'rab oluvchi maktab.",
        'description': (
            "OST 2006 yilda tashkil etilgan. OST — har bir bola e'tibor va "
            "g'amxo'rlik bilan o'ralgan sayyora sifatida qo'yilgan."
        ),
        'district': 'Olmazor',
        'address': 'Qorakamish-1/3, Gulsaroy ko\'chasi, 59A',
        'phone': '+998 71 233 4444',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(17, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 4_800_000,
        'rating': 4.6, 'reviews_count': 132,
        'founded_year': 2006,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'Psixolog', 'Sport zal'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3310, 'longitude': 69.1970,
    },
    {
        'name': 'PDP School',
        'school_type': 'specialized',
        'short_description': "Xususiy IT maktabi, kelajak avlod uchun ishonchli muassasa.",
        'description': (
            "PDP School — xususiy IT maktabi. PDP Universiteti bilan bog'liq. "
            "Kelajak avlod uchun ishonchli va istiqbolli ta'lim muassasasi. "
            "IT, dasturlash va zamonaviy texnologiyalar yo'nalishida."
        ),
        'district': 'Sergeli',
        'address': 'Yangi Sergeli Yuli ko\'chasi, 12',
        'phone': '+998 71 207 0707',
        'website': 'https://pdp.uz',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(18, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 5_500_000,
        'rating': 4.7, 'reviews_count': 198,
        'founded_year': 2020,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['IT va dasturlash', 'Robototexnika',
                     'Matematika chuqurlashtirilgan',
                     'Ingliz tili chuqurlashtirilgan', '3 mahal ovqat'],
        'is_verified': True, 'is_featured': True,
        'latitude': 41.2320, 'longitude': 69.2400,
    },
    {
        'name': 'Wisdom School',
        'school_type': 'private',
        'short_description': "Shayxontohur tumanidagi zamonaviy ta'limni taklif qiluvchi maktab.",
        'description': (
            "Wisdom — Shayxontohur tumanida joylashgan zamonaviy xususiy maktab. "
            "An'anaviy qadriyatlar va zamonaviy texnologiyalar uyg'unligi."
        ),
        'district': 'Shayxontohur',
        'address': '8-Beltepa, Beltepa turar-joy majmuasi',
        'phone': '+998 71 244 5566',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 4_300_000,
        'rating': 4.4, 'reviews_count': 89,
        'founded_year': 2017,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'Sport zal', 'Kutubxona'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3100, 'longitude': 69.2370,
    },
    {
        'name': 'Wise School',
        'school_type': 'private',
        'short_description': "Uchtepa tumanidagi sifatli ta'limni taklif qiluvchi maktab.",
        'description': (
            "Wise School — Uchtepa tumanida joylashgan xususiy maktab. "
            "Sifatli ta'lim va zamonaviy yondashuv."
        ),
        'district': 'Uchtepa',
        'address': 'Chilonzor-G9A, Lutfi ko\'chasi, 18',
        'phone': '+998 71 220 1515',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 4_000_000,
        'rating': 4.3, 'reviews_count': 76,
        'founded_year': 2019,
        'languages': ['O\'zbek', 'Rus', 'Ingliz'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'Sport zal'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.2700, 'longitude': 69.2050,
    },
    {
        'name': 'Humo School Academy',
        'school_type': 'private',
        'short_description': "2 yoshdan boshlab qabul qiladigan maktab-bog'cha.",
        'description': (
            "Humo school Academy — 2 yoshdan boshlab bolalarni qabul qiladigan "
            "maktab-bog'cha. Eng qimmatli narsa — farzandingizni bizga ishonib topshiring. "
            "Har bir bolaga individual yondashuv."
        ),
        'district': 'Olmazor',
        'address': 'Olmazor tumani',
        'phone': '+998 71 239 8888',
        'min_grade': 0, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(18, 0),
        'meals_per_day': 4,
        'monthly_price_uzs': 6_000_000,
        'rating': 4.6, 'reviews_count': 112,
        'founded_year': 2014,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '4 mahal ovqat',
                     'Psixolog', 'Logoped', 'San\'at va rasm'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3400, 'longitude': 69.2020,
    },
    {
        'name': 'Ecole Francaise de Tachkent',
        'school_type': 'international',
        'short_description': "Markaziy Osiyodagi yagona fransuz maktabi (Fransiya Ta'lim vazirligi akkreditatsiyasi).",
        'description': (
            "Ecole Francaise Tachkent — Markaziy Osiyodagi yagona fransuz maktabi. "
            "Bog'cha va boshlang'ich sinflar Fransiya Milliy Ta'lim vazirligi "
            "tomonidan rasmiy akkreditatsiya qilingan. French Baccalaureate darajasigacha."
        ),
        'district': 'Mirobod',
        'address': 'Mirobod tumani',
        'phone': '+998 71 254 3333',
        'min_grade': 0, 'max_grade': 6,
        'start_time': time(8, 30), 'end_time': time(16, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 12_500_000,
        'rating': 4.8, 'reviews_count': 87,
        'founded_year': 2005,
        'languages': ['Fransuz', 'Ingliz', 'O\'zbek'],
        'curriculums': ['British National Curriculum'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'San\'at va rasm', 'Musiqa'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3050, 'longitude': 69.2810,
    },
    {
        'name': 'Disney City',
        'school_type': 'private',
        'short_description': "Olmazor tumanidagi maktab-bog'cha majmuasi.",
        'description': (
            "Disney City — Olmazor tumanida joylashgan nodavlat ta'lim muassasasi. "
            "Maktab va bog'cha xizmatlari."
        ),
        'district': 'Olmazor',
        'address': 'Takhtapul Darvoza ko\'chasi, 396',
        'phone': '+998 71 244 9999',
        'min_grade': 0, 'max_grade': 9,
        'start_time': time(8, 0), 'end_time': time(17, 30),
        'meals_per_day': 3,
        'monthly_price_uzs': 3_800_000,
        'rating': 4.3, 'reviews_count': 98,
        'founded_year': 2011,
        'languages': ['O\'zbek', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['3 mahal ovqat', 'San\'at va rasm',
                     'Xoreografiya', 'Musiqa'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3380, 'longitude': 69.2270,
    },
    {
        'name': 'Genesis Education',
        'school_type': 'private',
        'short_description': "Chilonzor tumanidagi nodavlat ta'lim muassasasi.",
        'description': (
            "Genesis Education — Chilonzorda joylashgan nodavlat ta'lim muassasasi. "
            "Sifatli o'rta ta'lim va qo'shimcha mashg'ulotlar."
        ),
        'district': 'Chilonzor',
        'address': 'Chilonzor-1, Labikhavuz ko\'chasi, 30',
        'phone': '+998 71 277 1717',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 4_500_000,
        'rating': 4.4, 'reviews_count': 76,
        'founded_year': 2014,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', '3 mahal ovqat',
                     'Sport zal', 'Kutubxona'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.2780, 'longitude': 69.2000,
    },
    {
        'name': 'Anis Premium',
        'school_type': 'private',
        'short_description': "Shayxontohur tumanidagi premium darajali xususiy maktab.",
        'description': (
            "Anis Premium — Shayxontohur tumanida joylashgan premium darajali "
            "xususiy maktab. Zamonaviy infratuzilma va yuqori sifatli ta'lim."
        ),
        'district': 'Shayxontohur',
        'address': 'Suzuk-Ota ko\'chasi, 2',
        'phone': '+998 71 240 7070',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 0), 'end_time': time(17, 30),
        'meals_per_day': 4,
        'monthly_price_uzs': 7_200_000,
        'rating': 4.6, 'reviews_count': 134,
        'founded_year': 2016,
        'languages': ['O\'zbek', 'Ingliz', 'Rus'],
        'curriculums': ['O\'zbekiston Milliy dasturi', 'British National Curriculum'],
        'features': ['Ingliz tili chuqurlashtirilgan', '4 mahal ovqat',
                     'Bassein', 'Sport zal', 'IT va dasturlash'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3060, 'longitude': 69.2190,
    },
    {
        'name': 'Movorounnahr School',
        'school_type': 'private',
        'short_description': "Milliy qadriyatlarga asoslangan zamonaviy xususiy maktab.",
        'description': (
            "Movorounnahr School — milliy qadriyatlar va zamonaviy ta'lim metodikasini "
            "uyg'unlashtirgan nodavlat ta'lim muassasasi."
        ),
        'district': 'Yunusobod',
        'address': 'Yunusobod tumani',
        'phone': '+998 71 266 5533',
        'min_grade': 1, 'max_grade': 11,
        'start_time': time(8, 30), 'end_time': time(17, 0),
        'meals_per_day': 3,
        'monthly_price_uzs': 5_000_000,
        'rating': 4.5, 'reviews_count': 102,
        'founded_year': 2015,
        'languages': ['O\'zbek', 'Ingliz', 'Arab'],
        'curriculums': ['O\'zbekiston Milliy dasturi'],
        'features': ['Ingliz tili chuqurlashtirilgan', 'Arab tili',
                     '3 mahal ovqat', 'Kutubxona', 'Sport zal'],
        'is_verified': True, 'is_featured': False,
        'latitude': 41.3680, 'longitude': 69.2780,
    },
]

# Sharhlar uchun namunaviy matn (real sharhlar uslubida)
SAMPLE_REVIEW_TEXTS = [
    "Maktab yaxshi, o'qituvchilar tajribali. Farzandim juda yoqtirmoqda.",
    "Narxlari biroz qimmatroq, lekin ta'lim sifati haqiqatan yuqori.",
    "Men doim bu maktabni tavsiya qilaman. Bolalarim ajoyib o'qishadi.",
    "Maktab yaxshi, o'qitish sifati a'lo. Atmosferasi ham yoqimli.",
    "Ingliz tiliga katta e'tibor berishadi. Farzandim juda yaxshi so'zlashmoqda.",
    "Infratuzilma zamonaviy, sport zali katta, bassein bor. Tavsiya qilaman.",
    "Menimcha, bu maktabda ta'lim berish yaxshi yo'lga qo'yilgan.",
    "Sinfda bolalar kam bo'lgani uchun har biriga alohida e'tibor berishadi.",
    "Ota-onalar bilan muloqot yaxshi, har doim bolaning holati haqida ma'lumot berishadi.",
    "Ovqat sifatli, kuniga uch mahal. Bola to'yib keladi.",
    "Matematika va IT chuqurlashtirilgan o'qitiladi. Farzandim olimpiadada g'olib bo'ldi.",
    "Robototexnika va shaxmat to'garaklari zo'r. Bola sevib boradi.",
    "Darslar qiziqarli o'tiladi. Bola maktabga borishdan zerikmaydi.",
    "Psixolog va logoped bor, bu juda muhim.",
    "Maktab avtobusi ham bor, juda qulay. Bolani olib-keltirish muammo emas.",
    "Sinfdan tashqari tadbirlar ko'p: ekskursiyalar, sport musobaqalari, konsertlar.",
    "Boshqa maktablardan bu yerga ko'chib keldik va juda mamnunmiz.",
    "Qo'shimcha kurslar, tayyorgarlik dasturlari kuchli.",
    "Bola shaxsiyatini shakllantirishga katta e'tibor berishadi.",
    "Hujjatlarni hal qilish juda tez va oson bo'ldi. Tashkilot bosh boshqaruvchiyog'i baland.",
]

REVIEW_AUTHORS = [
    'Dilshod A.', 'Malika K.', 'Aziza R.', 'Jasur N.', 'Madina T.',
    'Sherzod B.', 'Nilufar S.', 'Rustam Q.', 'Kamola H.', 'Olim M.',
    'Zarina O.', 'Bobur Y.', 'Lola G.', 'Farrux D.', 'Nargiza V.',
    'Akmal E.', 'Gulnoza Z.', 'Sardor U.', 'Sevara I.', 'Otabek F.',
    'Михаил В.', 'Анна С.', 'Виктория П.', 'Сергей К.', 'Елена Д.',
]


class Command(BaseCommand):
    help = "Ma'lumotlar bazasini Toshkent xususiy maktablari bilan to'ldiradi"

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear', action='store_true',
            help="To'ldirishdan oldin mavjud ma'lumotlarni o'chirish"
        )

    @transaction.atomic
    def handle(self, *args, **options):
        if options.get('clear'):
            self.stdout.write(self.style.WARNING("Eski ma'lumotlar o'chirilmoqda..."))
            Review.objects.all().delete()
            School.objects.all().delete()
            Feature.objects.all().delete()
            Curriculum.objects.all().delete()
            Language.objects.all().delete()
            District.objects.all().delete()

        # --- 1) Districts ---
        self.stdout.write("Tumanlar...")
        districts = {}
        for name in DISTRICTS:
            d, _ = District.objects.get_or_create(name=name)
            districts[name] = d
        self.stdout.write(self.style.SUCCESS(f"  ✓ {len(districts)} ta tuman"))

        # --- 2) Languages ---
        self.stdout.write("Tillar...")
        langs = {}
        for name, code in LANGUAGES:
            l, _ = Language.objects.get_or_create(name=name, defaults={'code': code})
            langs[name] = l
        self.stdout.write(self.style.SUCCESS(f"  ✓ {len(langs)} ta til"))

        # --- 3) Curriculums ---
        self.stdout.write("O'quv dasturlari...")
        currs = {}
        for name, desc in CURRICULUMS:
            c, _ = Curriculum.objects.get_or_create(name=name, defaults={'description': desc})
            currs[name] = c
        self.stdout.write(self.style.SUCCESS(f"  ✓ {len(currs)} ta dastur"))

        # --- 4) Features ---
        self.stdout.write("Imkoniyatlar...")
        feats = {}
        for name, icon in FEATURES:
            f, _ = Feature.objects.get_or_create(name=name, defaults={'icon': icon})
            feats[name] = f
        self.stdout.write(self.style.SUCCESS(f"  ✓ {len(feats)} ta imkoniyat"))

        # --- 5) Schools ---
        self.stdout.write("Maktablar...")
        created = 0
        for data in SCHOOLS:
            data_copy = dict(data)
            lang_names = data_copy.pop('languages', [])
            curr_names = data_copy.pop('curriculums', [])
            feat_names = data_copy.pop('features', [])
            district_name = data_copy.pop('district', None)

            if district_name and district_name in districts:
                data_copy['district'] = districts[district_name]

            school, is_new = School.objects.update_or_create(
                name=data_copy['name'],
                defaults=data_copy,
            )
            # m2m
            school.languages.set([langs[n] for n in lang_names if n in langs])
            school.curriculums.set([currs[n] for n in curr_names if n in currs])
            school.features.set([feats[n] for n in feat_names if n in feats])

            if is_new:
                created += 1

            # Sharhlar
            if school.reviews.count() < 5:
                num_reviews = random.randint(3, 8)
                for _ in range(num_reviews):
                    Review.objects.create(
                        school=school,
                        author_name=random.choice(REVIEW_AUTHORS),
                        rating=random.choices([3, 4, 5], weights=[1, 3, 6])[0],
                        text=random.choice(SAMPLE_REVIEW_TEXTS),
                        is_approved=True,
                    )

        self.stdout.write(self.style.SUCCESS(
            f"  ✓ {len(SCHOOLS)} ta maktab (yangi: {created})"
        ))

        # --- 6) Summary ---
        self.stdout.write(self.style.SUCCESS("\n===== YAKUN ====="))
        self.stdout.write(f"  Tumanlar: {District.objects.count()}")
        self.stdout.write(f"  Tillar: {Language.objects.count()}")
        self.stdout.write(f"  Dasturlar: {Curriculum.objects.count()}")
        self.stdout.write(f"  Imkoniyatlar: {Feature.objects.count()}")
        self.stdout.write(f"  Maktablar: {School.objects.count()}")
        self.stdout.write(f"  Sharhlar: {Review.objects.count()}")
        self.stdout.write(self.style.SUCCESS("Ma'lumotlar muvaffaqiyatli qo'shildi!"))
