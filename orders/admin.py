from django.contrib import admin
from .models import *

# Register your models here.
class PizzaInline(admin.StackedInline):
    model = Order.pizza.through
    filter_horizontal = ("topping",)
    extra = 1

class PastaInline(admin.StackedInline):
    model = Order.pasta.through
    extra = 1

class SubInline(admin.StackedInline):
    model = Order.sub.through
    extra = 1

class SaladInline(admin.StackedInline):
    model = Order.salad.through
    extra = 1

class DinnerInline(admin.StackedInline):
    model = Order.dinner.through
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    inlines = [PizzaInline, PastaInline, SubInline, SaladInline, DinnerInline]





admin.site.register(Pizza)
admin.site.register(Sub)
admin.site.register(Topping)
admin.site.register(Pasta)
admin.site.register(Salad)
admin.site.register(DinnerPlatter)
admin.site.register(Order, OrderAdmin)
