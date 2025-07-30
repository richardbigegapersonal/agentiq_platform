from playwright.sync_api import sync_playwright
from dotenv import load_dotenv
import os
import time

load_dotenv()

EMAIL = os.getenv("LINKEDIN_EMAIL")
PASSWORD = os.getenv("LINKEDIN_PASSWORD")

def login_and_scrape_leads():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        print("Logging in...")
        page.goto("https://www.linkedin.com/login")
        page.fill("input[name='session_key']", EMAIL)
        page.fill("input[name='session_password']", PASSWORD)
        page.click("button[type='submit']")

        # Wait and navigate to Navigator Search
        page.wait_for_url("https://www.linkedin.com/feed/")
        page.goto("https://www.linkedin.com/sales/search/people")

        time.sleep(5)  # Let it load

        # Example: extract first 10 profiles
        leads = []
        for card in page.query_selector_all(".artdeco-entity-lockup__title a")[:10]:
            link = card.get_attribute("href")
            leads.append({"profile_url": link})

        print("Leads:", leads)

        context.close()
        browser.close()
