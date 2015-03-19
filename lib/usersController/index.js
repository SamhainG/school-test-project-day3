/**
 * Created by user_12 on 18/03/15.
 */
var User = require("./../user");
var Users = require("./../users");

//var getjs = require('getjsoneasily');
//var rJson= require('request-json');
var url = require("url");
var validator = require("validator");
var uArray = new Users();



var ect = require("ect");
var renderer = ect({ root : __dirname + '/../../views' });
var data = { title : 'Hello, World!' };

module.exports = {
    getAction: function(request, response, next){
        /* next(null) */

        setTimeout(function(next){
            response.statusCode = 200;
            try{
                console.log(uArray.readUser());
                response.write(renderer.render('hello.ect', {
                    message: uArray.readUser().toString()
                }));
                next();
            }catch(e){
                next(e);
            }
        }, 500, next)
    },
    postAction: function(request, response, next){
        var urlJson="";
        setTimeout(function(next){
            response.statusCode = 200;
            try{
                request.on("data", function (data){
                    urlJson+= data;
                });
                request.on("end", function(){
                    var parsData=JSON.parse(urlJson);

                    if (validator.isLength(personinfo["name"], 1, 255) && validator.isEmail(personinfo["e-mail"]) &&
                        validator.isNumeric(personinfo["age"]) && validator.isLength(personinfo["description"], 1, 255)) {

                        var name =personinfo["name"],
                            email =personinfo["e-mail"],
                            desc =personinfo["description"],
                            age =personinfo["age"];

                        var u = new User(name, email, desc, age);

                        uArray.addUser(u);

                        response.write(renderer.render('hello.ect', {
                            message: "User "+ u.name+" add"
                        }));
                        console.log(users.items);
                        next();

                    } else{
                        response.statusCode=404;
                        response.write(response.statusCode+" Error in Url");
                        next();
                    }
                    console.log(parsData);
                });


                //response.end("User add");
               // next();
            }catch(e){
                next(e);
            }
        }, 500, next)
    }
};