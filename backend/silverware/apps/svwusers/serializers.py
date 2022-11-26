'''
    Serializer: user app
'''
from django.contrib.auth.models import Group, Permission
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    '''
    Serializer: Generic User
    '''
    class Meta:
        model = User
        fields = ['svw_firebaseid']
        app_label = 'User'

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user

class UserResponseSerializer(serializers.ModelSerializer):
    '''
    Serializer: User for success response
    '''
    class Meta:
        model = User
        fields = ['svw_name', 'svw_email', 'svw_photoUrl', 'svw_firebaseid']
        app_label = 'User'
