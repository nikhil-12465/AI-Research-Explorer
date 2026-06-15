import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="research_papers"
)

model = SentenceTransformer("all-MiniLM-L6-v2")

chunks = [
    "ReAct combines reasoning and acting.",
    "RAG retrieves documents before answering.",
    "Vision Transformers use self-attention."
]

embeddings = model.encode(chunks)

for i, chunk in enumerate(chunks):

    collection.add(
        ids=[str(i)],
        embeddings=[embeddings[i].tolist()],
        documents=[chunk],
        
    )

print("Stored Successfully!")