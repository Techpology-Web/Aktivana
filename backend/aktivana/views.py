from django.http import HttpResponse
from backend.utils import extractRequest

# Create your views here.
def testConn(request):
    req = extractRequest(request)
    return HttpResponse(200)