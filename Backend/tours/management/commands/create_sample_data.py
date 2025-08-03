from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta
from tours.models import TourPackage, Booking, ContactMessage


class Command(BaseCommand):
    help = 'Test ma\'lumotlarini yaratish'

    def handle(self, *args, **options):
        self.stdout.write('Test ma\'lumotlari yaratilmoqda...')

        # Sayohat paketlarini yaratish
        tours_data = [
            {
                'title': 'Parij sayohati',
                'description': 'Parijning chiroyli ko\'rinishlari va madaniy merosini kashf eting. Eiffel minorasi, Luvr muzeyi va Notre-Dame katedralini ko\'ring.',
                'location': 'Parij, Fransiya',
                'start_date': date.today() + timedelta(days=30),
                'end_date': date.today() + timedelta(days=37),
                'price': 5000000,
                'duration': 7,
            },
            {
                'title': 'Tokio sayohati',
                'description': 'Yaponiyaning poytaxti Tokioda zamonaviy texnologiya va an\'anaviy madaniyatni birlashtiring.',
                'location': 'Tokio, Yaponiya',
                'start_date': date.today() + timedelta(days=45),
                'end_date': date.today() + timedelta(days=52),
                'price': 8000000,
                'duration': 7,
            },
            {
                'title': 'Dubai sayohati',
                'description': 'Dubai shahrida hashamatli mehmonxonalar, Burj Khalifa va cho\'llar safari tajribasini boshqang.',
                'location': 'Dubai, Birlashgan Arab Amirliklari',
                'start_date': date.today() + timedelta(days=60),
                'end_date': date.today() + timedelta(days=67),
                'price': 6000000,
                'duration': 7,
            },
            {
                'title': 'Istanbul sayohati',
                'description': 'Turkiyaning eng katta shahri Istanbulda tarix va madaniyatni kashf eting.',
                'location': 'Istanbul, Turkiya',
                'start_date': date.today() + timedelta(days=15),
                'end_date': date.today() + timedelta(days=22),
                'price': 3500000,
                'duration': 7,
            },
            {
                'title': 'Bali sayohati',
                'description': 'Indoneziyaning Bali orolida tropik tabiat va madaniyatni kashf eting.',
                'location': 'Bali, Indoneziya',
                'start_date': date.today() + timedelta(days=90),
                'end_date': date.today() + timedelta(days=97),
                'price': 7000000,
                'duration': 7,
            },
        ]

        for tour_data in tours_data:
            tour, created = TourPackage.objects.get_or_create(
                title=tour_data['title'],
                defaults=tour_data
            )
            if created:
                self.stdout.write(f'Sayohat paketi yaratildi: {tour.title}')

        # Test buyurtmalarini yaratish
        if TourPackage.objects.exists():
            tour = TourPackage.objects.first()
            booking_data = [
                {
                    'tour': tour,
                    'name': 'Aziz Karimov',
                    'phone': '+998901234567',
                    'email': 'aziz@example.com',
                    'payment_method': 'payme',
                    'is_paid': True,
                },
                {
                    'tour': tour,
                    'name': 'Malika Yusupova',
                    'phone': '+998901234568',
                    'email': 'malika@example.com',
                    'payment_method': 'click',
                    'is_paid': False,
                },
            ]

            for booking_data_item in booking_data:
                booking, created = Booking.objects.get_or_create(
                    name=booking_data_item['name'],
                    tour=booking_data_item['tour'],
                    defaults=booking_data_item
                )
                if created:
                    self.stdout.write(f'Buyurtma yaratildi: {booking.name}')

        # Test kontakt xabarlarini yaratish
        contact_data = [
            {
                'name': 'Dilshod Rahimov',
                'email': 'dilshod@example.com',
                'phone': '+998901234569',
                'message': 'Parij sayohati haqida ma\'lumot kerak.',
                'is_read': False,
            },
            {
                'name': 'Gulnora Karimova',
                'email': 'gulnora@example.com',
                'phone': '+998901234570',
                'message': 'Tokio sayohati narxi qanday?',
                'is_read': True,
            },
        ]

        for contact_item in contact_data:
            contact, created = ContactMessage.objects.get_or_create(
                name=contact_item['name'],
                email=contact_item['email'],
                defaults=contact_item
            )
            if created:
                self.stdout.write(f'Kontakt xabar yaratildi: {contact.name}')

        self.stdout.write(
            self.style.SUCCESS('Test ma\'lumotlari muvaffaqiyatli yaratildi!')
        ) 