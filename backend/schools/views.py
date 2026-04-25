from django.db.models import Avg, Count
from rest_framework import viewsets, status, filters as drf_filters
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    District, Language, Feature, Curriculum,
    School, Review,
)
from .serializers import (
    DistrictSerializer, LanguageSerializer, FeatureSerializer,
    CurriculumSerializer, SchoolListSerializer, SchoolDetailSerializer,
    ReviewSerializer, StatsSerializer,
)
from .filters import SchoolFilter


class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    pagination_class = None
    lookup_field = 'slug'


class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    pagination_class = None


class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    pagination_class = None


class CurriculumViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer
    pagination_class = None


class SchoolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = School.objects.filter(is_active=True)
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, drf_filters.SearchFilter, drf_filters.OrderingFilter]
    filterset_class = SchoolFilter
    search_fields = ['name', 'description', 'short_description', 'address']
    ordering_fields = ['rating', 'monthly_price_uzs', 'reviews_count', 'created_at', 'name']
    ordering = ['-is_featured', '-rating']

    def get_serializer_class(self):
        if self.action in ('retrieve',):
            return SchoolDetailSerializer
        return SchoolListSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        qs = self.get_queryset().filter(is_featured=True)[:8]
        return Response(SchoolListSerializer(qs, many=True, context={'request': request}).data)

    @action(detail=False, methods=['get'])
    def top(self, request):
        qs = self.get_queryset().order_by('-rating')[:10]
        return Response(SchoolListSerializer(qs, many=True, context={'request': request}).data)

    @action(detail=True, methods=['post'])
    def review(self, request, slug=None):
        """Maktabga sharh qoldirish"""
        school = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(school=school, is_approved=True)
            # Reytingni yangilash
            agg = school.reviews.filter(is_approved=True).aggregate(
                avg=Avg('rating'), cnt=Count('id')
            )
            school.rating = round(agg['avg'] or 0, 2)
            school.reviews_count = agg['cnt'] or 0
            school.save(update_fields=['rating', 'reviews_count'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def stats_view(request):
    """Bosh sahifa uchun umumiy statistika"""
    total_schools = School.objects.filter(is_active=True).count()
    total_districts = District.objects.count()
    total_reviews = Review.objects.filter(is_approved=True).count()
    avg_rating = School.objects.filter(is_active=True, rating__gt=0).aggregate(
        avg=Avg('rating')
    )['avg'] or 0
    data = {
        'total_schools': total_schools,
        'total_districts': total_districts,
        'total_reviews': total_reviews,
        'avg_rating': round(float(avg_rating), 2),
    }
    return Response(StatsSerializer(data).data)
