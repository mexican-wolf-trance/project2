var mongoose = require("mongoose");

var mongoDB = "https://jsonplaceholder.typicode.com";

const makeMongoQuery = async (model, parameter) => {
    mongoose.connect(mongoDB);

    const response = model.find().exec();
    console.log("response?");
    mongoose.disconnect();

    return response;
};

module.exports = makeMongoQuery;