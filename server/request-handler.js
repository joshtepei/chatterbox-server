/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
  exports.storage11 = [];
  exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

   // switch (request.method) {
   //   case 'GET':
   //     console.log('switch case get triggered');
   //     sendChat();
   //     break;
   //   case 'POST':
   //     console.log('switch case post triggered')
   //     storeChat();
   //     break;
   //   default:
   //     console.log("Wrong request");
   //     response.end();
   // }

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

   // .writeHead() tells our server what HTTP status code to send back 
  // response.writeHead(statusCode, headers);
  // response.write('<p>hi</p>');

    response.writeHead(statusCode, headers);


   if(request.method === "POST") {
     request.on('data', function(data) {
      var zz = data.toString();
      exports.storage11.push(zz);
      console.log(exports.storage11);
     })
     response.end();
   }

   if(request.method === 'GET') {
      response.write(JSON.stringify(exports.storage11));
      response.end();
   }
   response.end();
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var sendChat = function() {
  console.log('sendChat ran');
}

var storeChat = function() {
  var storage = ['1', '2', '3', '4'];
  
  storage.forEach(function(item) {
    console.log('hi');
    response.write("<p>" + item + "</p>");
  });
}