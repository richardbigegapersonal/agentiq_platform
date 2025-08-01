// auth.py
from fastapi import Request, HTTPException
from jose import jwt
import os

# Clerk environment variables
CLERK_JWT_ISSUER = os.getenv("CLERK_JWT_ISSUER", "https://clerk.your-domain.com")
CLERK_JWT_PUBLIC_KEY = os.getenv("CLERK_JWT_PUBLIC_KEY")

# Token verification utility
def verify_clerk_token(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    token = token.replace("Bearer ", "")
    try:
        payload = jwt.decode(
            token,
            CLERK_JWT_PUBLIC_KEY,
            algorithms=["RS256"],
            issuer=CLERK_JWT_ISSUER
        )
        return payload
    except Exception as e:
        raise HTTPException(status_code=403, detail=f"Invalid token: {str(e)}")

