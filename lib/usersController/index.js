/**
 * Created by user_12 on 18/03/15.
 */
var User = require("./../user");
var Users = require("./../users");

//var getjs = require('getjsoneasily');
//var rJson= require('request-json');
var url = require("url");
var validator = require("validator");




var ect = require("ect");
var renderer = ect({ root : __dirname + '/../../views' });
var data = { title : 'Hello, World!' };

module.exports = {
    getAction: function(request, response, next){
        /* next(null) */

        setTimeout(function(next){
            response.statusCode = 200;
            try{
                console.log(Users.Users);
                response.write(renderer.render('get.ect', {
                    addUser: Users.Users
                }));
                next();
            }catch(e){
                next(e);
                console.log(e);
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
                    var perData=JSON.parse(urlJson);

                    if (validator.isLength(perData["name"], 1, 255) && validator.isEmail(perData["e-mail"]) &&
                        validator.isNumeric(perData["age"]) && validator.isLength(perData["description"], 1, 255)) {

                        var name =perData["name"],
                            email =perData["e-mail"],
                            desc =perData["description"],
                            age =perData["age"];

                        var u = new User(name, email, desc, age);

                        //Users.addUser(u);
                        Users.Users.push(u);

                        response.write(renderer.render('hello.ect', {
                            message: "User "+ u.name+" add"
                        }));
                        response.statusCode=200;
                        next();

                    } else{
                        response.statusCode=404;
                        response.write(response.statusCode+" Error in Url");
                        next();
                    }
                   // console.log(parsData);
                });


                //response.end("User add");
               // next();
            }catch(e){
                next(e);
            }
        }, 500, next)
    }
};