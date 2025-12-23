const http = require("http")
const path = require("path");
const fs = require("fs")
const root = __dirname;

const server = http.createServer(main)

server.listen(3000)

async function main(req, res){
    if(req.url === '/' || req.url === '/index.html'){
        fs.readFile("public/index.html", 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-type", "text/plain")
                res.write("404 not found ERROR")
                console.error(err)
                res.end()
                return
            }
            
            res.statusCode = 200
            res.setHeader("Content-type", "text/html")
            res.write(data)
            res.end()
        })
    }else if(req.url.split(".").pop() === 'css'){
        fs.readFile("public" + req.url, (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-type", "text/plain")
                res.write("404 not found ERROR")
                console.error(err)
                res.end()
                return
            }
            
            res.statusCode = 200
            res.setHeader("Content-type", "text/css")
            res.write(data)
            res.end()
        })
    }else if(req.url.split(".").pop() === 'js'){
        fs.readFile("public" + req.url, (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-type", "text/plain")
                res.write("404 not found ERROR")
                console.error(err)
                res.end()
                return
            }
            
            res.statusCode = 200
            res.setHeader("Content-type", "text/javascript")
            res.write(data)
            res.end()
        })
    }else if(req.url.split(".").pop() === 'json'){
        fs.readFile(path.join(root, "projects", req.url), "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-type", "text/plain")
                res.write("404 not found ERROR")
                console.error(err)
                res.end()
                return
            }
            
            res.statusCode = 200
            res.setHeader("Content-type", "application/json")
            res.write(data)
            res.end()
        })
    }
    else{
        res.statusCode = 404
        res.setHeader("Content-type", "text/plain")
        res.write("Wrong url request")
        res.end()
    }

    return
}