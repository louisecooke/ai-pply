from rest_framework import serializers
from ..models.system_models import Participant, System, Interaction
import hashlib
import datetime

class ParticipantSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Participant
        fields = '__all__'

    def create(self, validated_data):
        request_data = (self.context['request'])
        validated_data['id'] = get_hashed_ip(request_data)
        validated_data['timestamp'] = datetime.datetime.now()
        return Participant.objects.create(**validated_data)

class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = '__all__'

class InteractionSerializer(serializers.ModelSerializer):
    participant = serializers.CharField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Interaction
        fields = '__all__'

    def create(self, validated_data):
        request_data = (self.context['request'])
        validated_data['participant'] = Participant.objects.get(id=get_hashed_ip(request_data))
        validated_data['timestamp'] = datetime.datetime.now()
        return Interaction.objects.create(**validated_data)



def get_hashed_ip(request_data):
    x_forwarded_for = request_data.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request_data.META.get('REMOTE_ADDR')
    hashed_ip = hashlib.sha256(ip.encode('utf-8')).hexdigest()
    return hashed_ip