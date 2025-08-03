from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TourPackageViewSet, BookingViewSet, ContactMessageViewSet

# Router yaratish
router = DefaultRouter()
router.register(r'tours', TourPackageViewSet, basename='tour')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'contact', ContactMessageViewSet, basename='contact')

app_name = 'tours'

urlpatterns = [
    # API endpoints
    path('api/', include(router.urls)),
    
    # Qo'shimcha endpoints
    path('api/tours/featured/', TourPackageViewSet.as_view({'get': 'featured'}), name='featured-tours'),
    path('api/tours/search/', TourPackageViewSet.as_view({'get': 'search'}), name='search-tours'),
    path('api/bookings/<int:pk>/verify-payment/', BookingViewSet.as_view({'post': 'verify_payment'}), name='verify-payment'),
    path('api/contact/<int:pk>/mark-read/', ContactMessageViewSet.as_view({'post': 'mark_as_read'}), name='mark-read'),
] 