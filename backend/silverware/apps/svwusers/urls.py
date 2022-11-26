'''
Urls: django app
'''
from django.urls import path
from apps.svwusers import views

urlpatterns = [
    path('users/register/<str:firebase_user_id>', views.new_user)
]
