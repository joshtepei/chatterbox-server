/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
  exports.storage11 = [];

  exports.handleRequest = function(request, response) {

   switch (request.url) {
     case '/2/':
       console.log('switch case get triggered');
       headerwriter(request, response);
       sendChat(request, response);
       break;
     case '/1/':
       console.log('switch case post triggered')
       headerwriter(request, response);
       response.end('[]');
       break;
     default:
       console.log("Wrong request");
       response.statusCode = 404;
       response.end();
   }

  console.log("Serving request type " + request.method + " for url " + request.url);

  response.end();
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var storeChat = function(request, response) {
  request.on('data', function(data) {
    var stringData = JSON.parse(data.toString());
    exports.storage11.push(stringData);
  });
}

var sendChat = function(request, response) {
  return response.write(JSON.stringify(exports.storage11.reverse()));
  }

var headerwriter = function(request, response) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

  switch (request.method) {
    case "POST":
      console.log('switch post');
      statusCode = 201;
      storeChat(request, response);
      return response.writeHead(statusCode, headers);
      break;
    case "GET":
      console.log('switch get');
      statusCode = 200;
      break;
    default:
      console.log('switch default');
      statusCode = 200;
      break;
  }
  return response.writeHead(statusCode, headers);
}
