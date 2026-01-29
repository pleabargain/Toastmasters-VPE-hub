<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1BrqQuLIAC521P2k6DZCq22_crYmgg2Eo

## Run Locally

**Prerequisites:**  Node.js


### Run Tests
To run the unit tests via Vitest:
`npm test`

## Startup Notes

### Blank Home Page
Upon initial startup or when clearing browser storage, the application may display a blank home page or dashboard. This occurs because the mock data layer initializes after the first load. 

**Solution:** Simply refresh the page (F5) to populate the local storage with mock data and display the initial records.

## Project Context
For detailed setup instructions and rules, refer to [AGENTS.md](AGENTS.md).
