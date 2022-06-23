from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework import generics, filters
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from ..models.questionnaire_models import Question, Option, Smiley
from ..serializers.questionnaire_serializers import QuestionSerializer, OptionSerializer, SmileySerializer

@api_view(['GET'])
def questions(request, pk):
    questions = Question.objects.filter(variant=pk)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def options(request):
    options = Option.objects.all().order_by('value')
    serializer = OptionSerializer(options, many=True)
    return Response(serializer.data)

class SmileyListView(generics.ListAPIView):
    queryset = Smiley.objects.all().order_by('value')
    serializer_class = SmileySerializer