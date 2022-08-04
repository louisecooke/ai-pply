from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from ..models.questionnaire_models import Question, Option, Answer, Scale
from ..serializers.questionnaire_serializers import QuestionSerializer, OptionSerializer, AnswerSerializer, ScaleSerializer

class QuestionList(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        v = self.kwargs.get('variant', None)
        if (v):
            questions = Question.objects.filter(variant=v)
        else:
            questions = Question.objects.all()
        return questions

class OptionList(generics.ListAPIView):
    queryset = Option.objects.all().order_by('value')
    serializer_class = OptionSerializer

class AnswerList(generics.ListAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


    #this is making multiple hits to the database still. TODO research how to optimize and hit the database only once.
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(AnswerList, self).get_serializer(*args, **kwargs)


class ScaleList(generics.ListAPIView):
    queryset = Scale.objects.all()
    serializer_class = ScaleSerializer

    