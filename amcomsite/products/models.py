from datetime import datetime
from django.db import models

from people.models import Buyer, Salesman

# Create your models here.


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    commission = models.FloatField()
    price = models.FloatField()


class Sale(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.DO_NOTHING)
    salesman = models.ForeignKey(Salesman, on_delete=models.DO_NOTHING)
    dt = models.DateTimeField(default=datetime.now)


class ProductList(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    sale = models.ForeignKey(
        Sale, related_name='products', on_delete=models.DO_NOTHING)
    qtd = models.IntegerField()
