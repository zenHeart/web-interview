#!/bin/bash

REPO="pro-collection/interview-question"
OUTPUT_FILE="issues_data.csv"
# Ensure GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
    echo "Error: GH_TOKEN environment variable is not set"
    exit 1
fi

# Configure GitHub CLI token
echo "$GH_TOKEN" | gh auth login --with-token

# Create CSV headers
echo "issue_number,title,body,state,created_at,updated_at,closed_at,author,labels,milestone,comments" > $OUTPUT_FILE

echo "Fetching all issues..."
issues=$(GH_TOKEN=$GH_TOKEN gh issue list -R $REPO --state all --json number,title,body,state,createdAt,updatedAt,closedAt,author,labels,milestone,comments --limit 1040)
echo $issues > issues.json
echo "Data saved to $OUTPUT_FILE"