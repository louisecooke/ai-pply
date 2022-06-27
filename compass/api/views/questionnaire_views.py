from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from ..models.questionnaire_models import Question, Option, Smiley, Answer
from ..serializers.questionnaire_serializers import QuestionSerializer, OptionSerializer, SmileySerializer, AnswerSerializer

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

class AnswerList(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


    #this is making multiple hits to the database still. TODO research how to optimize and hit the database only once.
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(AnswerList, self).get_serializer(*args, **kwargs)