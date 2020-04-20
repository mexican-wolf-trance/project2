const express = require("express");
//const bodyParser = require("../../lib/middleware/bodyParser");
const NodeCache = require("node-cache");
const fetch = require("node-fetch");

const dataURL = "https://jsonplaceholder.typicode.com"

const getAllPosts = async (req, res) =>
{
    try
    {
        const response = await fetch(dataURL + "/posts");
        const json = await response.json();
        const allPosts = json.map(obj => obj);

        res.send(allPosts);
    }
    catch (error)
    {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}
const getUserPost = async (req, res) =>
{
    var userPosts = []
    var username = req.params.username
    var thisUser
    try
    {
        const postsResponse = await fetch(dataURL + "/posts");
        const postsJson = await postsResponse.json();
        const allPosts = postsJson.map(obj => obj);

        const usersResponse = await fetch(dataURL + "/users");
        const usersJson = await usersResponse.json();
        const allUsers = usersJson.map(obj => obj);
        console.log(allUsers)

        while (allUsers.username === username)
        {
            thisUser = allUsers
        }

        while (allPosts.userId < 11)
        {
            if (allPosts.userId === thisUser.userId)
                userPosts = allPosts.body
        }

        res.send(userPosts)
    }
    catch (error)
    {
        console.error("error", error);
        res.status(500);
        res.send(error);
    }
};

//const getPostIdPost = async (req, res) =>
//{
//    try
//    {
//        mongoose.connect(dataURL, { useNewUrlParser: true });
//        const results = await allPosts.find({
//            id: req.params.id,
//        }).exec();
//        mongoose.disconnect();

//        res.send(results.body);
//    }
//    catch (error)
//    {
//        mongoose.disconnect();
//        console.error("error", error);

//        res.status(500);
//        res.send(error);
//    }
//};

//const getUserName = async (req, res) =>
//{
//    try
//    {
//        res.send(results.name);
//    }
//    catch (error)
//    {
//        mongoose.disconnect();
//        console.error("error", error);

//        res.status(500);
//        res.send(error);
//    }
//}

const jplRouter = express.Router();

jplRouter.route("/allPosts").get(getAllPosts);

jplRouter.route("allPosts/:username").get(getUserPost);

//jplRouter.route("posts/:id").get(getPostIdPost);

//jplRouter.route("profile/:username").get(getUserName);


module.exports = jplRouter