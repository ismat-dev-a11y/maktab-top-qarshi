from django.contrib import admin
from .models import (
    District, Language, Feature, Curriculum,
    School, SchoolImage, Review,
)


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    search_fields = ('name',)


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon')
    search_fields = ('name',)


@admin.register(Curriculum)
class CurriculumAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class SchoolImageInline(admin.TabularInline):
    model = SchoolImage
    extra = 1


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    fields = ('author_name', 'rating', 'text', 'is_approved')


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'district', 'school_type',
        'rating', 'monthly_price_uzs', 'is_featured', 'is_active',
    )
    list_filter = ('school_type', 'district', 'is_featured', 'is_active')
    search_fields = ('name', 'address', 'description')
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ('languages', 'curriculums', 'features')
    inlines = [SchoolImageInline, ReviewInline]
    fieldsets = (
        ("Asosiy ma'lumot", {
            'fields': (
                'name', 'slug', 'school_type',
                'short_description', 'description',
                'logo', 'cover_image',
            )
        }),
        ('Aloqa', {
            'fields': ('phone', 'phone2', 'email', 'website'),
        }),
        ('Manzil', {
            'fields': ('district', 'address', 'latitude', 'longitude'),
        }),
        ('Narx', {
            'fields': ('monthly_price_uzs', 'entry_fee_uzs'),
        }),
        ("O'quv ma'lumotlari", {
            'fields': (
                'min_grade', 'max_grade',
                'start_time', 'end_time',
                'meals_per_day', 'max_students_per_class',
                'languages', 'curriculums', 'features',
            )
        }),
        ('Reyting', {
            'fields': ('rating', 'reviews_count'),
        }),
        ('Meta', {
            'fields': ('founded_year', 'is_verified', 'is_featured', 'is_active'),
        }),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'school', 'rating', 'is_approved', 'created_at')
    list_filter = ('rating', 'is_approved', 'created_at')
    search_fields = ('author_name', 'text', 'school__name')
