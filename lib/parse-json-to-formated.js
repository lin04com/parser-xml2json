var fs = require('fs');
var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, "127.0.0.1");

var file = __dirname  + '../..//city/city.plist.json';

fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);

    //console.log(typeof(data));
    //console.log(JSON.stringify(data));

    var privince = ParseCityFormate(data.plist.dict.dict);

    //console.log("privince == ", privince);
    var jsonString = JSON.stringify(privince);

    //console.log(jsonString);

    fs.writeFile('./data/sample.json', jsonString, function(err){
        if(err) throw err;
        console.log('It\'s saved!');
    });

});

function ParseCityFormate (cityData) {

    var privince = {};

    for(var i = 0, len = cityData.length; i < len; i++){
        var key = cityData[i].key, list = [];
        //console.log('i', i, cityData[i].key, list);
        var p = cityData[i].dict.dict;

        //直辖市
        if(!isArray(p)){
            if(!isArray(p.array.string)){
                list.push(p.array.string);
            }else{
                list = p.array.string;
            }
        }else{
            //一省多市
            var city = {};
            list = {};
            for(var j = 0, lenj = p.length; j < lenj; j++){
                //city[p[j].key] = p[j].array.string;
                //console.log(key, 'sss', p[j].key, city);
                var area = [];

                if(!isArray(p[j].array.string)){
                    area.push(p[j].array.string);
                }else{
                    area = p[j].array.string;
                }

                list[p[j].key] = area;
            }
            //console.log('city == ', p[j].key,  p[j].array.string);
        }

        //console.log('list', key, list);

        privince[key] = list;
    }

    return privince;
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}


// http.get({
//     url : __dirname  + '/city/city.plist.json'
// }, function(res){
//     var data = '';

//     res.on('data', function (chunk){
//         data += chunk;
//     });


//     res.on('end',function(){
//         console.log('data==', data);
//         //var obj = JSON.parse(data);
//         //console.log( obj.buck.email );
//     });

// });
