const express = require("express");
//const bodyParser = require("../../lib/middleware/bodyParser");
const mongoose = require("mongoose");

const dataURL = "mongodb://127.0.0.1:27017/data"

const allPosts = mongoose.model("allposts", {
    userId: Number,
    id: Number,
    title: String,
    body: String
})

const users = mongoose.model("users", {
    id: Number,
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    company: {
        name: String,
        catchphrase: String,
        bs: String,
    }
})

const getAllPosts = async (req, res) => {
    try {
        mongoose.connect(dataURL, { useNewUrlParser: true });
        const results = await allPosts.find().exec();
        mongoose.disconnect();

        res.send(results);
    }
    catch (error) {
        mongoose.disconnect();

        console.log(error);
        res.status(500);
        res.send(error);
    }
}
const getUserPost = async (req, res) => {
    var userPosts = []
    try {
        mongoose.connect(dataURL, { useNewUrlParser: true });
        const postResults = await allPosts.find().exec();
        mongoose.disconnect();

        mongoose.connect(dataURL, { useNewUrlParser: true })
        const userResults = await users.find().exec();

        while (postResults.userId) {
            if (postResults.userId === userResults.userId)
                userPosts = postResults.body
        }
        mongoose.disconnect();

        res.send(userPosts)
    }
    catch (error) {
        mongoose.disconnect();
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
};

const getPostIdPost = async (req, res) => {
    try {
        mongoose.connect(dataURL, { useNewUrlParser: true });
        const results = await allPosts.find({
            id: req.params.id,
        }).exec();
        mongoose.disconnect();

        res.send(results.body);
    }
    catch (error) {
        mongoose.disconnect();
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
};

const getUserName = async (req, res) => {
    try {
        mongoose.connect(dataURL, { useNewUrlParser: true });
        const results = await users.find({
            username: req.params.username,
        }).exec();
        mongoose.disconnect();

        res.send(results.name);
    }
    catch (error) {
        mongoose.disconnect();
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
}

const mongoRouter = express.Router();

mongoRouter.route("/posts").get(getAllPosts);

mongoRouter.route("/:username").get(getUserPost);

mongoRouter.route("/:id").get(getPostIdPost);

mongoRouter.route("/:username").get(getUserName);


module.exports = mongoRouter