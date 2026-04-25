from rest_framework import serializers
from .models import (
    District, Language, Feature, Curriculum,
    School, SchoolImage, Review,
)


class DistrictSerializer(serializers.ModelSerializer):
    schools_count = serializers.IntegerField(source='schools.count', read_only=True)

    class Meta:
        model = District
        fields = ('id', 'name', 'slug', 'schools_count')


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('id', 'name', 'code')


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ('id', 'name', 'icon')


class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = ('id', 'name', 'description')


class SchoolImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = SchoolImage
        fields = ('id', 'image', 'caption', 'order')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'author_name', 'rating', 'text', 'created_at')
        read_only_fields = ('id', 'created_at')


class SchoolListSerializer(serializers.ModelSerializer):
    """Ro'yxat uchun yengil serializer"""
    district = serializers.StringRelatedField()
    district_slug = serializers.CharField(source='district.slug', read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)
    top_features = serializers.SerializerMethodField()

    class Meta:
        model = School
        fields = (
            'id', 'name', 'slug', 'short_description', 'school_type',
            'district', 'district_slug', 'address',
            'monthly_price_uzs', 'min_grade', 'max_grade',
            'rating', 'reviews_count',
            'logo', 'cover_image',
            'languages', 'top_features',
            'is_verified', 'is_featured',
        )

    def get_top_features(self, obj):
        return [f.name for f in obj.features.all()[:5]]


class SchoolDetailSerializer(serializers.ModelSerializer):
    """Batafsil ma'lumot uchun serializer"""
    district = DistrictSerializer(read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)
    curriculums = CurriculumSerializer(many=True, read_only=True)
    features = FeatureSerializer(many=True, read_only=True)
    images = SchoolImageSerializer(many=True, read_only=True)
    reviews = serializers.SerializerMethodField()
    school_type_display = serializers.CharField(source='get_school_type_display', read_only=True)

    class Meta:
        model = School
        fields = (
            'id', 'name', 'slug',
            'short_description', 'description',
            'school_type', 'school_type_display',
            'phone', 'phone2', 'email', 'website',
            'district', 'address', 'latitude', 'longitude',
            'monthly_price_uzs', 'entry_fee_uzs',
            'min_grade', 'max_grade',
            'start_time', 'end_time',
            'meals_per_day', 'max_students_per_class',
            'languages', 'curriculums', 'features',
            'rating', 'reviews_count',
            'logo', 'cover_image',
            'images', 'reviews',
            'founded_year', 'is_verified', 'is_featured',
            'created_at', 'updated_at',
        )

    def get_reviews(self, obj):
        qs = obj.reviews.filter(is_approved=True)[:20]
        return ReviewSerializer(qs, many=True).data


class StatsSerializer(serializers.Serializer):
    """Bosh sahifa statistikasi"""
    total_schools = serializers.IntegerField()
    total_districts = serializers.IntegerField()
    total_reviews = serializers.IntegerField()
    avg_rating = serializers.FloatField()
