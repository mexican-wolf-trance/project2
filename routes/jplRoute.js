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
    var searchUsername = req.params.username
    console.log(searchUsername)
    var thisUser, x, y
    try
    {
        const postsResponse = await fetch(dataURL + "/posts");
        const postsJson = await postsResponse.json();
        const allPosts = postsJson.map(obj => obj);

        const usersResponse = await fetch(dataURL + "/users");
        const usersJson = await usersResponse.json();
        const allUsers = usersJson.map(obj => obj);
        
        for (x in allUsers)
        {
            if (allUsers[x].username === searchUsername)
            {
                thisUser = allUsers[x];
            }
        }
        for (y in allPosts)
        {
            if (thisUser.id === allPosts[y].userId) {
                console.log(allPosts[y]);
                userPosts[y] = allPosts[y];
            }
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

const getPostIdPost = async (req, res) =>
{
    const postID = req.params.id
    var x, thisPost
    try
    {
        const postsResponse = await fetch(dataURL + "/posts");
        const postsJson = await postsResponse.json();
        const allPosts = postsJson.map(obj => obj);

        for (x in allPosts)
        {
            if (allPosts[x].id == postID)
                thisPost = allPosts[x]
            else thisPost = "No exist"
        }


        res.send(thisPost);
    }
    catch (error)
    {
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
};

const getUserName = async (req, res) =>
{
    const username = req.params.username
    var x, thisUser
    try
    {
        const usersResponse = await fetch(dataURL + "/users");
        const usersJson = await usersResponse.json();
        const allUsers = usersJson.map(obj => obj);

        for (x in allUsers)
        {
            if (allUsers[x].username === username)
                console.log(allUsers[x])
                thisUser = allUsers[x]
        }
        res.send(thisUser);
    }
    catch (error)
    {
        console.error("error", error);

        res.status(500);
        res.send(error);
    }
}

const jplRouter = express.Router();

jplRouter.route("/allPosts").get(getAllPosts);

jplRouter.route("/allPosts/:username").get(getUserPost);

jplRouter.route("/posts/:id").get(getPostIdPost);

jplRouter.route("/profile/:username").get(getUserName);


module.exports = jplRouter