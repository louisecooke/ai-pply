from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from ..models.questionnaire_models import Question, Option, Smiley
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from ..serializers.questionnaire_serializers import QuestionSerializer, OptionSerializer, SmileySerializer

@api_view(['GET'])
def questions(request, pk):
    questions = Question.objects.filter(variant=pk)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def options(request):
    options = Option.objects.all()
    serializer = OptionSerializer(options, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def smileys(request):
    smileys = Smiley.objects.all()
    serializer = SmileySerializer(smileys, many=True)
    return Response(serializer.data)