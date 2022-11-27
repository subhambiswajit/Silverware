'''
Urls: django app
'''
from django.urls import path
from apps.svwusers import views

urlpatterns = [
    path('signin/', views.sign_in),
    path('users/register/<str:firebase_user_id>', views.new_user),
    path('users/user/<str:firebase_user_id>', views.get_user),
    path('users/user/update/<str:firebase_user_id>', views.update_user),
]
