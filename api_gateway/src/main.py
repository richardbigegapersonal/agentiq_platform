from fastapi import FastAPI
from routers import leads, enrich, search

app = FastAPI()

app.include_router(leads.router, prefix="/leads", tags=["Leads"])
app.include_router(enrich.router, prefix="/enrich", tags=["Enrichment"])
app.include_router(search.router, prefix="/search", tags=["Search"])


