from datetime import datetime
from urllib import response
import pytz
from rest_framework.test import APITestCase
from django.urls import reverse
from unittest.mock import patch
from people.models import Buyer, Salesman
from products.models import Sale, ProductList, Product

from products.views import ProductViewSet, salesman_comission

# Create your tests here.


class CommissionTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        buyer1 = Buyer(name="Pessoa 1")
        buyer1.save()
        buyer2 = Buyer(name="Pessoa 2")
        buyer2.save()
        salesm1 = Salesman(name="Pessoa 1")
        salesm1.save()
        salesm2 = Salesman(name="Pessoa 2")
        salesm2.save()

        dt = pytz.utc.localize(datetime(2022, 1, 1, 11, 0, 0, 0))
        sale1 = Sale(buyer=buyer1, salesman=salesm1, dt=dt)
        sale1.save()
        dt = pytz.utc.localize(datetime(2022, 1, 1, 13, 0, 0, 0))
        sale2 = Sale(buyer=buyer1, salesman=salesm1, dt=dt)
        sale2.save()

        prod1 = Product(product_name="Prod 1", commission=3, price=200)
        prod2 = Product(product_name="Prod 2", commission=6, price=200)
        prod1.save()
        prod2.save()

        pl1 = ProductList(product=prod1, qtd=2, sale_id=sale1.id)
        pl2 = ProductList(product=prod2, qtd=2, sale_id=sale1.id)
        pl1.save()
        pl2.save()
        pl3 = ProductList(product=prod1, qtd=2, sale_id=sale2.id)
        pl4 = ProductList(product=prod2, qtd=2, sale_id=sale2.id)
        pl3.save()
        pl4.save()

    def test_product_list(self):

        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(len(response.data), 2)

    def test_product_create(self):

        url = reverse('product-list')
        response = self.client.post(
            url, data={"product_name": "Prod 3", "commission": 3, "price": 200})
        self.assertEqual(response.data, {
                         'id': 3, 'product_name': 'Prod 3', 'commission': 3.0, 'price': 200.0})

    def test_calculate_correnct_value(self):
        begin = pytz.utc.localize(datetime(2022, 1, 1, 11, 0, 0, 0))
        begin = begin.strftime("%Y-%m-%dT%H:%M")
        end = pytz.utc.localize(datetime(2022, 1, 1, 16, 0, 0, 0))
        end = end.strftime("%Y-%m-%dT%H:%M")
        url = reverse(salesman_comission)
        response = self.client.post(
            url, {"salesman": 1, "begin": begin, "end": end})

        self.assertEqual(response.data, {"commission": 72})
