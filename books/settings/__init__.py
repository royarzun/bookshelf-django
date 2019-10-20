# -*- coding: utf-8 -*-

try:
    from .local import *
except ImportError as e:
    from .defaults import *
