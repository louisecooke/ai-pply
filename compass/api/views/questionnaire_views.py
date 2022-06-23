from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, JsonResponse
from ..models.questionnaire_models import Question
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers.questionnaire_serializers import QuestionSerializer

@api_view(['GET'])
def wellbeingQuestions(request):
    #todo change this to filter

    questions = Question.objects.all()
    #questions = Question.objects.prefetch_related('options')
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

""" @api_view(['POST'])
def completion """