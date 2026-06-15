from fastapi import FastAPI
from pydantic import BaseModel
# upload

from fastapi import UploadFile, File
from src.upload_pdf import upload_pdf

# diffrent features 

from src.features.rag import ask_question
from src.features.topic_explorer import explore_topic
from src.features.literature_review import generate_review
from src.features.research_gap import find_research_gaps
from src.features.summarize_paper import summarize_paper
from src.features.compare_papers import compare_papers
# database
from src.database.database import engine
from src.database.models import User
from src.database.database import Base

Base.metadata.create_all(
    bind=engine
)

# for signup
from src.database.schemas import UserSignup
from src.database.models import User
from src.database.database import SessionLocal
from src.utils.security import hash_password

# for login 

from src.database.schemas import UserLogin
from src.utils.security import verify_password
from src.utils.auth import create_access_token

# for jwt authentication
from fastapi import Depends
from src.utils.dependencies import get_current_user

# for getting databases

from src.database.models import Document,ActivityLog

# for frontend 

from fastapi.middleware.cors import CORSMiddleware

# for activity logs 
from src.utils.activity import log_activity
from src.features.literature_review import generate_review
from src.database.schemas import (
    TopicRequest,
    LiteratureReviewRequest,
    ResearchGapRequest
)


class SummaryRequest(BaseModel):

    paper_name: str

class CompareRequest(BaseModel):

    paper1: str

    paper2: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):

    question: str


@app.get("/")
def home():

    return {
        "message":
        "AI Research Explorer API Running"
    }


@app.post("/query")
def query(
    request: QueryRequest,
    current_user=Depends(
        get_current_user
    )
):

    result = ask_question(
        request.question
    )

    log_activity(
        current_user.id,
        f"Asked: {request.question}"
    )

    return result

@app.post("/topic")
def topic(
    request: TopicRequest,
    current_user=Depends(
        get_current_user
    )
):

    result = explore_topic(
        request.topic
    )

    log_activity(
        current_user.id,
        f"Explored topic: {request.topic}"
    )

    return result

@app.post("/literature-review")
def literature_review(
    request: LiteratureReviewRequest,
    current_user=Depends(
        get_current_user
    )
):

    result = generate_review(
        request.topic
    )

    log_activity(
        current_user.id,
        f"Generated literature review for {request.topic}"
    )

    return result

@app.post("/research-gap")
def research_gap(
    request: ResearchGapRequest,
    current_user=Depends(
        get_current_user
    )
):

    result = find_research_gaps(
    request.topic
)

    log_activity(
        current_user.id,
        f"Generated research gaps for {request.topic}"
    )

    return result

@app.post("/summarize")
def summarize(
    request: SummaryRequest,
    current_user=Depends(
        get_current_user
    )
):

    result = summarize_paper(
        request.paper_name
    )

    log_activity(
        current_user.id,
        f"Generated summary for {request.paper_name}"
    )

    return result

@app.post("/compare")
def compare(
    request: CompareRequest,
    current_user=Depends(
        get_current_user
    )
):

    result = compare_papers(
        request.paper1,
        request.paper2
    )

    log_activity(
        current_user.id,
        f"Compared {request.paper1} and {request.paper2}"
    )

    return result


@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    current_user=Depends(
        get_current_user
    )
):

    result = await upload_pdf(file,current_user)

    log_activity(
        current_user.id,
        f"Uploaded {file.filename}"
    )

    return result


@app.post("/signup")
def signup(user: UserSignup):

    db = SessionLocal()

    if not user.username.strip():

        return {
            "success": False,
            "message": "Username required"
        }

    if not user.email.strip():

        return {
            "success": False,
            "message": "Email required"
        }

    if not user.password.strip():

        return {
            "success": False,
            "message": "Password required"
        }

    # Check Email

    existing_email = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_email:

        return {
            "success": False,
            "message": "Email already exists"
        }

    # Check Username

    existing_username = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_username:

        return {
            "success": False,
            "message": "Username already exists"
        }

    try:

        new_user = User(

            username=user.username,

            email=user.email,

            password_hash=hash_password(
                user.password
            )
        )

        db.add(new_user)

        db.commit()

        db.refresh(new_user)

        return {
            "success": True,
            "message": "User created successfully",
            "user_id": new_user.id
        }

    except Exception as e:

        db.rollback()

        return {
            "success": False,
            "message": str(e)
        }

    finally:

        db.close()

@app.post("/login")
def login(user: UserLogin):

    db = SessionLocal()
    if not user.email.strip():

        return {
            "success": False,
            "message": "Email required"
        }

    if not user.password.strip():

        return {
            "success": False,
            "message": "Password required"
        }

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        return {
            "success": False,
            "message": "User not found"
        }

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):

        return {
            "success": False,
            "message": "Invalid password"
        }

    access_token = create_access_token(
        {
            "sub": existing_user.email,
            "user_id": existing_user.id
        }
    )

    return {

        "success": True,

        "access_token":
        access_token,

        "token_type":
        "bearer"
    }

@app.get("/my-documents")
def my_documents(
    current_user=Depends(
        get_current_user
    )
):

    db = SessionLocal()

    try:

        documents = db.query(
            Document
        ).filter(
            Document.user_id ==
            current_user.id
        ).all()

        return [
            {
                "id": doc.id,
                "paper_name": doc.paper_name
            }
            for doc in documents
        ]

    finally:

        db.close()

@app.get("/activity")
def get_activity(
    current_user=Depends(
        get_current_user
    )
):

    db = SessionLocal()

    try:

        activities = db.query(
            ActivityLog
        ).filter(
            ActivityLog.user_id ==
            current_user.id
        ).all()

        return [
            {
                "id": activity.id,
                "action": activity.action
            }
            for activity in activities
        ]

    finally:

        db.close()