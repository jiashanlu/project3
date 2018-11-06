from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("login", views.login_user, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("pizzas", views.pizzas, name="pizzas"),
    path("order", views.order_view, name="order"),
    path("checkout", views.checkout, name="checkout"),
    path("subs", views.subs, name="subs"),
]
