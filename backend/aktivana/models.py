from django.db import models

# Create your models here.

class Partner (models.Model):

    name    = models.TextField()
    logo    = models.TextField()
    phone   = models.TextField()
    email   = models.TextField()
    website = models.TextField()
    adress  = models.TextField()
