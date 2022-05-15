from datetime import datetime, time
import pytz
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from products.serializers import ProductSerializer, SaleSerializer
from .models import Product, Sale

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    allowed_methods = ['POST', 'GET', 'DELETE']
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SaleCreate(generics.ListCreateAPIView,
                 viewsets.GenericViewSet):

    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


@api_view(['POST'])
def salesman_comission(request):

    begin = pytz.utc.localize(datetime.strptime(
        request.data["begin"], "%Y-%m-%dT%H:%M"))
    end = pytz.utc.localize(datetime.strptime(
        request.data["end"], "%Y-%m-%dT%H:%M"))
    salesman = request.data['salesman']

    sales = Sale.objects.filter(
        salesman=salesman, dt__gte=begin, dt__lte=end)

    product_lists = [item.products for item in sales.iterator(
    ) if item.dt.time() > time(0, 0, 0) and item.dt.time() < time(12, 0, 0)]
    products = [item.all() for item in product_lists]
    quantities = [prod.qtd for item in products for prod in item]
    prices = [
        prod.product.price for item in products for prod in item]
    product_comms = []
    for item in products:
        for prod in item:
            if prod.product.commission > 5:
                product_comms.append(5)
            else:
                product_comms.append(prod.product.commission)
    commission1 = [qtd*((comm/100)*price) for qtd, price,
                   comm in zip(quantities, prices, product_comms)]

    product_lists = [item.products for item in sales.iterator() if
                     item.dt.time() > time(12, 0, 1) and item.dt.time() < time(23, 59, 59)]
    products = [item.all() for item in product_lists]
    quantities = [prod.qtd for item in products for prod in item]
    prices = [
        prod.product.price for item in products for prod in item]
    product_comms = []
    for item in products:
        for prod in item:
            if prod.product.commission < 4:
                product_comms.append(4)
            else:
                product_comms.append(prod.product.commission)
    commission2 = [qtd*((comm/100)*price) for qtd, price,
                   comm in zip(quantities, prices, product_comms)]

    return Response({"commission": sum(commission1)+sum(commission2)})
