#!/bin/bash

# Extract version from package.json
PACKAGE_VERSION=$(jq -r '.version' package.json)

# Check if app.jsn exists and update it
if [[ -f "app.json" ]]; then
    UPDATED_APP_JSON=$(jq --arg newVersion "$PACKAGE_VERSION" '.expo.version = $newVersion' app.json)
    echo "$UPDATED_APP_JSON" > app.json
    echo "✅ Updated app.json to version $PACKAGE_VERSION"

elif [[ -f "app.config.js" ]]; then
    sed -i'' -E "s/version: \"[0-9]+\.[0-9]+\.[0-9]+\"/version: \"$PACKAGE_VERSION\"/" app.config.js
    echo "✅ Updated app.config.js to version $PACKAGE_VERSION"

elif [[ -f "app.config.ts" ]]; then
    sed -i'' -E "s/version: \"[0-9]+\.[0-9]+\.[0-9]+\"/version: \"$PACKAGE_VERSION\"/" app.config.ts
    echo "✅ Updated app.config.ts to version $PACKAGE_VERSION"

else
    echo "❌ Error: No app.json, app.config.js, or app.config.ts found."
    exit 1
fi
