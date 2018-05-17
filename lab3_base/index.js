
'use strict';
const vision = require('vision');
const Hapi=require('hapi');
const https = require('https');


//create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000

});


const url = "https://api.nasa.gov/planetary/apod?api_key=g2BBGckGI0WpCIlFJwPG5jXLfE86xWQ1JF43BVeL";
//add the index.html route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h){
        return'<h1> you have reached the homepage</h1>';
    }
});

//add the content.html route

https.get(url, res =>{
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data =>{
        body += data;
    });

    var data = res.on("end", () =>{
        body = JSON.parse(body);
    });
        server.route({
            method:'GET',
            path:'/content.html',
            handler:function(req,h){
                return h.view('content', {dataOutput : body});
            }

        })


//server.route({
    //method:'GET',
    //path:'/content.html',
    //handler:function(request,h){

       // return'<h1> you have reached the content page</h1>';
    //}
});

//start the server
async function start(){

    await server.register(vision);
    server.views({


        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname
    })
    try{
        await server.start();
  
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }
        console.log('Server running at:', server.info.uri);
    
};


start();


