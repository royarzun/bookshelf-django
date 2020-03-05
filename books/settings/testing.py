# -*- coding: utf8 -*-
from .defaults import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        "USER": "postgres",
        "HOST": "127.0.0.1",
        "PORT": 5432,
    }
}
