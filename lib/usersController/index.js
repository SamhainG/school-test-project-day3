/**
 * Created by user_12 on 18/03/15.
 */
var User = require("user");
var Users = require("user");
var uArray = new Users();


function usersController(method) {
    switch (method) {
        case "POST":
            var name, email, desc,age;
            var u = new User(name, email, desc,age);
            uArray.addUser(u);
            break
        case "GET":

            break
        default:
            break
    }


}