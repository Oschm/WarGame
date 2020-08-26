const url = process.env.MONGO_URL; // Connection URL
const db = require('monk')(url);

db.on('timeout', () => {
    console.log("timeout");
})

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

User.getAll = async function () {
    return await UserCollection.find({});
}

module.exports = User;