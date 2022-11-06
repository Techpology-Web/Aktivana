from django.shortcuts import render
from backend.utils import extractRequest, encrypt, verify
from aktivana.models import Company, Account, Partner, Coupon
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

def addAcount(request):
	req = extractRequest(request)
	try:
		company = Company.objects.filter(signupCode=req["signupCode"])
		if len(company) != 0:
			if len(Account.objects.filter(email=req["email"])) <= 0:
				account  = Account(
					firstName = req["firstName"],   
					lastName  = req["lastName"],
					password  = encrypt(req["password"]),
					email     = str(req["email"]).lower(),
					company   = company[0],
				)
				account.save()
				return HttpResponse("success",status=200)
			else:
				return HttpResponse("User with this email already exists",status=409)
		else:
			return HttpResponse("Wrong signup code",status=409)
	except Exception as e:
		return HttpResponse(e,status = 400)

def acountGetCodes(request):
	try:
		req = extractRequest(request)
		account = Account.objects.get(pk=req["id"])
		coupons = account.company.activeCoupons.all()
		codesJ = []
		usedCoupons = json.loads(account.usedCoupons)
		for coupon in coupons:
			if coupon.pk not in usedCoupons:
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

		account = Account.objects.get(pk=req["acountId"])        
		usedcodes = json.loads(account.usedCoupons)

		coupon = Coupon.objects.get(pk=req["codeId"])
		usedcodes.append(coupon.pk)

		account.usedCoupons = json.dumps(usedcodes)
		account.save()

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

def testConn(request):
	return HttpResponse(200)

def login(request):
	try:
		req = extractRequest(request)
		emp = Account.objects.filter(email=str(req["email"]).lower())
		if len(emp) != 0:
			if(verify(req["password"], emp[0].password)):
				print(emp[0].toJson())
				return HttpResponse(json.dumps(emp[0].toJson()),status=200)
			else:
				return HttpResponse("Wrong password for "+req["email"],status = 409)
		else:
			return HttpResponse("No user with this email",status = 409)
		return HttpResponse("sucess",status = 200)
	except Exception as e:
		return HttpResponse(e,status = 400)

def getCodes(request):
    if request.method == "POST":
        coupons = []
        for coupon in Coupon.objects.all():
            coupons.append(coupon.toJson())

        return HttpResponse(json.dumps(coupons))

    return HttpResponse(status=403)

def verifyCompanyCode(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		query = Company.objects.filter(signupCode= req["code"])
		if(len(query) != 0):
			return HttpResponse(status=200)
		return HttpResponse(status=500)
	return HttpResponse(status=403)

# Coupons

def adminDeleteCode(request):
	if(request.method == "POST"):
		req = extractRequest(request)

		try:
			Coupon.objects.filter(id = req["id"])[0].delete()
			return HttpResponse(status=200)
		except:
			print("adminDeleteCode::views::aktivana : ERROR->(Coupon object with id{" + str(req["id"]) + "} not found)")
			return HttpResponse(status=409)

	return HttpResponse(status=403)

def getAllPartners(request):
	if(request.method == "GET"):
		query = Partner.objects.all().values()
		print(json.dumps(list(query)).replace("'", '"'))
		return HttpResponse(json.dumps(list(query)).replace("'", '"'), status=200)
	return HttpResponse(403)