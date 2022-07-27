from rest_framework import serializers
from ..models.system_models import Participant, System
import hashlib

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = []

    def create(self, validated_data):
        request_data = (self.context['request'])
        validated_data['id'] = get_hashed_ip(request_data)
        return Participant.objects.create(**validated_data)

class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = '__all__'


def get_hashed_ip(request_data):
    x_forwarded_for = request_data.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request_data.META.get('REMOTE_ADDR')
    hashed_ip = hashlib.sha256(ip.encode('utf-8')).hexdigest()
    return hashed_ip