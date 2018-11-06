from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Topping (models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"

class Sub (models.Model):
    name = models.CharField(max_length=64)
    subofsub = models.CharField(max_length=64, blank=True)
    size = models.CharField(max_length=5, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        if self.subofsub == "":
            return f"{self.name}, ${self.price}"
        return f"{self.subofsub} addded to {self.name}, {self.price}"

class Pizza(models.Model):
    kind = models.CharField(max_length=64)
    type = models.CharField(max_length=64)
    size = models.CharField(max_length=5)
    price = models.DecimalField(max_digits=5, decimal_places=2)

#    def __str__(self):
#        return {'type':{self.type}, 'kind':{self.kind}, 'size':{self.size},'price': {self.price}}"

class Pasta (models.Model):
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.name}, {self.price}"

class Salad (models.Model):
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.name}, {self.price}"

class DinnerPlatter (models.Model):
    name = models.CharField(max_length=64)
    size = models.CharField(max_length=5)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.name}, {self.size}, {self.price}"

class Order (models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="customer")
    pizza = models.ManyToManyField(Pizza, blank=True, related_name="pizza")
    topping = models.ManyToManyField(Topping, blank=True, related_name="topping")
    sub = models.ManyToManyField(Sub, blank=True, related_name="sub")
    pasta = models.ManyToManyField(Pasta, blank=True, related_name="pasta")
    salad = models.ManyToManyField(Salad, blank=True, related_name="salad")
    dinner = models.ManyToManyField(DinnerPlatter, blank=True, related_name="diner")
