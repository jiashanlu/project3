from django.http import HttpResponse, HttpResponseRedirect
from django.http.request import HttpRequest, QueryDict
from django.shortcuts import render, render_to_response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from .models import Pizza, Order, Topping, Sub
import json

# Create your views here.
def index(request):
    context = {
    "user": request.user
    }
    return render(request, "orders/index.html", context)

def checkout(request):
    context = {
    "user": request.user
    }
    return render(request, "orders/checkout.html", context)

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]
        email = request.POST["email"]
        user = User.objects.create_user(username, email, password)
        user.last_name = last_name
        user.first_name = first_name
        user.save()
    return render(request, "orders/register.html")

def login_user(request):
    if request.method == "POST":
        username = request.POST["logusername"]
        password = request.POST["logpassword"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "orders/login.html", {"message": "Invalid credentials."})
    return render(request, "orders/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def order_view(request):
    if request.method == "POST":
        global data
        data = json.loads(request.body)
    context = {
    "user": request.user,
    "test": data
    }
    return render(request, "orders/order.html", context)


def pizzas(request):
    pizza = Pizza.objects.all()
    topping =Topping.objects.all()
    context = {
    "user": request.user,
    "pizza" : pizza,
    "topping" : topping,
    }
    return render(request, "orders/pizzas.html", context)

def subs(request):
    subs = Sub.objects.all()
    context = {
    "user": request.user,
    "subs": subs,
    }
    return render(request, "orders/subs.html", context)
