var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:date', function (req, res) {
    var q = req.params.date;
    var output = { "unix": null, "natural": null };

    // check for numeric date
    if (!isNaN(q)) {
        q = parseInt(q);
    }

    var d = new Date(q);

    // on valid date, fill output object
    if (!isNaN(d.getTime())) {
        var month = d.toLocaleString('en-us', { month: 'long' });
        output.unix = d.getTime();
        output.natural = `${month} ${d.getDate()}, ${d.getFullYear()}` 
    }
    // send output
    res.send(JSON.stringify(output));
})
    
app.listen(process.env.PORT || <default port>);