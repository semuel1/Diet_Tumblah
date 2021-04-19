//Require Packages//
const router = require('express').Router()
const mongoose = require("mongoose");
const {PostMessage} = require('./models/messageTemplate')
const models = require("./models");
require("./models");

console.log(PostMessage)

// CREATE a post
const postTest = async () => {
  try {
    // CREATE a post
    const newPost = new PostMessage({
      title: "Title here",
      message: "message here"
    }); 
    await newPost.save();
    console.log("newPost", newPost);

    // READ a post (find one)
    const foundPost = await PostMessage.find({});
    console.log("foundPost", foundPost);
    foundPost.title = "test #2";
    await foundPost.save();

// READ a post (find one again)
const findPostAgain = await PostMessage.findOne({
  title: "Helio",
});
console.log("findPostAgain", findPostAgain);

// DESTROY a post
const deletePost = await PostMessage.deleteOne({
  title: "test title",
});
console.log("deletePost", deletePost);
process.exit();

//catch if error
  } catch (error) {
    console.log("👻 👻 👻 ", error);
    process.exit();
  }
};
postTest();

