# -*- coding: utf8 -*-
from django.urls import path
from rest_framework import routers

from apps.api.v1.books import BookViewSet
from apps.api.v1.search import SearchView


router = routers.SimpleRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path(r'search', SearchView.as_view(), name='search'),
] + router.urls
