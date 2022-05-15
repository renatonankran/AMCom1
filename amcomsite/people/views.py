from rest_framework import viewsets
from people.serializers import BuyerSerializer, SalesmanSerializer
from .models import Buyer, Salesman

# Create your views here.


class SalesmanViewSet(viewsets.ModelViewSet):
    queryset = Salesman.objects.all()
    serializer_class = SalesmanSerializer


class BuyerViewSet(viewsets.ModelViewSet):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer
