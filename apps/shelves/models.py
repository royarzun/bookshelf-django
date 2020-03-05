# -*- coding: utf8 -*-
from django.db import models
from django.utils.translation import ugettext

from books import settings


class Book(models.Model):
    name = models.TextField(verbose_name=ugettext("BOOK_NAME"), blank=True)
    isbn = models.TextField(verbose_name=ugettext("BOOK_ISBN"), blank=True)
    cover_img_url = models.CharField(max_length=256, blank=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField('shelves.Tag', related_name='books')


class BookLike(models.Model):
    book = models.ForeignKey(to="Book", related_name="likes", on_delete=models.CASCADE)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("book", "user")


class BookComment(models.Model):
    book = models.ForeignKey(
        to="Book", related_name="comments", on_delete=models.CASCADE
    )
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Tag(models.Model):
    text = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return str(self.text)


class BookRequest(models.Model):
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.TextField(verbose_name=ugettext("BOOK_NAME"), blank=True)
    url = models.CharField(max_length=256, default="")
    isbn = models.TextField(verbose_name=ugettext("BOOK_ISBN"), blank=True)
