from django.db import models

# Create your models here.

class TourPackage(models.Model):
    """Sayohat paketlari modeli"""
    title = models.CharField(max_length=255, verbose_name="Paket nomi")
    description = models.TextField(verbose_name="Tavsif")
    image = models.ImageField(upload_to='tour_images/', verbose_name="Rasm")
    location = models.CharField(max_length=100, verbose_name="Manzil")
    start_date = models.DateField(verbose_name="Boshlanish sanasi")
    end_date = models.DateField(verbose_name="Tugash sanasi")
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Narxi")
    duration = models.IntegerField(help_text="kunlar", verbose_name="Davomiyligi")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan sana")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan sana")

    class Meta:
        verbose_name = "Sayohat paketi"
        verbose_name_plural = "Sayohat paketlari"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def price_uzs(self):
        """Narxni UZS formatida qaytaradi"""
        return f"{self.price:,.0f} UZS"


class Booking(models.Model):
    """Foydalanuvchi buyurtmasi modeli"""
    PAYMENT_METHODS = [
        ('payme', 'Payme'),
        ('click', 'Click'),
        ('uzum', 'Uzum Bank'),
    ]
    
    tour = models.ForeignKey(TourPackage, on_delete=models.CASCADE, verbose_name="Sayohat paketi")
    name = models.CharField(max_length=100, verbose_name="Ism")
    phone = models.CharField(max_length=20, verbose_name="Telefon raqam")
    email = models.EmailField(verbose_name="Email")
    payment_method = models.CharField(
        max_length=50, 
        choices=PAYMENT_METHODS,
        verbose_name="To'lov usuli"
    )
    is_paid = models.BooleanField(default=False, verbose_name="To'langan")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan sana")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan sana")

    class Meta:
        verbose_name = "Buyurtma"
        verbose_name_plural = "Buyurtmalar"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.tour.title}"


class ContactMessage(models.Model):
    """Bog'lanish formasi modeli"""
    name = models.CharField(max_length=100, verbose_name="Ism")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Telefon raqam")
    message = models.TextField(verbose_name="Xabar")
    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="Yuborilgan sana")
    is_read = models.BooleanField(default=False, verbose_name="O'qilgan")

    class Meta:
        verbose_name = "Kontakt xabar"
        verbose_name_plural = "Kontakt xabarlar"
        ordering = ['-sent_at']

    def __str__(self):
        return f"{self.name} - {self.email}"
