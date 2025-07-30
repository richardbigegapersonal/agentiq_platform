from vector_utils import embed_text, init_pinecone

def search_similar_leads(query):
    vector = embed_text(query)
    index = init_pinecone()
    results = index.query(vector=vector, top_k=5, include_metadata=True)
    return results["matches"]
