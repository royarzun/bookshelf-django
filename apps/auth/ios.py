# -*- coding: utf8 -*-
from django.conf import settings
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response


@csrf_exempt
@api_view(["POST"])
def google_oauth(request):
    token = request.data.get('token')
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.IOS_GOOGLE_CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        user, _ = User.objects.get_or_create(
            username=idinfo["email"],
            first_name=idinfo["given_name"],
            last_name=idinfo["family_name"]
        )
        token = Token.objects.get_or_create(user=user)
        return Response(
            data=token.se
        )
    except ValueError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
