# -*- coding: utf8 -*-
from django.contrib import admin

from apps.shelves.models import Book, BookRequest, BookComment, BookLike, Tag

admin.site.register(Book)
admin.site.register(BookLike)
admin.site.register(BookComment)
admin.site.register(BookRequest)
admin.site.register(Tag)
