const fs = require('fs')
const { Writable } = require('stream')

let temp
try{
    temp=JSON.parse(process.argv[2])
    if(!Array.isArray(temp))
	return console.error('Template must be an array')
}
catch(err){
    return console.error(err.message)
}


const template = temp
const in_name = process.argv[3]
const out_name = process.argv[4]

const rs=in_name!==undefined?fs.createReadStream(in_name):process.stdin
const ws=out_name!==undefined?fs.createWriteStream(out_name):process.stdout

ws.write(template.join(',')+'\n')

let prev_chunk=''
var lines = ''
var current_line = ''

rs.setEncoding('utf8')

rs.pipe(new Writable({
        write(chunk, encoding, callback){
    
        var i,j
        prev_chunk = chunk.toString('utf8').split('\n')

            for (i = 0; i < prev_chunk.length; i++){
            let currentObject = JSON.parse(prev_chunk[i])
    
                for (j=0; j<template.length; j++){
                current_line += currentObject[template[j]].toString() + ','
            }

            lines += current_line.slice(0, -1) + '\n'
        }
        
        ws.write(lines, callback)
    }
}))
