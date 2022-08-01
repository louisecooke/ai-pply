from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from ..models.system_models import Participant, System, Interaction
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from ..serializers.system_serializers import ParticipantSerializer, SystemSerializer, InteractionSerializer

class Participant(generics.CreateAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()


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


class Interaction(generics.ListCreateAPIView):
    serializer_class = InteractionSerializer
    queryset = Interaction.objects.all()
