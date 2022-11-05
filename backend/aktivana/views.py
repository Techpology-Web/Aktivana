from django.shortcuts import render
from backend.utils import extractRequest, encrypt
from aktivana.models import Company, Employee, Partner, Coupon
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
            if len(Employee.objects.filter(email=req["email"])):
                employee  = Employee(
                firstName = req["firstName"],   
                lastName  = req["lastName"],
                password  = encrypt(req["password"]),
                email     = req["email"],
                company   = company[0],
                )
                employee.save()
                return HttpResponse("success",status=200)
            else:
                return HttpResponse("User with this email alredy exists",status=409)
        else:
            return HttpResponse("Wrong signup code",status=409)
    except Exception as e:
        return HttpResponse(e,status = 400)

def getCodes(request):
    try:
        req = extractRequest(request)
        employee = Employee.objects.get(pk=req["id"])
        coupons = employee.company.activeCoupons.all()

        codesJ = []
        usedCoupons = json.loads(employee.usedCoupons)
        for coupon in coupons:
            if coupon.pk not in usedCoupons:
                print(str(coupon.__dict__))
                codesJ.append(coupon.toJson())
        

        return HttpResponse(json.dumps(codesJ),status = 200)
    except Exception as e:
        return HttpResponse(e,status = 400)

def addCode(request):
    try:
        req = extractRequest(request)
        partner = Partner.objects.get(pk="id")
        coupon = Coupon(
            expireTime=req["expireTime"],
            useTime=req["useTime"],
            partner=partner,
            picture=req["picture"]
        )
        coupon.save()
        return HttpResponse("sucess",status = 200)
    except Exception as e:
        return HttpResponse(e,status = 400)

def useCode(request):
    try:
        req = extractRequest(request)

        employee = Employee.objects.get(pk=req["employeeId"])        
        usedcodes = json.loads(employee.usedCoupons)

        coupon = Coupon.objects.get(pk=req["codeId"])
        usedcodes.append(coupon.pk)

        employee.usedCoupons = json.dumps(usedcodes)
        employee.save()

        return HttpResponse("sucess",status = 200)
    except Exception as e:
        return HttpResponse(e,status = 400)

def addPartner(request):
    try:
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
    except Exception as e:
        return HttpResponse(e,status = 400)

# Create your views here.
def testConn(request):
    return HttpResponse(200)


def login(request):
    try:
        req = extractRequest(request)
        emp = Employee.objects.filter(email=req["email"])
        if len(emp) != 0:
            if emp[0].password == encrypt(req["password"]):
                
                return HttpResponse(str(emp[0].pk),status=200)
            else:
                return HttpResponse("Wrong password for "+req["email"],status = 409)
        else:
            return HttpResponse("No user with this email",status = 409)



        return HttpResponse("sucess",status = 200)
    except Exception as e:
        return HttpResponse(e,status = 400)