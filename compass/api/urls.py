from django.urls import path, re_path
from django.views import generic


from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    re_path(r'participants\/?$', views.participantList, name='participants'),
    path('systems/', views.systemList, name='systems'),
    path('questions/wellbeing/', views.wellbeingQuestions, name='wellbeing-questions'),
    re_path(r'\S*', views.apiOverview, name='api-overview'),
] 