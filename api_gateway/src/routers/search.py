from fastapi import APIRouter
from query_vectors import search_similar_leads

router = APIRouter()

@router.post("/")
def search(query: str):
    results = search_similar_leads(query)
    return {"results": results}
