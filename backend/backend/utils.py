from passlib.hash import argon2
from django.conf import settings
import random
import base64
import json

def extractRequest(_req):
	return json.loads(_req.body.decode('utf-8'))

def encrypt(_x):
	return argon2.using(rounds = settings.ARGON_HASH_ROUNDS, salt = bytes(settings.ARGON_HASH_SALT, 'utf-8'), parallelism = settings.ARGON_HASH_PARALLELISM).hash(_x)

def verify(_x, _h):
	return argon2.using(rounds = settings.ARGON_HASH_ROUNDS, salt = bytes(settings.ARGON_HASH_SALT, 'utf-8'), parallelism = settings.ARGON_HASH_PARALLELISM).verify(_x, _h)

def storeImage(_data, _path):
	try:
		file_content=base64.b64decode(_data)
		with open(_path,"wb") as f:
			f.write(file_content)
		return True
	except:
		print("storeImage::utils : Error->('Could not store image' + path{" + _path +"})")
		return False

def genVerificationCode(_len = 5):
	ret = ""
	for i in range(_len):
		ret += str(random.randint(0,9))
	return ret
