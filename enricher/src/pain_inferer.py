import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def infer_pain_points(title, industry):
    prompt = f"What are 3 common pain points for someone working as {title} in the {industry} industry?"
    try:
        res = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        return res.choices[0].message.content.strip()
    except Exception as e:
        print("OpenAI error:", e)
        return None
