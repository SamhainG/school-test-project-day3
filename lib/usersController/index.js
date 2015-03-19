/**
 * Created by user_12 on 18/03/15.
 */
var User = require("./../user");
var Users = require("./../users");
var uArray = new Users();

var ect = require("ect");
var renderer = ect({ root : __dirname + '/../../views' });
var data = { title : 'Hello, World!' };

/*
function usersController(){

}

usersController.prototype.methodCheck = function (method) {
    switch (method) {
        case "post":

            break;
        case "get":
            console.log(uArray.readUser());
            break;
        default:
            console.log("I can't understand request method");
    }


};
*/


module.exports = {
    getAction: function(request, response, next){
        /* next(null) */

        setTimeout(function(next){
            response.statusCode = 200;
            try{
                console.log(uArray.readUser());
                response.write(renderer.render('hello.ect', {
                    message: uArray.readUser()
                }));
                next();
            }catch(e){
                next(e);
            }
        }, 500, next)
    },
    postAction: function(request, response, next){
        setTimeout(function(next){
            response.statusCode = 200;
            try{
                var name, email, desc,age;
                var u = new User(name, email, desc,age);
                uArray.addUser(u);
                response.write(renderer.render('hello.ect', {
                    message: "User add"
                }));
                //response.end("User add");
                next();
            }catch(e){
                next(e);
            }
        }, 500, next)
    }
};