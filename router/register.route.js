const express = require("express");
const fs = require("fs");
const userModel = require("../models/user.model");

const route = express.Router();

route.get("/", function (req, res) {
  res.render("register", { title: "Register", layout: false });
});

route.post("/", async function (req, res) {
  let { name, email, attend } = req.body;
  let avatar = "";
  let password = "";

  attend = attend === "on" ? true : false;

  const rows = await userModel.all();

  // create new user id
  let newUserId = "";
  if(rows.length != 0)
  {
      newUserId = "user" + (parseInt(rows[rows.length -1 ].userid.match(/(\d+)/)[0]) + 1); 
  }
  else 
  {
      newUserId = "user1";
  }

  const entity = { 
    userid: newUserId,
    name,
    email,
    password,
    attend,
    avatar,
  }

  userModel.add(entity).then((result) =>
  {
    res.send(`Wellcome ${name} (${email})`);
  })
  .catch((err) =>
  {
      throw err;
  });
  
});

module.exports = route;
