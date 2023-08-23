## BV

### Github Workflow
- Create branch: `dev/<feature>`
- Create pull request: `[module] <description>`
- Merge pull request: Squash and Merge

### Document
- UI: https://whimsical.com/ui-x24zYaLyib3wxZNk7MxxG

### Build
- Ensure `frontend/.env` has `REACT_APP_BASE_URL=/api`
- Frontend: `cd frontend; npm run build` the output dir is `./frontend/build`
- Backend: `cd backend; npm run build` the output dir is `./backend/dist`

### Production
- Ensure configuration in `backend/.env`
- `cd backend; pm2 start --name bv npm -- run prod`
- Save pm2 state: `pm2 save`
- Enable pm2 on startup: `pm2 startup`
- Other pm2 commands: `pm2 list`, `pm2 restart bv`, `pm2 stop bv`
