FROM python:3.11-slim

WORKDIR /app
COPY ./src /app

RUN pip install --no-cache-dir playwright python-dotenv sqlalchemy psycopg2-binary

RUN playwright install

CMD ["python", "main.py"]
