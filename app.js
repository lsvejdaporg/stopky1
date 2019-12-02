const http = require("http");
const url = require("url");

let mereni = new Array();
function main(req, res) {
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
    let q = url.parse(req.url, true);
    let obj = {};
    if (q.pathname == "/start") {
        let m = {};
        m.tmStart = new Date().getTime(); //zjisteni casu startu
        let newId = mereni.push(m) -1; //push vraci pocet polozek pole po vlozeni

        obj.id = newId;
        obj.status = "Started";
        res.end(JSON.stringify(obj));
    } else if (q.pathname == "/stop") {
        let tmStop = new Date().getTime(); //zjisteni casu ukonceni mereni
        let id = Number(q.query.id);
        let m = mereni[id];
        obj.status = "Stopped";
        obj.durSec = ((tmStop - m.tmStart)/1000).toFixed(1);
        res.end(JSON.stringify(obj));
    } else {
        obj.status = "API not exists";
    }
    res.end(JSON.stringify(obj));
}

http.createServer(main).listen(8080);