# -------------------------------
# Base Image
# -------------------------------
FROM python:3.11-slim

# -------------------------------
# Build Args for Clerk Keys
# -------------------------------
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY

# Expose as Environment Variables
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

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

# Inject Clerk keys into Next.js at build time
RUN echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" >> .env && \
    echo "CLERK_SECRET_KEY=$CLERK_SECRET_KEY" >> .env

# Install and build
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
