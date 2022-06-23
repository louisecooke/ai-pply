from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, JsonResponse
from ..models.system_models import Participant, System
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers.system_serializers import ParticipantSerializer, SystemSerializer



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
