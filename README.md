# AI FirstMove V3

A static GitHub Pages site for AI opportunities, interviews, hackathons, jobs, research cards and youth-friendly action plans.

## Automatic refresh

`.github/workflows/update-and-deploy.yml` runs every 6 hours, generates `assets/live-data.js`, and deploys the refreshed site to GitHub Pages in the same workflow.

## Required GitHub Pages setting

`Settings -> Pages -> Source: GitHub Actions`

The repository branch remains `main`.
