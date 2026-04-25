from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator


class District(models.Model):
    """Toshkent tumanlari"""
    name = models.CharField('Nomi', max_length=100, unique=True)
    slug = models.SlugField('Slug', max_length=120, unique=True, blank=True)

    class Meta:
        verbose_name = 'Tuman'
        verbose_name_plural = 'Tumanlar'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)


class Language(models.Model):
    """Ta'lim tili"""
    name = models.CharField("Til", max_length=50, unique=True)
    code = models.CharField('Kod', max_length=10, blank=True)

    class Meta:
        verbose_name = 'Til'
        verbose_name_plural = 'Tillar'
        ordering = ['name']

    def __str__(self):
        return self.name


class Feature(models.Model):
    """Maktab imkoniyatlari (suzish, robototexnika, sport va b.)"""
    name = models.CharField("Nomi", max_length=100, unique=True)
    icon = models.CharField("Icon (emoji yoki SVG nomi)", max_length=50, blank=True)

    class Meta:
        verbose_name = 'Imkoniyat'
        verbose_name_plural = 'Imkoniyatlar'
        ordering = ['name']

    def __str__(self):
        return self.name


class Curriculum(models.Model):
    """O'quv dasturi (British, Cambridge, IB, O'zbek va b.)"""
    name = models.CharField("Dastur", max_length=100, unique=True)
    description = models.TextField('Tavsif', blank=True)

    class Meta:
        verbose_name = "O'quv dasturi"
        verbose_name_plural = "O'quv dasturlari"
        ordering = ['name']

    def __str__(self):
        return self.name


class School(models.Model):
    """Xususiy maktab"""

    TYPE_CHOICES = [
        ('private', 'Xususiy'),
        ('international', 'Xalqaro'),
        ('bilingual', 'Bilingual'),
        ('specialized', 'Ixtisoslashgan'),
    ]

    # Asosiy ma'lumotlar
    name = models.CharField('Maktab nomi', max_length=200)
    slug = models.SlugField('Slug', max_length=220, unique=True, blank=True)
    short_description = models.CharField('Qisqa tavsif', max_length=300, blank=True)
    description = models.TextField('To\'liq tavsif', blank=True)
    


    # Turi
    school_type = models.CharField(
        'Maktab turi', max_length=20,
        choices=TYPE_CHOICES, default='private'
    )

    # Aloqa ma'lumotlari
    phone = models.CharField('Telefon', max_length=30, blank=True)
    phone2 = models.CharField('Qo\'shimcha telefon', max_length=30, blank=True)
    email = models.EmailField('Email', blank=True)
    website = models.URLField('Veb-sayt', blank=True)
    telegram = models.CharField('Telegram', max_length=100, blank=True)
    instagram = models.CharField('Instagram', max_length=100, blank=True)
    # Manzil
    district = models.ForeignKey(
        District, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='schools',
        verbose_name='Tuman'
    )
    address = models.CharField('Manzil', max_length=300, blank=True)
    latitude = models.DecimalField(
        'Kenglik', max_digits=9, decimal_places=6,
        null=True, blank=True
    )
    longitude = models.DecimalField(
        'Uzunlik', max_digits=9, decimal_places=6,
        null=True, blank=True
    )

    # Narx
    monthly_price_uzs = models.BigIntegerField(
        'Oylik narx (so\'m)', null=True, blank=True,
        help_text="Oylik ta'lim to'lovi"
    )
    entry_fee_uzs = models.BigIntegerField(
        'Kirish to\'lovi (so\'m)', null=True, blank=True
    )

    # O'quv ma'lumotlari
    min_grade = models.PositiveSmallIntegerField(
        'Boshlang\'ich sinf', default=1,
        help_text='1-sinf, 0 esa maktabgacha'
    )
    max_grade = models.PositiveSmallIntegerField(
        'Yuqori sinf', default=11
    )
    start_time = models.TimeField("Dars boshlanish vaqti", null=True, blank=True)
    end_time = models.TimeField("Dars tugash vaqti", null=True, blank=True)
    meals_per_day = models.PositiveSmallIntegerField(
        "Kunlik ovqatlanish", default=0
    )
    max_students_per_class = models.PositiveSmallIntegerField(
        "Sinfdagi maksimal o'quvchilar", null=True, blank=True
    )

    # O'quv dasturlari va tillar
    languages = models.ManyToManyField(
        Language, related_name='schools', blank=True,
        verbose_name="Ta'lim tillari"
    )
    curriculums = models.ManyToManyField(
        Curriculum, related_name='schools', blank=True,
        verbose_name="O'quv dasturlari"
    )
    features = models.ManyToManyField(
        Feature, related_name='schools', blank=True,
        verbose_name='Imkoniyatlar'
    )

    # Reytinglar
    rating = models.DecimalField(
        "O'rtacha reyting", max_digits=3, decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    reviews_count = models.PositiveIntegerField('Sharhlar soni', default=0)

    # Rasm
    logo = models.ImageField('Logo', upload_to='schools/logos/', blank=True, null=True)
    cover_image = models.ImageField(
        'Asosiy rasm', upload_to='schools/covers/', blank=True, null=True
    )

    # Metama'lumot
    founded_year = models.PositiveIntegerField("Tashkil topgan yili", null=True, blank=True)
    is_verified = models.BooleanField("Tasdiqlangan", default=False)
    is_featured = models.BooleanField("Tavsiya etilgan", default=False)
    is_active = models.BooleanField('Faol', default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Maktab'
        verbose_name_plural = 'Maktablar'
        ordering = ['-is_featured', '-rating', 'name']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['district']),
            models.Index(fields=['-rating']),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name, allow_unicode=False) or f'maktab-{self.pk or ""}'
            slug = base
            i = 1
            while School.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base}-{i}'
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)


class SchoolImage(models.Model):
    """Maktab galereyasi"""
    school = models.ForeignKey(
        School, on_delete=models.CASCADE,
        related_name='images', verbose_name='Maktab'
    )
    image = models.ImageField('Rasm', upload_to='schools/gallery/')
    caption = models.CharField("Izoh", max_length=200, blank=True)
    order = models.PositiveIntegerField("Tartib", default=0)

    class Meta:
        verbose_name = 'Rasm'
        verbose_name_plural = 'Rasmlar'
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.school.name} - rasm {self.id}"


class Review(models.Model):
    """Foydalanuvchi sharhlari"""
    school = models.ForeignKey(
        School, on_delete=models.CASCADE,
        related_name='reviews', verbose_name='Maktab'
    )
    author_name = models.CharField('Muallif', max_length=100)
    rating = models.PositiveSmallIntegerField(
        'Reyting', default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    text = models.TextField('Sharh matni')
    is_approved = models.BooleanField('Tasdiqlangan', default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Sharh'
        verbose_name_plural = 'Sharhlar'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} - {self.school.name} ({self.rating}⭐)"
