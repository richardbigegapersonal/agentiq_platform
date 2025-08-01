#!/bin/bash

# === Configuration ===
LOCAL_REPO_PATH=""
REMOTE_REPO="https://github.com/richardbigegapersonal/agentiq_platform.git"
BRANCH="main"

# === Step-by-step ===

# Move to the repo
cd "$LOCAL_REPO_PATH" || exit 1

# Initialize Git if needed
if [ ! -d ".git" ]; then
    git init
    git branch -m "$BRANCH"
    git remote add origin "$REMOTE_REPO"
fi

# Set up LFS if needed
if ! git lfs > /dev/null 2>&1; then
    echo "Installing Git LFS..."
    git lfs install
fi

# Track large file extensions (edit as needed)
git lfs track "*.pt" "*.h5" "*.onnx" "*.tar" "*.tar.gz"

# Add LFS rules to Git
git add .gitattributes

# Add everything except ignored files
git add .

# Commit
git commit -m "Initial commit of LeadIQ-AI platform"

# Push to GitHub
git push -u origin "$BRANCH"
