import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_collection("research_papers")

model = SentenceTransformer("all-MiniLM-L6-v2")

query = "What is ReAct?"

query_embedding = model.encode(query)

results = collection.query(
    query_embeddings=[query_embedding.tolist()],
    n_results=3
)

print(results["documents"])
