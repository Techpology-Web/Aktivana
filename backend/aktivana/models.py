from django.db import models
import json
# Create your models here.


class Partner (models.Model):

    logo    = models.TextField("") # their logo
    phone   = models.TextField() # their phonenumber
    website = models.TextField() # thier website
    adress  = models.TextField() # thier adress

    def toJson(self):
        account = Account.objects.get(partner=self)
        return json.loads(json.dumps(
            {
                "name"    : account.firstName,
                "logo"    : self.logo,
                "phone"   : self.phone,
                "email"   : account.email,
                "website" : self.website,
                "adress"  : self.adress,
                "id"      : self.pk
            })
        )

class Coupon (models.Model):
    import time
    expireTime = models.IntegerField(default=0) # unix timestamp
    useTime    = models.IntegerField(default=1) # how many times it can be used
    partner    = models.ForeignKey(Partner, on_delete=models.CASCADE)
    picture    = models.TextField()             # how the code should look and also what it gives
    code       = models.TextField()             # code to refer to the code

    def toJson(self):
        return json.loads(json.dumps(
            {
                "expireTime" : self.expireTime,
                "useTime"    : self.useTime,
                "partner"    : self.partner.toJson(),
                "picture"    : self.picture,
                "code"       : self.code,
                "id"         : self.pk
            })
        )

class Company (models.Model):
    name          = models.TextField(default="")
    email         = models.TextField(default="")
    password      = models.TextField(default="")
    activeCoupons = models.ManyToManyField(Coupon)
    signupCode    = models.TextField(default="") # this code is neccecary for Acounts to signup

    def toJson(self):
        activecodes = []
        for code in self.activeCoupons.all():
            activecodes.append(code.toJson())
        return json.loads(json.dumps(
            {
                "name"         : self.name,
                "email"         : self.email,
                "password"      : self.password,
                "activeCoupons" : json.dumps(activecodes),
                "signupCode"    : self.signupCode,
                "id"            : self.pk
            })
        )

class Account (models.Model):

    firstName   = models.TextField()
    lastName    = models.TextField()
    password    = models.TextField()
    email       = models.TextField()
    partner     = models.ForeignKey(Partner,on_delete=models.CASCADE,null=True,blank=True)
    company     = models.ForeignKey(Company,on_delete=models.CASCADE,null=True,blank=True)  # the company they belong to
    usedCoupons = models.TextField(default="[]")                       # the codes they have already used
    acountType  = models.IntegerField(default=0)                       # 0 for Account 1 for admin (aktivana) 2 for partner

    def toJson(self):
        try:
            company = self.company.toJson()
        except:
            company="{}"

        return json.loads(json.dumps(
            {
                "firstName"      : self.firstName,
                "lastName"       : self.lastName,
                "type"           : self.acountType,
                "password"       : self.password,
                "email"          : self.email,
                "company"        : company,
                "usedCoupons"    : json.loads(self.usedCoupons),
                "id"             : self.pk
            })
        )

class PasswordReset(models.Model):
    value  = models.TextField(default="", null=False)
    target = models.ForeignKey(Account, on_delete=models.CASCADE)
    expire = models.TextField(default="", null=False)
