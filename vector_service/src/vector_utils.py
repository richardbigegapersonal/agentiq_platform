import openai
import pinecone
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def embed_text(text):
    res = openai.Embedding.create(input=[text], model="text-embedding-3-small")
    return res['data'][0]['embedding']

def init_pinecone():
    pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment=os.getenv("PINECONE_ENVIRONMENT"))
    return pinecone.Index(os.getenv("PINECONE_INDEX_NAME"))
