# WarGame

# Commands Cheat Sheet

## Backend
start local node server = node index.js

## start local mongdb
### create dircetory
cd C:\
md "\data\db"

### start mongodb from command line
"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\data\db"



### start server
In server folder
node index.js

## Frontend
run app locally
cd client
npm install
npm run serve


## heroku deployment
Important steps and code:
During Deployment build function in package.json in root is called. Express servers app in client/dist folder so vue app has to be built during deployment