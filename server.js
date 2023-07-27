const http = require("http");

const server = http.createServer((req, response) => {
    const {url, method} = req;
    const packetArray = []
    let body = null;
    req.on("data", (packet) => {
        packetArray.push(packet);
    });

    req.on("end", () => {
        body = Buffer.concat(packetArray).toString();

        if(url == "/"){
            response.writeHead(200, { "content-type": "text/html"});
            response.write("<h1>Fish are Cool</h1>");
        }
        else if(url == "/about"){
            response.writeHead(200, { "content-type": "text/html"});
            response.write("<h1>Alex Gonzales</h1><p>I like to play video games</p>");
        }
        else if(url == "/echo"){
            const obj = {method, url, body};
            response.writeHead(200, { "content-type": "application/json"});
            response.write(JSON.stringify(obj));
        }
        response.end();
    })

})

server.listen(5500, () => {
    console.log("Server started");
});