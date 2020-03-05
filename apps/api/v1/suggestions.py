# -*- coding: utf8 -*-
from coreapi import Field
from rest_framework.filters import BaseFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.api.v1.serializers import TagSuggestionsSerializer
from apps.shelves.models import Tag


class TagSuggestionsFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [
            Field(
                name="query",
                location="query",
                required=False,
                type="string",
                description="tag initials",
            ),
        ]

    def filter_queryset(self, request, queryset, view):
        query = request.query_params.get('query')
        return queryset.filter(text__icontains=query)


class TagSuggestionView(GenericViewSet):
    permission_classes = (IsAuthenticated, )
    filter_backends = (TagSuggestionsFilterBackend, )

    def get_queryset(self):
        return Tag.objects.all()

    def get_serializer_class(self):
        if self.action == 'tags':
            return TagSuggestionsSerializer

    def list(self, request, *args, **kwargs):
        tags = self.filter_queryset(self.get_queryset()).values_list('text', flat=True)
        return Response(data=self.get_serializer(tags).data)
