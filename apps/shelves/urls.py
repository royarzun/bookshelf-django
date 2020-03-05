# -*- coding: utf8 -*-
from django.contrib import admin
from django.urls import path

app_name = "shelves"

urlpatterns = [path("admin/", admin.site.urls)]
