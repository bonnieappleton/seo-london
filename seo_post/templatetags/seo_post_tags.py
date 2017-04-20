# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import template
from seo_post.models import PostCategory

register = template.Library()


@register.assignment_tag
def get_post_categories():
    return PostCategory.objects.all()
