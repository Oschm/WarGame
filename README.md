# WarGame

# Commands Cheat Sheet
SignUp Page npot yet implemented. when cloning use Postman API Call to create a User and then login
## Backend
start local node server = node index.js

## start local mongdb
### create dircetory
cd C:\
md "\data\db"

### start mongodb from command line
"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\data\db"

### mongodb Compass connection string
mongodb://mongodb0.example.com:<Mongo Port>

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
After Deployment check if in Heroku has config var for MONGO_URL and set it to your mong instance