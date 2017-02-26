# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import QuerySet, Q
from django.utils import timezone


class PostQuerySet(QuerySet):

    def published(self):
        return self.filter(
            Q(date_expire__isnull=True)|
            Q(date_expire__gte=timezone.now()),
            Q(date_publish__lte=timezone.now())
        )
