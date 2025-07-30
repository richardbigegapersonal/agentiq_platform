import os
import stripe
from fastapi import APIRouter, Request, HTTPException, Depends
from auth import verify_clerk_token

router = APIRouter()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@router.post("/create-checkout-session")
def create_checkout_session(user=Depends(verify_clerk_token)):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "unit_amount": 1000,
                    "product_data": {"name": "Lead Credit"},
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url="https://agentiq.io/success",
            cancel_url="https://agentiq.io/cancel",
            metadata={"user_id": user["sub"]}
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    if event["type"] == "checkout.session.completed":
        user_id = event["data"]["object"]["metadata"]["user_id"]
        print(f"✅ Lead credit purchased by user {user_id}")

    return {"status": "success"}
