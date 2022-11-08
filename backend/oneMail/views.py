from django.http import HttpResponse
from django.conf import settings

import smtplib

class emailHandler:
	def __init__(self):
		self.serverName	= "mailout.one.com"
		self.port		= 587
		self.email		= settings.ONE_EMAIL
	
	def sendEmail(self, _to, _subj, _msg):
		_smtp = smtplib.SMTP(self.serverName, self.port)
		_smtp.ehlo()
		_smtp.starttls()
		_smtp.login(self.email, settings.ONE_PASSW)
		_smtp.sendmail(self.email, _to, _msg)
		_smtp.quit()
