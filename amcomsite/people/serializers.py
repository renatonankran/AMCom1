from rest_framework import serializers
from .models import Buyer, Salesman


class SalesmanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salesman
        fields = '__all__'


class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = '__all__'
