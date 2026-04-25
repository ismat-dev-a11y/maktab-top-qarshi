import django_filters
from .models import School


class SchoolFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='monthly_price_uzs', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='monthly_price_uzs', lookup_expr='lte')
    min_rating = django_filters.NumberFilter(field_name='rating', lookup_expr='gte')
    district = django_filters.CharFilter(field_name='district__slug', lookup_expr='exact')
    language = django_filters.CharFilter(field_name='languages__name', lookup_expr='iexact')
    grade = django_filters.NumberFilter(method='filter_by_grade')

    class Meta:
        model = School
        fields = ['school_type', 'district', 'is_featured', 'is_verified']

    def filter_by_grade(self, queryset, name, value):
        return queryset.filter(min_grade__lte=value, max_grade__gte=value)
