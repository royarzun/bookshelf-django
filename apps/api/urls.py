# -*- coding: utf8 -*-
from django.urls import include, path


urlpatterns = [
    path(r'v1/', include('apps.api.v1.urls'))
]
