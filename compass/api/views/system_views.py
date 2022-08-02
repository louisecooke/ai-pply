from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from ..models.system_models import Participant, System, Interaction
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from ..serializers.system_serializers import ParticipantSerializer, SystemSerializer, InteractionSerializer
from ..filters import IDFilter

class Participant(generics.CreateAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()

class SystemList(generics.ListAPIView):
    serializer_class = SystemSerializer
    queryset = System.objects.all()
    filter_backends = (IDFilter,)
    filterset_fields = ("id",)


class Interaction(generics.ListCreateAPIView):
    serializer_class = InteractionSerializer
    queryset = Interaction.objects.all()