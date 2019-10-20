from .defaults import *
import django_heroku

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'POST': os.environ.get('DB_PORT'),
        'PASSWORD': os.environ.get('DB_PASSWORD')
    }
}

django_heroku.settings(locals())
