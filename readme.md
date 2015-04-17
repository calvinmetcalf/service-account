# service account


Wrapper around
[google-auth2-service-account](https://github.com/jcblw/google-oauth2-service-account)
to make it easier to use.

# API

## serviceAccount(key, email, scope, [callback]);

Takes the private key, client email, scope and optionally a callback.
Resolves to the auth token. If a callback is omitted it returns a promise.

## serviceAccount(jsonKey, scope, [callback]);

Alternatively pass it the (parsed) json key you got from the google console
