from django.shortcuts import render
from backend.utils import extractRequest, encrypt
from aktivana.models import Company
from django.http import HttpResponse
# Create your views here.

def addCompany(request):
    req = extractRequest(request)
    newCompany = Company(
        email=req["email"],
        password=encrypt(req["password"]),
    )
    newCompany.save()

# Create your views here.
def testConn(request):
    req = extractRequest(request)
    return HttpResponse(200)
