# Cluster Updates UI

A PatternFly React application for managing cluster updates and upgrades.

## Features

- Cluster update management interface
- Preflight summary and checks
- Upgrade progress tracking
- Update overview and history
- Tips and tricks drawer

## Development

```bash
npm install
npm run start:dev
```

## Build

```bash
npm run build
```

## GitHub Pages Deployment

This repository is configured for GitHub Pages deployment. The application will be available at:
`https://kuklas.github.io/updates/`

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Push the `dist` folder to the `gh-pages` branch:
   ```bash
   git subtree push --prefix dist updates gh-pages
   ```

### Automatic Deployment via GitHub Actions

To enable automatic deployment, add the following workflow file to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then enable GitHub Pages in your repository settings:
1. Go to Settings > Pages
2. Select "GitHub Actions" as the source
3. The site will be automatically deployed on each push to main

## License

MIT
