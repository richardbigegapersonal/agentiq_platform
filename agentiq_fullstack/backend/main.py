from fastapi import FastAPI, HTTPException, Depends, Request
import requests, os
from dotenv import load_dotenv
from auth import verify_clerk_token
from stripe_routes import router as stripe_router

load_dotenv()

app = FastAPI()
app.include_router(stripe_router)

from routers import newsletter
app.include_router(newsletter.router, prefix="/api", tags=["Newsletter"])


API_GATEWAY_URL = os.getenv("API_GATEWAY_URL", "http://api-gateway:8000")
ENRICHER_URL = os.getenv("ENRICHER_URL", "http://enricher:8000")
VECTOR_URL = os.getenv("VECTOR_SERVICE_URL", "http://vector-service:8000")
AGENT_URL = os.getenv("AGENT_SERVICE_URL", "http://agent-service:8000")

@app.get("/")
def root():
    return {"message": "AgentIQ API is running"}

@app.get("/leads")
def get_leads(user=Depends(verify_clerk_token)):
    try:
        res = requests.get(f"{API_GATEWAY_URL}/leads/")
        return res.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/enrich/{lead_id}")
def enrich(lead_id: int, user=Depends(verify_clerk_token)):
    try:
        res = requests.post(f"{ENRICHER_URL}/enrich/{lead_id}")
        return res.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/search")
def search(query: str, user=Depends(verify_clerk_token)):
    try:
        res = requests.post(f"{VECTOR_URL}/search", json={"query": query})
        return res.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/agent/message")
def get_agent_message(prompt: str, user=Depends(verify_clerk_token)):
    try:
        res = requests.post(f"{AGENT_URL}/respond", json={"prompt": prompt})
        return res.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
