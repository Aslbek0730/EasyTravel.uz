from django.contrib import admin
from .models import TourPackage, Booking, ContactMessage


@admin.register(TourPackage)
class TourPackageAdmin(admin.ModelAdmin):
    """Sayohat paketlari admin paneli"""
    list_display = ['title', 'location', 'price', 'duration', 'start_date', 'is_active', 'created_at']
    list_filter = ['is_active', 'location', 'duration', 'created_at']
    search_fields = ['title', 'description', 'location']
    list_editable = ['is_active', 'price']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'description', 'image', 'location')
        }),
        ('Sana va narx', {
            'fields': ('start_date', 'end_date', 'price', 'duration')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Vaqt', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    """Buyurtmalar admin paneli"""
    list_display = ['name', 'tour', 'payment_method', 'is_paid', 'created_at']
    list_filter = ['is_paid', 'payment_method', 'created_at', 'tour']
    search_fields = ['name', 'email', 'phone', 'tour__title']
    list_editable = ['is_paid']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Foydalanuvchi ma\'lumotlari', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Sayohat paketi', {
            'fields': ('tour',)
        }),
        ('To\'lov', {
            'fields': ('payment_method', 'is_paid')
        }),
        ('Vaqt', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Kontakt xabarlar admin paneli"""
    list_display = ['name', 'email', 'phone', 'is_read', 'sent_at']
    list_filter = ['is_read', 'sent_at']
    search_fields = ['name', 'email', 'phone', 'message']
    list_editable = ['is_read']
    readonly_fields = ['sent_at']
    
    fieldsets = (
        ('Foydalanuvchi ma\'lumotlari', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Xabar', {
            'fields': ('message',)
        }),
        ('Status', {
            'fields': ('is_read',)
        }),
        ('Vaqt', {
            'fields': ('sent_at',),
            'classes': ('collapse',)
        }),
    )

    actions = ['mark_as_read']

    def mark_as_read(self, request, queryset):
        """Tanlangan xabarlarni o'qilgan deb belgilash"""
        updated = queryset.update(is_read=True)
        self.message_user(request, f'{updated} ta xabar o\'qilgan deb belgilandi.')
    mark_as_read.short_description = "Tanlangan xabarlarni o'qilgan deb belgilash"
