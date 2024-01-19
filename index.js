// Required External Modules
const express = require("express");
const path = require("path");

//App Variables
const app = express();
const port = process.env.PORT || "8000";
// const users = require("./data/users");
// const posts = require("./data/posts");
// const actions = require("./data/actions");

// App Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));

// Routes Definitions
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
  // res
  //   .status(200)
  //   .send("Do This Instead: Little Actions that Save You & Our World");
});

app.get("/user", (req, res) => {
  res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
});
/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
