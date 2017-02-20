# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.contrib import admin
from seo_post import models


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_publish', 'author')

    fieldsets = (
        (None, {
            'fields': ('post_type', 'title', 'body', )
        }),
        ('Basic Options', {
            'fields': ('date_publish', 'date_expire', 'categories'),
        }),
        ('Advance Options', {
            'classes': ('collapse',),
            'fields': ('slug', 'author'),
        }),
    )

    prepopulated_fields = {"slug": ("title",)}

    def get_form(self, request, obj=None, **kwargs):
        form = super(PostAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['author'].initial = request.user.id
        return form
