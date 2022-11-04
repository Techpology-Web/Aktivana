from django.db import models

# Create your models here.

class Partner (models.Model):
#
    name    = models.TextField() # partner name
    logo    = models.TextField() # their logo
    phone   = models.TextField() # their phonenumber
    email   = models.TextField() # their support email (email a employee can contact)
    website = models.TextField() # thier website
    adress  = models.TextField() # thier adress
