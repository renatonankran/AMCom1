"""amcomsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from products.views import ProductViewSet, SaleCreate, salesman_comission
from people.views import BuyerViewSet, SalesmanViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'salesman', SalesmanViewSet)
router.register(r'buyer', BuyerViewSet)
router.register(r'sales', SaleCreate)

urlpatterns = [
    path('', include(router.urls)),
    path('commission/', salesman_comission, name='commision')
]
