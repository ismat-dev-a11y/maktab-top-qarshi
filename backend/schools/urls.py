from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    DistrictViewSet, LanguageViewSet, FeatureViewSet,
    CurriculumViewSet, SchoolViewSet, stats_view,
)

router = DefaultRouter()
router.register('districts', DistrictViewSet, basename='district')
router.register('languages', LanguageViewSet, basename='language')
router.register('features', FeatureViewSet, basename='feature')
router.register('curriculums', CurriculumViewSet, basename='curriculum')
router.register('schools', SchoolViewSet, basename='school')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', stats_view, name='stats'),
]
