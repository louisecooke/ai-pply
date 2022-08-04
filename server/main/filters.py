from django_filters import rest_framework as filters
from .serializers.system_serializers import get_hashed_ip
from .models.system_models import Interaction

class IDFilter(filters.DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        ip = get_hashed_ip(request)
        interactions = Interaction.objects.filter(participant=ip).values('system')
        return queryset.exclude(id__in=[interactions])