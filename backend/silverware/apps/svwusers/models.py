from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class User(AbstractBaseUser, PermissionsMixin):
    '''
    Model: User
    svw_firebaseid: maxlenth=100
    svw_name: maxlenth=100
    svw_email: max_length=100, unique=True
    svw_updatedOn: auto_now=True
    svw_userCreatedOn: auto_now_add=True
    svw_photoUrl: max_length=500, default: NA
    svw_isdeleted: default=False, True if user is deleted from silverware database
    is_active: default=True, True if user is blocked from silverware database
    '''
    REQUIRED_FIELDS = ['svw_firebaseid', 'svw_name']
    USERNAME_FIELD = 'svw_email'
    svw_firebaseid = models.CharField(max_length=100)
    svw_name = models.CharField(max_length=100)
    svw_email = models.CharField(max_length=100, unique=True)
    svw_updatedOn = models.DateTimeField(auto_now=True)
    svw_userCreatedOn = models.DateTimeField(auto_now_add=True)
    svw_photoUrl = models.CharField(max_length=500, default="NA")
    svw_bio = models.TextField(max_length=500, blank=True, null=True)
    svw_dob = models.DateTimeField(blank=True, null=True)
    svw_address = models.TextField(max_length=500, blank=True, null=True)
    svw_city =  models.CharField(max_length=20, blank=True, null=True)
    svw_province = models.CharField(max_length=2, blank=True, null=True)
    svw_postalcode = models.CharField(max_length=6, blank=True, null=True)
    svw_telephone = models.BigIntegerField(null=True, blank=True)
    svw_isdeleted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    password = models.CharField(blank=True, max_length=100, null=True)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(blank=True, null=True)

    is_anonymous = False
    is_authenticated = False