/**
 * Created by user_12 on 18/03/15.
 */
var User = require("./../user");
var Users = require("./../users");

//var getjs = require('getjsoneasily');
//var rJson= require('request-json');
var url = require("url");
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
                    console.log(parsData);
                });
                //console.log(JSON.stringify(parsedUrl, null, 4));
                var name, email, desc, age;
/*                getjson(url, function(data){
                    // Do something with data
                    console.log(data);
                });*/
                var u = new User(name, email, desc, age);
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