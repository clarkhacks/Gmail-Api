'use strict';
var
  express = require('express'),
  app = express(),
  credentials = require('./credentials.json');


app.get('/send', function(req, res) {
  var sendTo = req.query.sendTo,
    subject = req.query.subject,
    sendWhat = req.query.sendWhat;
  if (sendTo && sendWhat && sendWhat.length) {
    var send = require('gmail-send')({
      user: credentials.user,
      pass: credentials.pass,
      to: sendTo,
      subject: subject,
      text: sendWhat,
    })({});

    return res.send("To: " + sendTo + "<br><br>" + "Subject: " + subject + "<br><br>" + sendWhat);
  }
   else {
    return res.send('No Email Specified. Please use /send?sendTo=TheirEmailHere&subject=Blah&sendWhat=MessageHere format.');
  }

});

var port = process.env.PORT || 8085;
app.listen(port, function() {
  console.log('Node.js listening on port ' + port);
});
