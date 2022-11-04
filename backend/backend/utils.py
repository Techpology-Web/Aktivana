import json

def extractRequest(_req):
    return json.loads(_req.body.decode('utf-8'))

def encrypt(_x):
    return argon2.using(rounds = settings.ARGON_HASH_ROUNDS, salt = bytes(settings.ARGON_HASH_SALT, 'utf-8'), parallelism = settings.ARGON_HASH_PARALLELISM).hash(_x)