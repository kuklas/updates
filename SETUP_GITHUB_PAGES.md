# Setup GitHub Pages - Quick Guide

The workflow file is ready at: `.github/workflows/deploy.yml`

## Step 1: Add the Workflow File

**Option A: Via GitHub Web Interface (Recommended)**

1. Open: https://github.com/kuklas/updates/new/main
2. In the filename box, type: `.github/workflows/deploy.yml`
3. Copy the content from `.github/workflows/deploy.yml` in this repo
4. Paste it into the editor
5. Click "Commit new file"

**Option B: Via Command Line (if you have proper permissions)**

```bash
# Make sure you're authenticated with proper scopes
gh auth refresh -s workflow

# Then push
git push updates ai_enabled:main
```

## Step 2: Enable GitHub Pages

1. Go to: https://github.com/kuklas/updates/settings/pages
2. Under "Source", select **"GitHub Actions"**
3. Click "Save"

## Step 3: Verify Deployment

After the workflow runs (it will trigger automatically on the next push to main), your site will be available at:
- **https://kuklas.github.io/updates/**

## Workflow File Content

The workflow file content is in: `.github/workflows/deploy.yml`

It will:
- Build your app on every push to `main`
- Deploy to GitHub Pages automatically
- Use the `/updates/` base path (already configured in webpack)

