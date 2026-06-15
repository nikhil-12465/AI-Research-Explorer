import os
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
import chromadb

# SETTINGS

DATA_FOLDER = "data"
CHUNK_SIZE = 1000

# CHROMADB

client = chromadb.PersistentClient(path="./chroma_db")

try:
    client.delete_collection("research_papers")
except:
    pass

collection = client.create_collection("research_papers")

# EMBEDDING MODEL

model = SentenceTransformer("all-MiniLM-L6-v2")

# READ PDFs


all_chunks = []
all_ids = []
all_metadata = []

chunk_id = 0

for root, dirs, files in os.walk(DATA_FOLDER):

    for file in files:

        if file.endswith(".pdf"):

            pdf_path = os.path.join(root, file)

            print(f"Reading: {file}")

            try:

                reader = PdfReader(pdf_path)

                text = ""

                for page in reader.pages:

                    extracted = page.extract_text()

                    if extracted:
                        text += extracted

                # Chunking
                for i in range(0, len(text), CHUNK_SIZE):

                    chunk = text[i:i + CHUNK_SIZE]

                    if len(chunk.strip()) > 50:

                        all_chunks.append(chunk)

                        all_ids.append(str(chunk_id))

                        all_metadata.append({
                             "paper": file,
                            "chunk_id": chunk_id
                        })

                        chunk_id += 1

            except Exception as e:

                print("Error:", file, e)


# EMBEDDINGS

print(f"\nTotal Chunks: {len(all_chunks)}")

embeddings = model.encode(all_chunks)

# STORE IN CHROMADB

collection.add(
    ids=all_ids,
    documents=all_chunks,
    embeddings=embeddings.tolist(),
    metadatas=all_metadata
)

print("Vector Database Created Successfully!")

