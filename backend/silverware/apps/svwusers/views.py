from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from apps.svwusers.services import firebase
from django.http import JsonResponse
from .models import User
from .serializers import UserResponseSerializer
# Create your views here.
@api_view(['PUT'])
@authentication_classes([])
@permission_classes([AllowAny])
def new_user(request, firebase_user_id):
    '''
    API: users/register/<str:pk>
    urlparam: pk
    payload: {
            tpk_firebaseid
        }
    PUT:
        success response: User, status.HTTP_201_CREATED
    '''
    if request.method == 'PUT':
        try:
            token = request.data['tpk_firebaseid']
            firebase_user = firebase.get_user_profile_bytoken(token)
        except Exception as error:
            print(error)
            return JsonResponse({}, status=400)
        new_parker_user = User()
        new_parker_user.tpk_firebaseid = firebase_user['users'][0]['localId']
        if firebase_user_id != new_parker_user.tpk_firebaseid:
            return JsonResponse({}, status=503)

        new_parker_user.tpk_email = firebase_user['users'][0]['providerUserInfo'][0]['email']
        check_existing_user = User.objects.filter(tpk_email=new_parker_user.tpk_email,
                                                    tpk_isdeleted=False)
        if check_existing_user:
            return JsonResponse({}, status=406)
        new_parker_user.tpk_name = firebase_user['users'][0]['providerUserInfo'][0]['displayName']
        new_parker_user.tpk_photoUrl = firebase_user['users'][0]['providerUserInfo'][0]['photoUrl']
        new_parker_user.save()
        response = UserResponseSerializer(new_parker_user, many=False)
        return JsonResponse(response.data, status=201)
    return JsonResponse({}, status=404)