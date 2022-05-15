from django.db import models

# Create your models here.


class Salesman(models.Model):
    name = models.CharField(max_length=255)


class Buyer(models.Model):
    name = models.CharField(max_length=255)
