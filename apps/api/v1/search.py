# -*- coding: utf8 -*-
from coreapi import Field
from rest_framework.filters import BaseFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.shelves.google_client import GoogleBooksAPIClient


class GoogleBookFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [
            Field(
                name="name",
                location="query",
                required=False,
                type="string",
                description="book name lookup",
            ),
            Field(
                name="isbn",
                location="query",
                required=False,
                type="string",
                description="ISBN lookup",
            ),
            Field(
                name="author",
                location="query",
                required=False,
                type="string",
                description="author",
            ),
        ]


class SearchView(APIView):
    filter_backends = [GoogleBookFilterBackend]

    def get(self, request, *args, **kwags):
        """Search books with Google Books API"""
        client = GoogleBooksAPIClient()
        response = client.get(
            title=request.query_params.get("title"),
            author=request.query_params.get("author"),
            isbn=request.query_params.get("isbn"),
        )
        return Response(data=response)
