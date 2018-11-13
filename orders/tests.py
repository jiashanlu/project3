from django.test import TestCase, Client

from .models import *
from django.contrib.auth.models import User

# Create your tests here.
class ModelsTestCase(TestCase):

    def setUp(self):

        #Create pizza
        p1 = Pizza.objects.create(kind="Sicilian", type="Special", size="Large", price=20.3)
        p2 = Pizza.objects.create(kind="Normal", type="Special", size="Small", price=17.35)

        #Create topping
        t1= Topping.objects.create(name="Zucchini")
        t2= Topping.objects.create(name="Pepper")
        t3= Topping.objects.create(name="Mustard")

        #Create and Define user
        user = User.objects.create_user("benja", "benjaminbois@gmail.com", "020385")

        #create orders
        o1= Order.objects.create(customer=user)
        P = OrderPizza.objects.create(pizza=p1)
        P.topping.set([t1,t2])
        o1.orderpizza_set.add(P)

    def test_order_count(self):
        user = User.objects.get(username="benja")
        o = Order.objects.filter(customer=user)
        self.assertEqual(o.count(), 1)

    def test_pizza_count(self):
        user = User.objects.get(username="benja")
        o = Order.objects.filter(customer=user)
        self.assertEqual(o[0].pizza.count(), 1)

    def test_topp_count(self):
        user = User.objects.get(username="benja")
        o = Order.objects.filter(customer=user)
        self.assertEqual(o[0].orderpizza_set.all()[0].topping.count(), 2)

    def test_index(self):
        c=Client()
        response = c.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["user"].username, "")

    def test_pizza(self):
        c=Client()
        response = c.get("/pizzas")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["pizza"].count(), 2)
        self.assertEqual(response.context["topping"].count(), 3)
