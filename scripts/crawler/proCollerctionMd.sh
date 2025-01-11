#!/bin/bash

INPUT_FILE="issues.json"
OUTPUT_FILE="issues_data.md"

# Ensure jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq could not be found, please install it."
    exit 1
fi

# Create or clear the output file
echo "" > $OUTPUT_FILE

# Sort issues by number in ascending order and process each issue
jq 'sort_by(.number)' $INPUT_FILE | jq -r '.[] | 
    "## \(.number) \(.title)\n* created_at: \(.createdAt)\n* updated_at: \(.updatedAt)\n* labels: \([.labels[].name] | join(", "))\n* milestone: \(.milestone.title // "")\n\n\(.body)\n\n"' >> $OUTPUT_FILE

echo "Data saved to $OUTPUT_FILE"