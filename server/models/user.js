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
    return await UserCollection.insert(data);
};
User.getById = async function (userId) {
    var userArray = await UserCollection.find({
        "_id": userId
    });
    if (_.size(userArray) === 1) {
        return userArray[0];
    } else {
        throw Error("User not in DB");
    }
}

User.getAll = async function () {
    return await UserCollection.find({});
}

module.exports = User;