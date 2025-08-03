from rest_framework import serializers
from .models import TourPackage, Booking, ContactMessage


class TourPackageSerializer(serializers.ModelSerializer):
    """Sayohat paketlari uchun serializer"""
    price_uzs = serializers.ReadOnlyField()
    
    class Meta:
        model = TourPackage
        fields = [
            'id', 'title', 'description', 'image', 'location',
            'start_date', 'end_date', 'price', 'price_uzs',
            'duration', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class TourPackageDetailSerializer(serializers.ModelSerializer):
    """Sayohat paketi tafsilotlari uchun serializer"""
    price_uzs = serializers.ReadOnlyField()
    
    class Meta:
        model = TourPackage
        fields = [
            'id', 'title', 'description', 'image', 'location',
            'start_date', 'end_date', 'price', 'price_uzs',
            'duration', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class BookingSerializer(serializers.ModelSerializer):
    """Buyurtma uchun serializer"""
    tour_title = serializers.CharField(source='tour.title', read_only=True)
    tour_price = serializers.DecimalField(source='tour.price', max_digits=12, decimal_places=2, read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'tour', 'tour_title', 'tour_price', 'name', 'phone', 'email',
            'payment_method', 'is_paid', 'created_at', 'updated_at'
        ]
        read_only_fields = ['is_paid', 'created_at', 'updated_at']

    def validate(self, data):
        """Validatsiya"""
        # Telefon raqam validatsiyasi
        phone = data.get('phone')
        if phone and not phone.startswith('+998'):
            raise serializers.ValidationError("Telefon raqam +998 bilan boshlanishi kerak")
        
        # Email validatsiyasi
        email = data.get('email')
        if email and '@' not in email:
            raise serializers.ValidationError("Noto'g'ri email format")
        
        return data


class ContactMessageSerializer(serializers.ModelSerializer):
    """Kontakt xabar uchun serializer"""
    
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'message', 'sent_at', 'is_read']
        read_only_fields = ['sent_at', 'is_read']

    def validate(self, data):
        """Validatsiya"""
        # Telefon raqam validatsiyasi
        phone = data.get('phone')
        if phone and not phone.startswith('+998'):
            raise serializers.ValidationError("Telefon raqam +998 bilan boshlanishi kerak")
        
        # Email validatsiyasi
        email = data.get('email')
        if email and '@' not in email:
            raise serializers.ValidationError("Noto'g'ri email format")
        
        return data


class PaymentVerificationSerializer(serializers.Serializer):
    """To'lov tasdiqlash uchun serializer"""
    booking_id = serializers.IntegerField()
    payment_method = serializers.ChoiceField(choices=Booking.PAYMENT_METHODS)
    transaction_id = serializers.CharField(max_length=255)
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    status = serializers.CharField(max_length=50) 