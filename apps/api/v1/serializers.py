# -*- coding: utf8 -*-
from rest_framework import serializers

from apps.shelves.models import Book, BookComment


class BookTagsSerializer(serializers.Serializer):
    book_id = serializers.IntegerField(source='id', read_only=True)
    tags = serializers.ListSerializer(child=serializers.CharField())

    def create(self, validated_data):
        book = Book.objects.get(id=self.context.get('book_id'))
        for _tag in validated_data.get('tags'):
            book.tags.get_or_create(text=_tag)
        return book


class BookCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookComment
        fields = ("id", "user", "text", "created_at")
        write_only_fields = ("book_id",)
        read_only_fields = ("id", "user", "created_at")

    def create(self, validated_data):
        validated_data.update(**self.context)
        return BookComment.objects.create(**validated_data)


class BookLikeSerializer(serializers.Serializer):
    user = serializers.CharField(source="user.username")


class BookSerializer(serializers.ModelSerializer):
    comments = BookCommentSerializer(many=True, read_only=True)
    likes = BookLikeSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)
    tags = BookTagsSerializer(read_only=True)

    class Meta:
        model = Book
        fields = (
            "id",
            "name",
            "isbn",
            "cover_img_url",
            "likes",
            "likes_count",
            "created_at",
            "comments",
            "description",
            "tags"
        )
        read_only_fields = ("id", "created_at", "likes", "likes_count", "comments", "tags")


class TagSuggestionsSerializer(serializers.ListSerializer):
    child = serializers.CharField()
