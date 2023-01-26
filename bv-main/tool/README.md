# command pm2 schedule restart 23h11 every night
pm2 start main.js --name backup --cron-restart="11 23 * * *" --watch