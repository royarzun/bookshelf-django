# -*- coding: utf8 -*-
from django.conf import settings
from django.contrib.auth.models import User
from google.oauth2.id_token import verify_oauth2_token
from google.auth.transport import requests
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView


class AuthToken(ObtainAuthToken, APIView):

    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        platform = request.query_params.get("platform")
        if token is None or platform is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            if platform == "ios":
                idinfo = verify_oauth2_token(
                    token, requests.Request(), settings.IOS_GOOGLE_CLIENT_ID
                )
            elif platform == "flutter-ios":
                idinfo = verify_oauth2_token(
                    token, requests.Request(), settings.FLUTTER_IOS_GOOGLE_CLIENT_ID
                )
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            if idinfo["iss"] not in [
                "accounts.google.com",
                "https://accounts.google.com",
            ]:
                raise ValueError("Wrong issuer.")

            user, _ = User.objects.get_or_create(
                username=idinfo["email"],
                first_name=idinfo["given_name"],
                last_name=idinfo["family_name"],
            )
            token, _ = Token.objects.get_or_create(user=user)
            return Response(data={"token": str(token.key)})
        except ValueError as e:
            return Response(status=status.HTTP_403_FORBIDDEN)
