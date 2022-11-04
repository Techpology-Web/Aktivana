from django.db import models

# Create your models here.

def createSignupCode():
    import random
    alphabet = "abcdefghijklmnopqrstuvwxyc"
    code = ""
    for i in range(9):
        code += alphabet[random.randint(0, len(alphabet)-1)]
    return code

class Partner (models.Model):

    name    = models.TextField() # partner name
    logo    = models.TextField() # their logo
    phone   = models.TextField() # their phonenumber
    email   = models.TextField() # their support email (email a employee can contact)
    website = models.TextField() # thier website
    adress  = models.TextField() # thier adress

class Coupon (models.Model):
    import time
    expireTime = models.IntegerField(default=0) # unix timestamp
    useTime    = models.IntegerField(default=1) # how many times it can be used 
    partner    = models.ForeignKey(Partner, on_delete=models.CASCADE)
    picture    = models.TextField()             # how the code should look and also what it gives
    code       = models.TextField()             # code to refer to the code

class Company (models.Model):
    email         = models.TextField()
    password      = models.TextField()
    activeCoupons = models.ManyToManyField(Coupon)
    signupCode    = models.TextField(default=createSignupCode()) # this code is neccecary for employees to signup
    

class Employee (models.Model):

    firstName  = models.TextField()          
    lastName   = models.TextField()          
    password   = models.TextField()          
    email      = models.TextField()          
    company    = models.ForeignKey(Company,on_delete=models.CASCADE)  # the company they belong to
    usedCoupons = models.TextField(default="[]")                                   # the codes they have already used
