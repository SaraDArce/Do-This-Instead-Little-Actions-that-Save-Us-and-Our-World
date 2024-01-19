const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const users = require("../data/users");

const error = require("../utilities/error");
const actions = require("../data/actions");

router
  .route("/")
  .get((req, res) => {
    const userId = req.query.userId;
    const postId = req.query.postId;
    if (userId) {
      const actionsByUser = actions.filter((c) => c.userId == userId);
      res.json({ userId, actionsByUser });
    } else if (postId) {
      const actionsByPost = actions.filter((c) => c.postId == postId);
      res.json({ postId, actionsByPost });
    } else {
      const links = [
        {
          href: "actions/:id",
          rel: ":id",
          type: "GET",
        },
      ];

      res.json({ actions, links });
    }
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.postId && req.body.body) {
      const action = {
        id: actions[actions.length - 1].id + 1,
        userId: req.body.userId,
        postId: req.body.postId,
        body: req.body.body,
      };

      actions.push(action);
      res.json(actions[actions.length - 1]);
    } else {
      next(error(400, "Not enough data"));
    }
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const action = actions.find((c) => c.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (action) {
      res.json({ action, links });
    } else {
      next();
    }
  })
  .patch((req, res, next) => {
    const action = action.find((c) => {
      if (c.id == req.params.id) {
        c.body = req.body.body;
        console.log(c.body);
        return true;
      }
    });

    if (action) {
      res.json(action);
    } else {
      next();
    }
  })
  .delete((req, res, next) => {
    const action = actions.find((c, i) => {
      if (c.id == req.params.id) {
        actions.splice(i, 1);
        return true;
      }
    });

    if (action) res.json(action);
    else next();
  });

router.route("/");

module.exports = router;
