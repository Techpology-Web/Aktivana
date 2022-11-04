from django.shortcuts import render
from backend.utils import extractRequest, encrypt
from aktivana.models import Company, Employee, Partner
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

def addEmployee(request):
    req = extractRequest(request)
    try:
        company = Company.objects.filter(signupCode=req["signupCode"])
        if len(company) != 0:
            employee = Employee(
            firstName=req["firstName"],   
            lastName=req["lastName"],
            password=req["password"],
            email=req["email"],
            company=company[0],
            )
            employee.save()
            return HttpResponse("success",status=200)
        else:
            return HttpResponse("Wrong signup code",status=409)
    except Exception as e:
        return HttpResponse(e,status = 400)



def addPartner(request):
    req = extractRequest(request)
    partner = Partner(
        name=req["name"],
        logo=req["name"],
        phone=req["name"],
        email=req["name"],
        website=req["name"],
        adress=req["name"],
    )
    partner.save()
    return HttpResponse("sucess",status = 200)


# Create your views here.
def testConn(request):
    return HttpResponse(200)
