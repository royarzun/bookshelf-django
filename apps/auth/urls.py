# -*- coding: utf8 -*-
from django.urls import path
from apps.auth.token import AuthToken
from apps.auth.ios import IOSAuthToken

urlpatterns = [
    path(r'ios/token', IOSAuthToken.as_view()),
    path(r'token', AuthToken.as_view())
]
