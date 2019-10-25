# -*- coding: utf8 -*-
from django.urls import path
from apps.auth.ios import IOSAuthToken

urlpatterns = [
    path(r'ios/token', IOSAuthToken.as_view())
]
