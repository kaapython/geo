from django.urls import path

from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('query_properties', views.query_properties, name='query_properties')
]
