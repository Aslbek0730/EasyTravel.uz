from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import TourPackage, Booking, ContactMessage
from .serializers import (
    TourPackageSerializer, 
    TourPackageDetailSerializer,
    BookingSerializer, 
    ContactMessageSerializer,
    PaymentVerificationSerializer
)


class TourPackageViewSet(viewsets.ReadOnlyModelViewSet):
    """Sayohat paketlari uchun ViewSet"""
    queryset = TourPackage.objects.filter(is_active=True)
    serializer_class = TourPackageSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['location', 'duration', 'price']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'duration', 'created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """Har bir action uchun serializer tanlash"""
        if self.action == 'retrieve':
            return TourPackageDetailSerializer
        return TourPackageSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Trend sayohatlar (bosh sahifa uchun)"""
        featured_tours = self.queryset[:4]  # Faqat 4ta
        serializer = self.get_serializer(featured_tours, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """Kengaytirilgan qidirish"""
        query = request.query_params.get('q', '')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        location = request.query_params.get('location')
        duration = request.query_params.get('duration')

        queryset = self.queryset

        # Qidirish
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(location__icontains=query)
            )

        # Narx filtri
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        # Manzil filtri
        if location:
            queryset = queryset.filter(location__icontains=location)

        # Davomiylik filtri
        if duration:
            queryset = queryset.filter(duration=duration)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class BookingViewSet(viewsets.ModelViewSet):
    """Buyurtmalar uchun ViewSet"""
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['payment_method', 'is_paid', 'tour']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def create(self, request, *args, **kwargs):
        """Buyurtma yaratish"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()
            
            # To'lov ma'lumotlarini qaytarish
            response_data = {
                'booking_id': booking.id,
                'tour_title': booking.tour.title,
                'amount': booking.tour.price,
                'payment_method': booking.payment_method,
                'message': 'Buyurtma muvaffaqiyatli yaratildi'
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def verify_payment(self, request, pk=None):
        """To'lovni tasdiqlash"""
        booking = self.get_object()
        serializer = PaymentVerificationSerializer(data=request.data)
        
        if serializer.is_valid():
            # Bu yerda to'lov tizimi bilan integratsiya bo'ladi
            # Hozircha oddiy tasdiqlash
            booking.is_paid = True
            booking.save()
            
            return Response({
                'message': 'To\'lov muvaffaqiyatli tasdiqlandi',
                'booking_id': booking.id,
                'status': 'paid'
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactMessageViewSet(viewsets.ModelViewSet):
    """Kontakt xabarlar uchun ViewSet"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['sent_at', 'is_read']
    ordering = ['-sent_at']

    def create(self, request, *args, **kwargs):
        """Kontakt xabar yaratish"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact_message = serializer.save()
            
            # Email yuborish (production uchun)
            # send_contact_email(contact_message)
            
            return Response({
                'message': 'Xabar muvaffaqiyatli yuborildi',
                'contact_id': contact_message.id
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """Xabarni o'qilgan deb belgilash"""
        contact_message = self.get_object()
        contact_message.is_read = True
        contact_message.save()
        
        return Response({
            'message': 'Xabar o\'qilgan deb belgilandi',
            'contact_id': contact_message.id
        })
