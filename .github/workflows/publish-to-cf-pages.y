on: [push]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    name: Publish to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Install NPM
        uses: actions/setup-node@v3
        with:
          node-version-file: '.node-version'
      - name: CI
        run: npm ci
      - name: Build
        run: npm run build
      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: 83ce02eace8e2ea8d079ea56adf88e1e
          projectName: fabrhq-blog
          directory: public
          branch: main
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}