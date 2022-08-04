
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Participants': '/participants/',
        'Systems': '/systems/',
        'All questions': '/questions/',
        'Question variants (WELL, EVAL)': '/questions/<variant>/',
        'Options': '/options/',
        'Scales': '/scales/',
        'Answers': '/answers/'
    }
    return Response(api_urls)