var fs = require('fs');
var xmlpath = __dirname + '../../city/area.plist.xml';
var xml2jsonParser = require('xml2js').parseString;


fs.readFile(xmlpath, 'utf8', function (err, data) {

    console.log(xmlpath);
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    xml2jsonParser(data, function(err, result){

        var jsonString = JSON.stringify(result);
        console.log("result == ", result, jsonString);

        fs.writeFile('./data/sample-xml.json', jsonString, function(err){
            if(err) throw err;
            console.log('It\'s saved!');
        });

    });

    // var xmldata = JSON.parse(data);
    // var jsondata = xml2jsonParser.toJson(xmldata);

    //console.log('json==', json);


});
