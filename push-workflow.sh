#!/bin/bash
# Script to push workflow file to GitHub

echo "Attempting to push workflow file to GitHub..."

# Check if we can push directly
git push updates ai_enabled:main 2>&1 | tee /tmp/push-output.txt

if grep -q "workflow" /tmp/push-output.txt; then
    echo ""
    echo "⚠️  Cannot push workflow files directly due to OAuth permissions."
    echo ""
    echo "Please use one of these methods:"
    echo ""
    echo "Method 1: Use GitHub CLI (if installed):"
    echo "  gh auth login"
    echo "  gh repo view kuklas/updates --web"
    echo "  # Then create the file via web interface"
    echo ""
    echo "Method 2: Manual creation via GitHub web:"
    echo "  1. Go to: https://github.com/kuklas/updates/new/main"
    echo "  2. In the filename box, type: .github/workflows/deploy.yml"
    echo "  3. Copy the content from .github/workflows/deploy.yml"
    echo "  4. Click 'Commit new file'"
    echo ""
    echo "Method 3: Use GitHub API (requires personal access token with workflow scope):"
    echo "  # You'll need to create a personal access token with 'workflow' scope"
    echo "  # Then use: git remote set-url updates https://YOUR_TOKEN@github.com/kuklas/updates.git"
    echo ""
else
    echo "✅ Successfully pushed workflow file!"
fi

rm -f /tmp/push-output.txt

