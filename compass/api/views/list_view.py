
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Participants': '/participants/',
        'Systems': '/systems/',
        'Wellbeing Questions': '/questions/wellbeing/'
    }
    return Response(api_urls)