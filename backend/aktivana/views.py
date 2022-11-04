from django.http import HttpResponse
from backend.utils import extractRequest
from django.conf import settings

# Create your views here.
def testConn(request):
    return HttpResponse(200)