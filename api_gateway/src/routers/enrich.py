from fastapi import APIRouter
from enrich_leads import enrich_all

router = APIRouter()

@router.post("/")
def trigger_enrichment():
    enrich_all()
    return {"message": "Enrichment triggered"}
