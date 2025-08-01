#!/bin/bash

# Start all Python services
echo "Starting Agent Service..."
python agent_service/src/main.py &

echo "Starting API Gateway..."
python api_gateway/src/main.py &

echo "Starting Enricher..."
python enricher/src/main.py &

echo "Starting Lead Collector..."
python lead_collecter/src/main.py &

echo "Starting Vector Service..."
python vector_service/main.py &

echo "Starting Backend (Fullstack)..."
python agent_fullstack/backend/main.py &

# Start Next.js frontend (built version)
echo "Starting Next.js Frontend..."
cd agent_fullstack/frontend
npm run start &

# Return to base directory
cd ../../..

# Wait for all services to complete (or until container is stopped)
wait
