# -*- coding: utf8 -*-
from coreapi import Field
from django.db import IntegrityError
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.filters import BaseFilterBackend
from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.api.v1.serializers import (
    BookSerializer,
    BookCommentSerializer,
    BookTagsSerializer,
)
from apps.shelves.models import Book


class BookFilterBackend(BaseFilterBackend):
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
        ]

    def filter_queryset(self, request, queryset, view):
        name = request.query_params.get("name")
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset


class BookViewSet(
    GenericViewSet,
    ListModelMixin,
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
):

    serializer_class = BookSerializer
    queryset = Book.objects.prefetch_related("likes", "comments")
    filter_backends = [BookFilterBackend]

    def get_serializer_context(self):
        return {"user": self.request.user}

    @swagger_auto_schema(operation_description="Registered books list")
    def list(self, request, *args, **kwargs):
        return super(BookViewSet, self).list(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Register a new book")
    def create(self, request, *args, **kwargs):
        return super(BookViewSet, self).create(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Update new book")
    def update(self, request, *args, **kwargs):
        return super(BookViewSet, self).update(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Retrieve a book")
    def retrieve(self, request, *args, **kwargs):
        return super(BookViewSet, self).retrieve(request, *args, **kwargs)

    @swagger_auto_schema(method="POST", operation_description="Like a book")
    @action(methods=["POST"], detail=True)
    def likes(self, request, *args, **kwargs):
        book = self.get_object()
        try:
            book.likes.create(user=request.user)
            return Response(
                data=self.get_serializer(
                    book, context=self.get_serializer_context()
                ).data
            )
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(method="PUT", operation_description="Comment a book")
    @action(methods=["PUT"], detail=True, serializer_class=BookCommentSerializer)
    def comments(self, request, *args, **kwargs):
        book = self.get_object()
        context = self.get_serializer_context()
        context.update(book_id=book.id)
        serializer = BookCommentSerializer(data=request.data, context=context)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        return Response(
            self.get_serializer(comment, context=self.get_serializer_context()).data
        )


class BookTagsViewSet(GenericViewSet, CreateModelMixin, DestroyModelMixin):
    serializer_class = BookTagsSerializer
    http_method_names = ["post", "delete"]
    lookup_field = 'text'

    def get_serializer_context(self):
        return {"book_id": self.kwargs.get("book_id")}

    def get_queryset(self):
        return Book.objects.get(id=self.kwargs.get("book_id")).tags

    def create(self, request, *args, **kwargs):
        tags = BookTagsSerializer(
            data=request.data, context=self.get_serializer_context()
        )
        tags.is_valid(raise_exception=True)
        book = tags.save()

        return Response(
            data=BookTagsSerializer(book, context=self.get_serializer_context()).data
        )
