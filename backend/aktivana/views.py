from django.shortcuts import render
from backend.utils import extractRequest, encrypt, verify, storeImage, genVerificationCode
from aktivana.models import Company, Account, Partner, Coupon, PasswordReset
from django.http import HttpResponse
from oneMail.views import emailHandler
# Create your views here.
from datetime import datetime
from datetime import timedelta
import json

def createSignupCode():
    import random
    alphabet = "abcdefghijklmnopqrstuvwxyc"
    code = ""
    for i in range(9):
        code += alphabet[random.randint(0, len(alphabet)-1)]
    return code

def addCompany(request):
	req = extractRequest(request)
	if(request.method == "POST"):

		if len(Company.objects.filter(email=req["email"])) == 0:
			newCompany = Company(
				email=req["email"],
				name =req["name"],
				password=encrypt(req["password"]),
				signupCode=createSignupCode()
			)
			newCompany.save()

			for c in json.loads(req["activeCoupons"]):
				newCompany.activeCoupons.add(Coupon.objects.get(pk=c["id"]))
			newCompany.save()

			return HttpResponse(str(newCompany.__dict__).replace("'",'"'),status=200)
		return HttpResponse("Company with this email already exist",status=409)

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
			# logo=req["logo"],
			phone=req["phone"],
			website=req["website"],
			adress=req["adress"],
		)
		partner.save()

		account = Account(
			firstName = req["name"],
			lastName  = "",
			password  = encrypt(req["password"]),
			email     = str(req["email"]).lower(),
			acountType= 2,
			partner   = partner
		)
		account.save()
		return HttpResponse("sucess",status = 200)
	except Exception as e:
		return HttpResponse(e,status = 400)

def testConn(request):
	return HttpResponse(200)

def login(request):
	req = extractRequest(request)
	emp = Account.objects.filter(email=str(req["email"]).lower())
	if len(emp) != 0:
		print(req)
		logedinAccount = Account.objects.filter(email=str(req["email"]).lower(),password=encrypt(req["password"]))
		print(encrypt(req["password"]))
		if len(logedinAccount) > 0:
			return HttpResponse(json.dumps(logedinAccount[0].toJson()),status=200)
		else:
			return HttpResponse("Wrong password or email",status = 409)
	else:
		return HttpResponse("No user with this email",status = 409)
	return HttpResponse("sucess",status = 200)

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
		query = Partner.objects.all()
		parners = []
		for p in query:
			parners.append(p.toJson())
		return HttpResponse(json.dumps(parners), status=200)
	return HttpResponse(403)

def addCoupon(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		name = req["name"]
		partnerId = req["partner"]
		image = req["image"]

		path = f"media/{str(partnerId)}_{name}.{req['ext']}"
		res = storeImage(image, path)
		if(res):
			query = Partner.objects.filter(id=partnerId)[0]
			_c = query.coupon_set.filter(code=name)
			if(len(_c) == 0):
				n = Coupon(
					code = name,
					partner = query,
					expireTime = req["expire"],
					useTime = req["use"],
					picture = path
				)
				n.save()
				return HttpResponse(status=200)
			else:
				return HttpResponse("Coupon already exists", status=409)
		return HttpResponse("Failed to upload image", status=409)
	return HttpResponse(status=403)

def updateCoupon(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		ID = req["nameID"]
		name = req["name"]
		partnerId = req["partner"]
		image = req["image"]

		query = Partner.objects.filter(id=partnerId)[0]
		_c = query.coupon_set.get(id = ID)
		_c.code = name
		_c.partner = query
		_c.expireTime = req["expire"]
		_c.useTime = req["use"]

		if(image != ""):
			path = f"media/{str(partnerId)}_{name}.{req['ext']}"
			res = storeImage(image, path)
			if(res):
				_c.picture = path
			else: return HttpResponse("Failed to upload image", status=409)

		_c.save()
		try:
			return HttpResponse(status=200)
		except:
			return HttpResponse("Failed to update coupon data", status=409)
	return HttpResponse(status=403)

def updatePartner(request):
	if(request.method == "POST"):
		req = extractRequest(request)

		partner = Partner.objects.filter(pk=req["id"])[0]

		partner.phone  =  req["phone"]
		partner.adress  =  req["adress"]
		partner.website  =  req["website"]
		account = Account.objects.get(partner=partner)
		account.firstName = req['name']
		account.email = req["email"]
		account.save()

		partner.save()

		return HttpResponse("Partner was updated",status=200)

	return HttpResponse(status=403)

def removePartner(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		partner = Partner.objects.filter(pk=req["id"])[0]
		partner.delete()
		return HttpResponse("Partner was deleted",status=200)
	return HttpResponse(status=403)

def forgotPassword(request):
	if(request.method == "POST"):
		req = extractRequest(request)

		email	= req["email"]
		value	= genVerificationCode()
		expire	= (datetime.now() + timedelta(minutes=5)).strftime('%Y-%m-%d %H:%M:%S')
		print(expire)

		_ret = PasswordReset(
			value=value,
			target=Account.objects.get(email=email),
			expire=expire
		)

		_ret.save()

		#eh	= emailHandler()
		#eh.sendEmail("info@techpology.com", "asså", "<p>Tja fan</p>")

		return HttpResponse(status=200)
	return HttpResponse(status=403)

def getAllCompanys(request):
	if(request.method == "GET"):
		query = Company.objects.all()
		companys = []
		for p in query:
			companys.append(p.toJson())
		return HttpResponse(json.dumps(companys), status=200)
	return HttpResponse(status=403)

def updateCompany(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		print(type(req["activeCoupons"]))
		company = Company.objects.get(pk=req["id"])
		company.name=req["name"]
		company.email=req["email"]
		company.activeCoupons.clear()

		for c in json.loads(req["activeCoupons"]):
			company.activeCoupons.add(Coupon.objects.get(pk=c["id"]))

		company.save()
		return HttpResponse("Updated",status=200)

	return HttpResponse(status=403)

def removeCompany(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		company = Company.objects.get(pk=req["id"])

		company.delete()
		return HttpResponse("Updated",status=200)

	return HttpResponse(status=403)
def verifyPassRecovery(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		print(req)
		acc = Account.objects.filter(email= req["email"])[0]
		p = PasswordReset.objects.filter(target_id=acc)
		if(len(p) != 0):
			if(p[0].value == req["code"]):
				return HttpResponse(200)
		return HttpResponse(409)
	return HttpResponse(403)

def updateAccountPassword(request):
	if(request.method == "POST"):
		req = extractRequest(request)
		email = req["email"]
		query = Account.objects.filter(email=email)[0]
		PasswordReset.objects.get(target_id=query).delete()
		query.password = encrypt(req["passw"])
		query.save()
		return HttpResponse(200)
	return HttpResponse(403)
