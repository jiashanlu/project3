from django.db import models

# Create your models here.
class Topping (models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"

class Sub (models.Model):
    name = models.CharField(max_length=64)
    subofsub = models.CharField(max_length=64, blank=True)
    size = models.CharField(max_length=5)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        if self.subofsub == "":
            return f"{self.name}, {self.size}, {self.price}"
        return f"{self.subofsub} addded to {self.name}, {self.price}"

class Pizza(models.Model):
    kind = models.CharField(max_length=64)
    type = models.CharField(max_length=64)
    size = models.CharField(max_length=5)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    toppings = models.ManyToManyField(Topping, blank=True, related_name="toppings")
    subs = models.ManyToManyField(Sub, blank=True, related_name="sub")

    def __str__(self):
        return f"{self.type}, {self.kind}, {self.size} with {self.toppings} and {self.subs} at {self.price}"

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
