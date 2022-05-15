from rest_framework import serializers
from .models import Product, ProductList, Sale


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductList
        fields = ['product', 'qtd']


class SaleSerializer(serializers.ModelSerializer):
    products = ProductListSerializer(many=True)

    class Meta:
        model = Sale
        fields = '__all__'
        read_only_fields = ('dt',)

    def create(self, validated_data):

        ModelClass = self.Meta.model

        products = validated_data.pop('products')

        try:
            instance = ModelClass.objects.create(**validated_data)
        except TypeError as exc:
            raise TypeError("Something wrong creating the Sale.")

        for item in products:
            ProductList.objects.create(sale_id=instance.id, **item)

        return instance
