from django.http import HttpResponse, HttpResponseRedirect
from django.http.request import HttpRequest, QueryDict
from django.shortcuts import render, render_to_response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from .models import *
import json
import pdb

# Create your views here.
def index(request):
    context = {
    "user": request.user
    }
    return render(request, "orders/index.html", context)

def ordered(request):
    data = Order.objects.filter(customer=request.user)
    context = {
    "data": data,
    "user": request.user
    }
    return render(request, "orders/order.html", context)

def checkout(request):
    if request.method == "POST":
        #pdb.set_trace()
        data = json.loads(request.body)
        O = Order.objects.create(customer=request.user) #create object with user
        for piz in data['pizza']:
            pizza=Pizza.objects.get(id=piz['pizza']['ID'])
            topp=[]
            for top in piz['topping']:
                topp.append(Topping.objects.get(pk=top['ID']))
            P = OrderPizza.objects.create(pizza=pizza)
            P.topping.set(topp)
            O.orderpizza_set.add(P)
        for pas in data['pasta']:
            pasta= Pasta.objects.get(id=pas['ID'])
            P = OrderPasta.objects.create(pasta=pasta)
            O.orderpasta_set.add(P)
        for sal in data['salad']:
            salad= Salad.objects.get(id=sal['ID'])
            P = OrderSalad.objects.create(salad=salad)
            O.ordersalad_set.add(P)
        for din in data['dinner']:
            dinner= DinnerPlatter.objects.get(id=din['ID'])
            P = OrderDinner.objects.create(dinner=dinner)
            O.orderdinner_set.add(P)
        for su in data['sub']:
            sub= Sub.objects.get(id=su['ID'])
            P = OrderSub.objects.create(sub=sub)
            O.ordersub_set.add(P)
        O.total = data["total"]
        O.save()
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

def italian(request):
    pasta = Pasta.objects.all()
    salad = Salad.objects.all()
    context = {
    "user": request.user,
    "pasta": pasta,
    "salad": salad,
    }
    return render(request, "orders/italian.html", context)

def dinner(request):
    dinner = DinnerPlatter.objects.all()
    context = {
    "user": request.user,
    "dinner": dinner,
    }
    return render(request, "orders/dinner.html", context)
