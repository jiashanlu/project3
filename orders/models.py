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

    def __str__(self):
        return f"'type':{self.type}, 'kind':{self.kind}, 'size':{self.size},'price': {self.price}"

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
    pizza = models.ManyToManyField(Pizza, blank=True, through="OrderPizza", related_name="pizza")
    sub = models.ManyToManyField(Sub, blank=True, through="OrderSub", related_name="sub")
    pasta = models.ManyToManyField(Pasta, blank=True, through="OrderPasta", related_name="pasta")
    salad = models.ManyToManyField(Salad, blank=True, through="OrderSalad", related_name="salad")
    dinner = models.ManyToManyField(DinnerPlatter, blank=True, through="OrderDinner", related_name="diner")
    total = models.DecimalField(max_digits=5, blank=True, null=True, decimal_places=2)

    def __str__(self):
        return f"{self.customer}, {self.id}"

class OrderPizza (models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    pizza = models.ForeignKey(Pizza, blank=True, null=True, on_delete=models.CASCADE)
    topping = models.ManyToManyField(Topping, blank=True, related_name="topping")

    def __str__(self):
        return f"{self.pizza}"

class OrderPasta (models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    pasta = models.ForeignKey(Pasta, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pasta}"

class OrderSub (models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    sub = models.ForeignKey(Sub, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.sub}"

class OrderSalad (models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    salad = models.ForeignKey(Salad, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.salad}"

class OrderDinner (models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    dinner = models.ForeignKey(DinnerPlatter, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.dinner}"
