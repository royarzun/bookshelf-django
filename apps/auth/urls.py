# -*- coding: utf8 -*-
from django.urls import path
from apps.auth.ios import google_oauth as ios_googe_oauth

urlpatterns = [
    path(r'ios/token', ios_googe_oauth)
]
