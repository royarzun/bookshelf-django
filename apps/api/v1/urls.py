# -*- coding: utf8 -*-
from django.urls import path
from rest_framework import routers

from apps.api.v1.books import BookViewSet, BookTagsViewSet
from apps.api.v1.search import SearchView
from apps.api.v1.suggestions import TagSuggestionView


router = routers.SimpleRouter()
router.register(r'books', BookViewSet, basename="books")
router.register(r'books/(?P<book_id>\d+)/tags', BookTagsViewSet, basename="book-tags")
router.register(r'suggestions', TagSuggestionView, basename="suggestions")

urlpatterns = [
    path(r'search', SearchView.as_view(), name='search'),
] + router.urls
