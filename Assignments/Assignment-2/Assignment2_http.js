'use strict'

const fs = require('fs')
const http = require('http')
const home='/home'
const headers={"Content-Type" : "application/json"}


//http get
let s=http.createServer(
	(req,res) => 
	{
    fs.readdir(home+req.url,
        (err,files) => {
            if(err){
                res.writeHead(500,headers)
                res.end(`${JSON.stringify({error : err.toString(), files: files||null
                            })}\n`)
                       }
        	else {
                res.writeHead(200,headers)
                res.end(`${JSON.stringify({error : null, files : files})}\n`)
                       }
                   })
    })



//http post

let s=http.createServer(
    (req,res) => {
        let posted=''
        req.on('data', chunk => { 
            console.log(`Received ${chunk.length} bytes of data`)
            posted+=chunk 
        })
        req.on('end',() => { 
            console.log('No more data')
            try{
                let obj=JSON.parse(posted) 
                res.writeHead(200,headers)
                res.end(`${JSON.stringify({error:null,posted:obj})}\n`)
                console.log(obj)
            }
            catch(err){
                res.writeHead(400,headers)
                res.end(`${JSON.stringify({error:err.message})}\n`)
            }
        })
	})
	

s.listen(8080)

console.log('server running on port 8080');
console.log(`Request: ${req.method} URL: ${req.url}`)

