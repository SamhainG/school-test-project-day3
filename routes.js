module.exports = {
  "get": {
    "/hello": require("./controllers/helloController").getAction,
    "/users": require("./lib/usersController").getAction
  },
    "post":{
        "/users": require("./lib/usersController").postAction
    }
};
