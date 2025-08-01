#!/bin/bash

# Enable job control
set -m

# Function for colored logs
log() {
  echo -e "\033[1;32m$1\033[0m"
}

# Start Python services
log "Starting Agent Service..."
python agent_service/src/main.py &

log "Starting API Gateway..."
python api_gateway/src/main.py &

log "Starting Enricher..."
python enricher/src/main.py &

log "Starting Lead Collector..."
python lead_collector/src/main.py &

log "Starting Vector Service..."
python vector_service/main.py &

log "Starting Backend (Fullstack)..."
python agent_fullstack/backend/main.py &

# Start Next.js frontend
log "Starting Next.js Frontend..."
cd agent_fullstack/frontend
npm run start &

# Return to root directory
cd ../../

# Keep container running
log "All services started. Waiting for processes..."
wait
