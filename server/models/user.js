const url = process.env.MONGO_URL; // Connection URL
const db = require('monk')(url);
const _ = require('lodash');

db.on('timeout', () => {
    console.log("timeout");
});

if (!db) {
    console.log('no connection');
}



var User = {};
const UserCollection = db.get('User');
//making sure that email is a unique field
UserCollection.createIndex("email", {
    unique: true
});

const Joi = require('joi');


const userSchema = Joi.object({
    firstName: Joi.string().required(),

    lastName: Joi.string().required(),

    email: Joi.string().email().required(),

    createdOn: Joi.date().default(function () {
        return new Date();
    })
});

User.validate = async function (userObject) {
    return await userSchema.validateAsync(userObject);

};

User.create = async function (data) {
    try {
        return await UserCollection.insert(data);
    } catch (error) {
        console.log(`User create Error: ${JSON.stringify(error)}`);
        throw Error(error);
    }
};
User.getById = async function (userId) {
    var userArray = await UserCollection.find({
        "_id": userId
    });
    if (_.size(userArray) === 1) {
        return userArray[0];
    } else {
        throw Error("User does not exist");
    }
}

User.getByUserName = async function (userName) {
    var userArray = await UserCollection.find({
        "email": userName
    });
    if (_.size(userArray) === 1) {
        return userArray[0];
    } else {
        throw Error("User does not exist");
    }
}

//if columns are specified only this columns are returned
User.getAll = async function (columns = []) {
    console.log(`Get All Users from DB with specified Columns: ${columns}`)
    let config = {};
    if (_.size(columns) >= 1) {
        config.fields = {};
        _.each(columns, function (columnName) {
            config.fields[columnName] = 1;
        });
    }
    console.log(`Config: ${JSON.stringify(config)}`);
    return await UserCollection.find({}, config);
}

module.exports = User;