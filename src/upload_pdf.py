import chromadb
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from src.database.models import Document
from src.database.database import SessionLocal
from fastapi import UploadFile
from src.utils.activity import log_activity
import tempfile
import os

# ==============================
# INITIALIZATION
# ==============================

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_collection(
    "research_papers"
)

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

CHUNK_SIZE = 1000


# ==============================
# PDF UPLOAD FUNCTION
# ==============================

async def upload_pdf(file: UploadFile,current_user):

    # Validate PDF

    if not file.filename.endswith(".pdf"):

        return {
            "success": False,
            "message": "Only PDF files are allowed."
        }

    # Save temporarily

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        content = await file.read()

        temp_file.write(content)

        temp_path = temp_file.name

    try:

        # Read PDF

        reader = PdfReader(temp_path)

        text = ""

        for page in reader.pages:

            extracted = page.extract_text()

            if extracted:

                text += extracted

        # Chunking

        chunks = []

        for i in range(
            0,
            len(text),
            CHUNK_SIZE
        ):

            chunk = text[i:i + CHUNK_SIZE]

            if len(chunk.strip()) > 50:

                chunks.append(chunk)

        # Embeddings

        embeddings = embedding_model.encode(
            chunks
        )

        # Current DB Count

        current_count = collection.count()

        ids = []

        metadatas = []

        for i in range(len(chunks)):

            ids.append(
                str(current_count + i)
            )

            metadatas.append(
                {
                    "paper": file.filename,
                    "chunk_id": i
                }
            )

        # Store

        collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings.tolist(),
            metadatas=metadatas
        )

        db = SessionLocal()

        # Save PDF info in MySQL

        new_document = Document(
            user_id = current_user.id,
            paper_name=file.filename
        )

        db.add(new_document)

        db.commit()

        return {

            "success": True,

            "paper": file.filename,

            "chunks_added":
            len(chunks)
        }

    finally:

        if os.path.exists(temp_path):

            os.remove(temp_path)