// Required modules
var sys = require("sys"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");
    mime = require("mime");

// The supported extensions of request files
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
      
//HTTP requests
function requestHandler(req, res) {
    var
    fileName = req.url || 'index.html',
    ext = path.extname(fileName),
    localFolder = __dirname + '/public/',
    page404 = localFolder + '404.html',
    result = localFolder + 'result.html';
 
    //Check if the extension type of the requested file is supported
    if(ext &&!extensions[ext]){
        //Send a 404 and a short message if not supported
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html><head></head><body><h1>The requested file type is not supported.</h1></body></html>");
    };
 
    getFile((localFolder + fileName),res,result,extensions[ext]);
};
 
//Create the server
http.createServer(requestHandler)
 
//Listen for an HTTP request on port 1234
.listen(1234);

//Handle file verification
function getFile(filePath,res,result,mimeType){
    //Check if the requested file exist
    fs.exists(filePath,function(exists){
        if(exists){
            //Read the file
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        } else {
            //For the application, lead every page to result.html
            fs.readFile(result,function(err,contents){
                if(!err){
                    res.writeHead(200, {
                        'Location': result, 
                        'Content-Type': 'text/html'
                    });
                    res.end(contents);  
                } else {
                    console.dir(err);
                };
            });
        };
    });
};  
  
sys.puts("Server running at http://localhost:1234/");  