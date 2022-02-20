const fs=require('fs')
const SIZE=2048
const buffer=Buffer.alloc(SIZE)
const open=promisify(fs.open)
const read=promisify(fs.read)
const close=promisify(fs.close)
let infd
 
open(process.argv[2]||'in.txt','r').then
(fd=>{infd=fd;return read(infd,buffer,0,SIZE,null)}).then
(res=>console.log(buffer.toString('utf8',0,res[0]))).then 
(()=>close(infd)).then
(()=>console.log('closed'),err=>console.error(err.message))

function promisify(inf){
    // to be completed
    return function() {
        //convert arguments to array
        var args = Array.prototype.slice.call(arguments);
        console.log(args)
        return new Promise(
            function (resolve, reject){
                args.push(function(err, data){
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(data)
                    }
                })
                
                inf.apply(null, args)
            }
        )
    }
}
