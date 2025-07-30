import os
import requests

def enrich_email(name, domain):
    api_key = os.getenv("HUNTER_API_KEY")
    if not api_key:
        return None

    url = f"https://api.hunter.io/v2/email-finder?domain={domain}&full_name={name}&api_key={api_key}"
    response = requests.get(url).json()
    return response.get("data", {}).get("email")
