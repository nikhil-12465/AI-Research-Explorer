from jose import jwt, JWTError
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from src.database.database import SessionLocal
from src.database.models import User
from src.utils.auth import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid Token"
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get(
            "user_id"
        )

        if user_id is None:

            raise credentials_exception

    except JWTError:

        raise credentials_exception

    db = SessionLocal()

    try:

        user = db.query(
            User
        ).filter(
            User.id == user_id
        ).first()

        if user is None:

            raise credentials_exception

        return user

    finally:

        db.close()