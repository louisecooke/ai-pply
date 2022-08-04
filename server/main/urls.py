from django.urls import path, re_path
from django.views import generic
from .views.list_view import apiOverview
from .views.questionnaire_views import QuestionList, OptionList, AnswerList, ScaleList
from .views.system_views import SystemList, Participant, Interaction

urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('participants/', Participant.as_view(), name='participants'),
    path('interactions/', Interaction.as_view(), name='interactions'),
    path('systems/', SystemList.as_view(), name='systems'),
    
    path('questions/', QuestionList.as_view(), name='questions'),
    path('questions/<variant>/', QuestionList.as_view(), name='questions'),
    path('options/', OptionList.as_view(), name='options'),
    
    path('scales/', ScaleList.as_view(), name='scales'),
    path('answers/', AnswerList.as_view(), name='answers'),
    re_path(r'\S*', apiOverview, name='api-overview'),
    
] 