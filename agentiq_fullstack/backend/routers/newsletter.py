// newsletter.py (FastAPI route)
from fastapi import APIRouter, Request, HTTPException, status
from pydantic import BaseModel
from fastapi.responses import JSONResponse

router = APIRouter()

class NewsletterSignup(BaseModel):
    email: str

@router.post("/newsletter")
async def subscribe_to_newsletter(payload: NewsletterSignup):
    try:
        # Here you would integrate with Mailchimp, ConvertKit, etc.
        # For now, we mock successful subscription
        print(f"New subscriber: {payload.email}")
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Thanks for subscribing!"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
