var barnOwl = require('barnowl');
var http = require('http');
var dgram = require('dgram');
var json2html = require('node-json2html');
var nedb = require('nedb');


/****************************************************************************/
/* Configuration  (this is the only section you might want to tweak)        */
/*                                                                          */
/* HOST:     IP address on which to host the webpage and receive packets    */
/*           127.0.0.1 means you can visit the webpage at http://localhost  */
/* PORT:     Port on which to send/receive packets                          */
/*           50000 is likely to be an available port                        */
/* INTERVAL: Milliseconds between subsequent simulated hardware packets     */
/*           2000 means that packets will be sent every 2 seconds           */
/* CSS:      HTML link to a CSS file that makes the table look pretty       */
/*           The default is a CSS file hosted on reelyactive.com            */
/* STALE_MILLISECONDS: don't store historic tiraids longer than this        */
/****************************************************************************/
var HOST = '127.0.0.1';
var PORT = 50000;
var INTERVAL = 2000;
var CSS = '<link rel="stylesheet" type="text/css" href="http://reelyactive.com/style/barnowl-test.css">';
var STALE_MILLISECONDS = 60000;
/****************************************************************************/


var HEADER = '<head>'+CSS+'</head>';
var transformIdentifier = {'tag':'td','html':'${identifier.value}'};
var transformTime = {'tag':'td','html':'${timestamp}'};
var transformRSSI = {'tag':'td','html':'${rssi}'};
var transformStrongest = {'tag':'td','html':'${identifier.value}'};
var barnOwlInstance = new barnOwl();
var db = new nedb();
var server = http.createServer();
var socket = dgram.createSocket('udp4');
socket.bind();


/**
 * Send a simulated hardware packet to the HOST (periodic function)
 */
function sendPacket() {
  var simulatedPacket = new Buffer('f001ed4a11aaaa7800008000000000000000000000000000000000503300aaaa0401b00b1e500000aaaa7801008100000000000000000000000000000000503300aaaa1801421655daba50e1fe0201050c097265656c794163746976650100', 'hex');
  socket.send(simulatedPacket, 0, simulatedPacket.length, PORT, HOST);
}

setInterval(sendPacket, INTERVAL);


/**
 * Listen for hardware packets, called tiraids, and upsert them in the database,
 * thus keeping one record per identifier.
 */
barnOwlInstance.on('visibilityEvent', function(tiraid) {
  var id = tiraid.identifier.value;
  var prettyTiraid = JSON.stringify(tiraid, null, " ");
  db.update({ "identifier.value": id }, tiraid, { upsert: true });
  console.log(prettyTiraid); 
}); 

barnOwlInstance.bind('udp', HOST + ':' + PORT);


/**
 * Generate HTML so that the table of identified devices displays in a browser
 */
server.on('request', function(req, res) {
  var html = '<thead><tr><th>IDENTIFIER</th><th>TIMESTAMP</th><th>RSSI</th><th>STRONGEST DECODER</th></tr></thead>';
  db.find({}, { _id: 0 }).sort({ "identifier.type": 1, "identifier.value": 1 }
                               ).exec(function(err, tiraids) {
    if(tiraids) {
      for (var cTiraid = 0; cTiraid < tiraids.length; cTiraid++) {
        var tiraid = tiraids[cTiraid];
        var id = json2html.transform(tiraid, transformIdentifier);
        var time = json2html.transform(tiraid, transformTime);
        var rssi = json2html.transform(tiraid.radioDecodings[0], transformRSSI);
        var strongest = json2html.transform(tiraid.radioDecodings[0], transformStrongest);
        var row = id + time + rssi + strongest;
        html += '<tr>' + row + '</tr>';
      }
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(HEADER + '<body><table cellspacing="0">' + html + '</table></body>');
  });
});

server.listen(80);


/****************************************************************************/
/* Hardware Configuration  (Have hardware? Configure and have fun!)         */
/*                                                                          */
/* UDP:    Specify the IP address and port on THIS machine to which the     */
/*         hardware is sending packets. ex: 192.168.1.101:50000             */
/* SERIAL: Specify the path to the serial device on THIS machine which is   */
/*         receiving packets. ex: /dev/ttyUSB0 (typical on Linux)           */
/****************************************************************************/
//barnOwlInstance.bind('udp', '192.168.1.101:50000');
//barnOwlInstance.bind('serial', '/dev/ttyUSB0');
/****************************************************************************/
