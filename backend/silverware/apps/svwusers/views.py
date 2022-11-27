import datetime
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.http import JsonResponse
from .models import User as SvwUser
from .serializers import UserResponseSerializer
from apps.svwusers.services import firebase
from apps.svwusers.utils.jwttoken import generate_access_token
from apps.svwusers.permissions.isuserloggedin import IsUserLoggedIn

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def sign_in(request):
    '''
    API: signin
    payload: {
        'tpk': svw_firebaseid
    }
    success response: { "user": ,
                        "svw_token": }
    '''
    if request.method == 'POST':
        try:
            token = request.data['svw_firebaseid']
            firebase_user = firebase.get_user_profile_bytoken(token)
        except Exception as error:
            print(error)
            return JsonResponse({}, status=400)
        login_email = firebase_user['users'][0]['providerUserInfo'][0]['email']
        try:
            svw_user = SvwUser.objects.get(svw_email=login_email, svw_isdeleted=False)
            svw_user.last_login =  datetime.datetime.now()
            svw_user.save()
        except Exception as error:
            print(error)
            return JsonResponse({},status=400)
        svw_token = generate_access_token(svw_user)
        response = { "user": UserResponseSerializer(svw_user, many=False).data,
                    "svw_token": str(svw_token.access_token) }
        
        return JsonResponse(response, status=status.HTTP_200_OK)
    return JsonResponse({}, status=404)


@api_view(['PUT'])
@authentication_classes([])
@permission_classes([AllowAny])
def new_user(request, firebase_user_id):
    '''
    API: users/register/<str:pk>
    urlparam: pk
    payload: {
            svw_firebaseid
        }
    PUT:
        success response: User, status.HTTP_201_CREATED
    '''
    if request.method == 'PUT':
        try:
            token = request.data['svw_firebaseid']
            firebase_user = firebase.get_user_profile_bytoken(token)
        except Exception as error:
            print(error)
            return JsonResponse({}, status=400)
        new_svw_user = SvwUser()
        new_svw_user.svw_firebaseid = firebase_user['users'][0]['localId']
        if firebase_user_id != new_svw_user.svw_firebaseid:
            return JsonResponse({}, status=503)

        new_svw_user.svw_email = firebase_user['users'][0]['providerUserInfo'][0]['email']
        check_existing_user = SvwUser.objects.filter(svw_email=new_svw_user.svw_email,
                                                    svw_isdeleted=False)
        if check_existing_user:
            return JsonResponse({}, status=406)
        new_svw_user.svw_name = firebase_user['users'][0]['providerUserInfo'][0]['displayName']
        new_svw_user.svw_photoUrl = firebase_user['users'][0]['providerUserInfo'][0]['photoUrl']
        new_svw_user.save()
        response = UserResponseSerializer(new_svw_user, many=False)
        return JsonResponse(response.data, status=201)
    return JsonResponse({}, status=404)

@api_view(['GET'])
@permission_classes([IsUserLoggedIn])
def get_user(request, firebase_user_id):
    '''
    API: users_list
    payload: {
    }
    success response: list<User>
    '''
    if request.method == 'GET':
        svw_user = SvwUser.objects.get(svw_firebaseid=firebase_user_id, svw_isdeleted=False)
        user_serializer = UserResponseSerializer(svw_user, many=False)
        return JsonResponse(user_serializer.data, safe=False)
    return JsonResponse({request.data}, status=404)

@api_view(['PUT'])
@permission_classes([IsUserLoggedIn])
def update_user(request, firebase_user_id):
    '''
    API: users/register/<str:pk>
    urlparam: pk
    payload: {
            svw_name:,
            svw_address:,
            svw_bio:,
            svw_dob:,
            svw_telephone:, 
            svw_city:, 
            svw_province:, 
            svw_postalcode:
        }
    PUT:
        success response: User, status.HTTP_200
    '''
    if request.method == 'PUT':
        svw_user = SvwUser.objects.get(svw_firebaseid=firebase_user_id, svw_isdeleted=False)
        if request.data['svw_name'] and request.data['svw_name'] != svw_user.svw_name:
            svw_user.svw_name = request.data['svw_name']
        if request.data['svw_address'] and request.data['svw_address'] != svw_user.svw_address:
            svw_user.svw_address = request.data['svw_address']
        if request.data['svw_dob'] and request.data['svw_dob'] != svw_user.svw_dob:
            svw_user.svw_dob = datetime.datetime.fromisoformat(request.data['svw_dob'][:-1] + '+00:00')
        if request.data['svw_bio'] and request.data['svw_bio'] != svw_user.svw_bio:
            svw_user.svw_bio = request.data['svw_bio']
        if request.data['svw_telephone'] and request.data['svw_telephone'] != svw_user.svw_telephone:
            svw_user.svw_telephone = request.data['svw_telephone']
        if request.data['svw_city'] and request.data['svw_city'] != svw_user.svw_city:
            svw_user.svw_city = request.data['svw_city']
        if request.data['svw_province'] and request.data['svw_province'] != svw_user.svw_province:
            svw_user.svw_province = request.data['svw_province']
        if request.data['svw_postalcode'] and request.data['svw_postalcode'] != svw_user.svw_postalcode:
            svw_user.svw_postalcode = request.data['svw_postalcode']
        svw_user.save()
    return JsonResponse({}, status=200)