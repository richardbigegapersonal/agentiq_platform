# Use a multi-language capable base image
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y curl gcc libpq-dev npm nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy all source files
COPY . /app

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r agent_service/src/requirements.txt && \
    pip install -r api_gateway/src/requirements.txt && \
    pip install -r enricher/src/requirements.txt && \
    pip install -r lead_collecter/src/requirements.txt && \
    pip install -r vector_service/requirements.txt && \
    pip install -r agent_fullstack/backend/requirements.txt

# Install frontend dependencies
WORKDIR /app/agent_fullstack/frontend
RUN npm install

# Return to base workdir
WORKDIR /app

# Make start script executable
RUN chmod +x start.sh

# Expose all relevant ports (adjust as needed)
EXPOSE 8000 8001 8002 8003 8500 3000

# Start all services
CMD ["./start.sh"]
