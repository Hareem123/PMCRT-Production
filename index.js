var express = require('express');
const compression = require('compression')
var app = express();
app.use(compression({ filter: shouldCompress }))
app.use(express.static('public'));
const fallback = require('express-history-api-fallback');
app.use(fallback(__dirname + '/public/index.html'));
var port = process.env.PORT || 3300;

var server = app.listen(port,function()
{
    console.log("server listening on ",port);
})


function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
