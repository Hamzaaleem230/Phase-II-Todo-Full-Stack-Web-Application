from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import Optional
from uuid import UUID

from app.core.config import JWT_SECRET_KEY

# This is not a real OAuth2 server, so we just use a placeholder tokenUrl.
# For actual authentication (signup/signin), it will be handled by Better Auth.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_jwt_token(token: str = Depends(oauth2_scheme)) -> UUID:
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decode the JWT using the secret key
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        # You might also want to verify 'email' claim here if needed
        return UUID(user_id)
    except JWTError:
        raise credentials_exception

def get_current_user_id(user_id: UUID = Depends(verify_jwt_token)) -> UUID:
    return user_id