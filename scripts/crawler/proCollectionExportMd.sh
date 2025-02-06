#!/bin/bash

REPO="pro-collection/interview-question"
OUTPUT_FILE_JSON="issues_data.json"
OUTPUT_FILE_MD="issuesData.md"
META_FILE="meta.json"

# Ensure GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
    echo "Error: GH_TOKEN environment variable is not set"
    exit 1
fi

# Configure GitHub CLI token
echo "$GH_TOKEN" | gh auth login --with-token

# Read the latest export time from meta.json
LATEST_EXPORT_TIME=$(jq -r '.interview_question.LATEST_EXPORT_TIME' $META_FILE)
LATEST_EXPORT_DATE=$(date -jf "%Y-%m-%dT%H:%M:%SZ" "$LATEST_EXPORT_TIME" +"%Y-%m-%d")

# Create CSV headers
echo "issue_number,title,body,state,created_at,updated_at,closed_at,author,labels,milestone,comments" > $OUTPUT_FILE_JSON

echo "Fetching issues created since $LATEST_EXPORT_DATE..."
issues=$(GH_TOKEN=$GH_TOKEN gh issue list -R $REPO --state all --json number,title,body,state,createdAt,updatedAt,closedAt,author,labels,milestone,comments --search "created:>=$LATEST_EXPORT_DATE" --limit 1040)
echo $issues > $OUTPUT_FILE_JSON
echo "Data saved to $OUTPUT_FILE_JSON"

# Sort issues by number in ascending order and process each issue
jq 'sort_by(.number)' $OUTPUT_FILE_JSON | jq -r '.[] | 
    "## \(.number) \(.title)\n* created_at: \(.createdAt)\n* updated_at: \(.updatedAt)\n* labels: \([.labels[].name] | join(", "))\n* milestone: \(.milestone.title // "")\n\n\(.body)\n\n"' > $OUTPUT_FILE_MD

# Update the latest export time in meta.json
CURRENT_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
jq --arg time "$CURRENT_TIME" '.interview_question.LATEST_EXPORT_TIME = $time' $META_FILE > tmp.$$.json && mv tmp.$$.json $META_FILE

# Output the range of incrementally exported issues
START_ISSUE=$(jq -r '.[0].number' $OUTPUT_FILE_JSON)
END_ISSUE=$(jq -r '.[-1].number' $OUTPUT_FILE_JSON)
echo "Incrementally exported issues from $START_ISSUE to $END_ISSUE"

# Cleanup
echo "Data saved to $OUTPUT_FILE_MD"