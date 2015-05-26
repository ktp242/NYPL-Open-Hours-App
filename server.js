var sys = require("sys"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");
    mime = require("mime");

extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".mp4" : "video/mp4",
    ".ogv" : "video/ogg"
};
      
//a helper function to handle HTTP requests
function requestHandler(req, res) {
    var
    fileName = req.url || 'index.html',
    ext = path.extname(fileName),
    localFolder = __dirname + '/public/',
    page404 = localFolder + '404.html',
    result = localFolder + 'result.html';
 
    //do we support the requested file type?
    if(ext &&!extensions[ext]){
        //for now just send a 404 and a short message
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html><head></head><body>The requested file type is not supported</body></html>");
    };
 
    //call our helper function
    //pass in the path to the file we want,
    //the response object, and the 404 page path
    //in case the requestd file is not found
    getFile((localFolder + fileName),res,result,extensions[ext]);
};
 
//step 2) create the server
http.createServer(requestHandler)
 
//step 3) listen for an HTTP request on port 3000
.listen(8080);

//helper function handles file verification
function getFile(filePath,res,result,mimeType){
    //does the requested file exist?
    fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read the file, run the anonymous function
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    //if there was no error
                    //send the contents with the default 200/ok header
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        } else {
            //if the requested file was not found
            //serve-up our custom 404 page
            fs.readFile(result,function(err,contents){
                //if there was no error
                if(!err){
                    //send the contents with a 404/not found header 
                    // res.writeHead(200, {'Content-Type': 'text/html'});
                    // res.end(contents);
                    res.writeHead(200, {
                        'Location': result, 
                        'Content-Type': 'text/html'
                    });
                    res.end(contents);  
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        };
    });
};  
  
sys.puts("Server running at http://localhost:8080/");  