const express = require("express");
const bodyParser = require("../lib/middleware/bodyParser");
const mongoose = require("mongoose");

const dataURL = "mongodb://127.0.0.1:27017/jpl";

const allPosts = mongoose.model("posts", {
    userId: Number,
    id: Number,
    title: String,
    body: String
});

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
});

const getAllPosts = async (req, res) =>
{
    try
    {
        mongoose.connect(dataURL);
        const results = await allPosts.find().exec();
        mongoose.disconnect();

        console.log(results)
        res.send(results);
    }
    catch (error)
    {
        mongoose.disconnect();

        console.log(error);
        res.status(500);
        res.send(error);
    }
}
const getUserPost = async (req, res) =>
{
    try
    {
        mongoose.connect(dataURL, {
            poolSize: 100,
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const userResults = await users.find({
            username: req.params.username,
        }).exec();
        const userid = userResults[0].id;
        const postResults = await allPosts.find({ userId: userid }).exec();

        mongoose.disconnect();

        res.send(postResults)
    }
    catch (error)
    {
        mongoose.disconnect();
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
};

const getPostIdPost = async (req, res) =>
{
    try
    {
        mongoose.connect(dataURL, {
            poolSize: 100,
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const results = await allPosts.find({
            id: req.params.id,
        }).exec();
        mongoose.disconnect();

        res.send(results);
    }
    catch (error)
    {
        mongoose.disconnect();
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
};

const getUserName = async (req, res) =>
{
    try
    {
        mongoose.connect(dataURL, {
            poolSize: 100,
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const results = await users.find({
            username: req.params.username,
        }).exec();
        mongoose.disconnect();

        res.send(results);
    }
    catch (error)
    {
        mongoose.disconnect();
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
}

const addPost = async(req, res) =>
{
    var y;
    try
    {
        mongoose.connect(dataURL, {
            poolSize: 100,
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const userResults = await users.find({
            username: req.params.username,
        }).exec();
        //const userid = userResults[0].id;
        const userPosts = await allPosts.find().exec();

        var max_id;
        for (y = 0; y < userPosts.length; y++)
        {
            if (max_id == null || parseInt(userPosts[y].id) > parseInt(max_id))
                max_id = userPosts[y].id
        }

        console.log("Req.body", req.body)
        const newPost = new allPosts({
            userId: userResults[0].id,
            id: max_id+1,
            title: req.body.title,
            body: req.body.body,
        });
        const result = await newPost.save();

        mongoose.disconnect();

        res.send(result);
    }
    catch (error)
    {
        mongoose.disconnect();
        console.error("error", error);

        res.status(500);
        res.send(error);
    };
}

const updatePost = async (req, res) =>
{
    try
    {
        mongoose.connect(dataURL, {
            poolSize: 100,
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const filter = { id: req.params.id };
        const update = { body: req.body.body };

        const result = await allPosts.findOneAndUpdate(filter, update, { new: true });

        mongoose.disconnect()

        res.send(result)
    }
    catch (error)
    {
        console.error("error", error);
        res.status(500);
        res.send(error);
    }
}

const removePost = async (req, res) =>
{
    try
    {
        mongoose.connect(dataURL, {
            poolSize: 100,
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const filter = { id: req.params.id };

        const result = await allPosts.findOneAndDelete(filter);

        res.send(result)

    }
    catch (error)
    {
        console.error("error", error);
        res.status(500);
        res.send(error);
    }
}

const mongoRouter = express.Router();

mongoRouter.route("/allPosts").get(getAllPosts);

mongoRouter.route("/allPosts/:username").get(getUserPost);

mongoRouter.route("/posts/:id").get(getPostIdPost);

mongoRouter.route("/profile/:username").get(getUserName);

mongoRouter
    .route("/addPost/:username")
    .post(bodyParser.json(), addPost)

mongoRouter
    .route("/updatePost/:id")
    .patch(bodyParser.json(), updatePost)

mongoRouter
    .route("/deletePost/:id")
    .delete(removePost)


module.exports = mongoRouter