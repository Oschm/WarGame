# IBGame

This Repository contains a Fullstack App created using the MEAN Stack as a Proof of Concept and to drive forward knowledge about Open-Source Technologies.
Documentation can be found in https://ibsolution.sharepoint.com/:f:/r/sites/consulting/Cloud/Dokumente/SAP%20Themen%20%26%20Know-How/MEAN%20Stack?csf=1&web=1&e=HFyMME

# Commands Cheat Sheet
SignUp Page not yet implemented. when cloning use Postman API Call "signUp" to create new User.

## Backend
start local node server: node index.js

## start local mongdb
### create dircetory
cd C:\
md "\data\db"

### start mongodb from command line
"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\data\db"

### mongodb Compass connection string
mongodb://localhost:<Mongo Port>

## Frontend
run app locally
cd client
npm install
npm run serve


## heroku deployment
Important steps and code:
During Deployment build function in package.json in root is called. Express servers app in client/dist folder so vue app has to be built during deployment
After Deployment check if in Heroku has config var for MONGO_URL and set it to your mong instance