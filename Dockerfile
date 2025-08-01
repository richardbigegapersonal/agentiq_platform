# -------------------------------
# Base Image
# -------------------------------
FROM python:3.11-slim

# -------------------------------
# Install System Dependencies
# -------------------------------
RUN apt-get update && \
    apt-get install -y curl gcc libpq-dev nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# -------------------------------
# Set Base Working Directory
# -------------------------------
WORKDIR /app

# -------------------------------
# Copy All Code
# -------------------------------
COPY . /app

# -------------------------------
# Python Dependency Installation
# -------------------------------
RUN pip install --upgrade pip && \
    pip install -r agent_service/src/requirements.txt && \
    pip install -r api_gateway/src/requirements.txt && \
    pip install -r enricher/src/requirements.txt && \
    pip install -r lead_collector/src/requirements.txt && \
    pip install -r vector_service/src/requirements.txt && \
    pip install -r agentiq_fullstack/backend/requirements.txt

# -------------------------------
# Frontend: Next.js Build
# -------------------------------
WORKDIR /app/agentiq_fullstack/frontend

# Install Node.js dependencies and build Next.js
RUN npm install && npm run build

# -------------------------------
# Restore Default Workdir
# -------------------------------
WORKDIR /app

# -------------------------------
# Permissions & Startup
# -------------------------------
RUN chmod +x start.sh

# -------------------------------
# Expose Ports
# -------------------------------
EXPOSE 8000 8001 8002 8003 8500 3000

# -------------------------------
# Start Everything
# -------------------------------
CMD ["./start.sh"]
