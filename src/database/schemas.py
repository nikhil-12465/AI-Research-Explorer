from pydantic import BaseModel,Field

class UserSignup(BaseModel):

    username: str = Field(
        min_length=3
    )

    email: str = Field(
        min_length=5
    )

    password: str = Field(
        min_length=6
    )

class UserLogin(BaseModel):

    email: str = Field(
        min_length=5
    )

    password: str = Field(
        min_length=6
    )

class TopicRequest(BaseModel):
    topic: str

class LiteratureReviewRequest(BaseModel):
    topic: str

class ResearchGapRequest(BaseModel):
    topic: str

class CompareRequest(BaseModel):
    paper1: str
    paper2: str

class SummarizeRequest(BaseModel):
    paper_name: str