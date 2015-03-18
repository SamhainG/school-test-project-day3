"use strict";

var http = require("http"),
    url = require("url"),
    routes = require("./routes");


//var User = require('./lib/users'),
//    user = [];




function requestHandler(request, response){

    var parsedUrl = url.parse(request.url, true),
        method = request.method.toLowerCase();
    console.log("method ==>" + method);
    console.log("parsedUrl ==>" + parsedUrl);



    if(routes[method][parsedUrl.pathname]){
        routes[method][parsedUrl.pathname](request, response, function(err){
            if(err){
                response.statusCode = 500;
                response.write(JSON.stringify({
                    "message": err.message,
                    "status": "Internal Server Error"
                }));
                response.end();
            }else{
                response.end();
            }
        });
    }else{

        //console.log("statusCode ==>" + response.statusCode);
        //response.statusCode = 404;

        response.end("Not Found bla");
    }
}


var server  = http.createServer(requestHandler);


server.listen(3000, '127.0.0.1');
