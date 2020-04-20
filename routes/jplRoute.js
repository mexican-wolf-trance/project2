const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");
const mongoose = require("mongoose");

const dataURL = "https://jsonplaceholder.typicode.com/"

const allPosts = mongoose.model("allposts", {
    userId: String,
    id: String,
    title: String,
    body: String
})

const users = mongoose.model("users", {
    id: String,
    name: String,
    username: String,
    email: String,
    address, 
})

const getAllPosts = async (req, res) =>
{
    try
    {
        mongoose.connect(dataURL + "/posts");
        const results = await allPosts.find().exec();
        mongoose.disconnect();

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
        mongoose.connect(dataURL + "/posts");
        const results = await allPosts.find({
            userId: req.params.userId,
        }).exec();
        mongoose.disconnect();

        mongoose.connect(dataURL + "/users")
        const 

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