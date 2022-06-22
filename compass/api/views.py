from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, JsonResponse
from .models import Participant, System, Question
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ParticipantSerializer, SystemSerializer, QuestionSerializer


def front(request, second):
    context = { }
    return render(request, "index.html", context)


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Participants': '/participants/',
        'Systems': '/systems/',
        'Wellbeing Questions': '/questions/wellbeing/'
    }
    return Response(api_urls)


@api_view(['GET'])
def participantList(request):
    participants = Participant.objects.all()
    serializer = ParticipantSerializer(participants, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def systemList(request):
    systems = System.objects.all()
    serializer = SystemSerializer(systems, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def wellbeingQuestions(request):
    #todo change this to filter

    questions = Question.objects.all()
    #questions = Question.objects.prefetch_related('options')
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

""" @api_view(['POST'])
def completion """