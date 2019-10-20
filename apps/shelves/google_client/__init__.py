# -*- coding: utf8 -*-
import json

import requests
from django.conf import settings
from rest_framework import serializers


class GoogleBookSerializer(serializers.Serializer):
    title = serializers.CharField(source="volumeInfo.title")
    publisher = serializers.CharField(source="volumeInfo.publisher", allow_null=True)
    cover_url = serializers.CharField(
        source="volumeInfo.imageLinks.thumbnail", allow_null=True
    )
    description = serializers.CharField(
        source="volumeInfo.description", allow_null=True
    )
    authors = serializers.ListField(
        source="volumeInfo.authors",
        child=serializers.CharField(),
        allow_null=True,
        allow_empty=True,
    )


class GoogleResponse(serializers.ListSerializer):
    child = GoogleBookSerializer()


class GoogleBooksAPIClient(object):
    BASE_URL = "https://www.googleapis.com/books/v1/volumes?"

    def get(self, title=None, author=None, isbn=None):
        query = ""
        if title:
            query += "title:{title}&".format(title=title)
        if author:
            query += "inauthor:{author}&".format(author=author)
        if isbn:
            query += "isbn:{isbn}".format(isbn=isbn)

        response = requests.get(
            "{base_url}q=+{query}&key={api_key}".format(
                base_url=self.BASE_URL,
                query=query,
                api_key=settings.GOOGLE_BOOKS_API_KEY,
            )
        )
        if response.status_code == 200:
            response = GoogleResponse(json.loads(response.content).get("items", []))
            return response.data
