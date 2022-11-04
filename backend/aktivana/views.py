from django.shortcuts import render
from backend.utils import extractRequest, encrypt
from aktivana.models import Company
from django.http import HttpResponse
# Create your views here.
import json

def addCompany(request):
    req = extractRequest(request)
    try:
        if len(Company.objects.filter(email=req["email"])) == 0:
            newCompany = Company(
                email=req["email"],
                password=encrypt(req["password"]),
            )
            newCompany.save()
            return HttpResponse(str(newCompany.__dict__).replace("'",'"'),status=200)
        return HttpResponse("Company with this email already exist",status=409)
            
    except Exception as e:
        return HttpResponse(e.__str__(),status=400)    

# Create your views here.
def testConn(request):
    req = extractRequest(request)
    return HttpResponse(200)
