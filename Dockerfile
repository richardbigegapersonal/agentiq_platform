FROM python:3.11-slim

# Install system packages
RUN apt-get update && \
    apt-get install -y curl gcc libpq-dev npm nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy all code
COPY . /app

# Install Python requirements for all services
RUN pip install --upgrade pip
RUN pip install -r agent_service/src/requirements.txt
RUN pip install -r api_gateway/src/requirements.txt
RUN pip install -r enricher/src/requirements.txt
RUN pip install -r lead_collecter/src/requirements.txt
RUN pip install -r vector_service/requirements.txt
RUN pip install -r agent_fullstack/backend/requirements.txt


# Install and build frontend (Next.js)
WORKDIR /app/agent_fullstack/frontend
RUN npm install && npm run build

# Return to base workdir
WORKDIR /app

# Make startup script executable
RUN chmod +x start.sh

# Expose relevant ports
EXPOSE 8000 8001 8002 8003 8500 3000

# Run startup script
CMD ["./start.sh"]
