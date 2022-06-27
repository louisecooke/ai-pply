from django.urls import path, re_path
from django.views import generic
from .views.list_view import apiOverview
from .views.questionnaire_views import questions, options, SmileyListView, AnswerList
from .views.system_views import participantList, systemList

urlpatterns = [
    path('', apiOverview, name='api-overview'),
    re_path(r'participants\/?$', participantList, name='participants'),
    path('systems/', systemList, name='systems'),
    path('questions/<pk>/', questions, name='questions'),
    path('options/', options, name='options'),
    path('smileys/', SmileyListView.as_view(), name='smileys'),
    path('answers/', AnswerList.as_view(), name='answers'),
    re_path(r'\S*', apiOverview, name='api-overview'),
    
] 