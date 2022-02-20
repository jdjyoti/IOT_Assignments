var fs=require('fs')
const EventEmitter = require('events')
var size = 512

class Reader extends EventEmitter{
    // Constructor
    constructor(size) { 
        super()
        this.buffer_size = size
        this.started = false
    }

    show_error = (err)=>
    {
    	console.error(err)
		process.exit();
    }

    start (file) {
        let self = this
        this.file=file;
        
        const file_size = (filename) =>{
            var stats = fs.statSync(filename)
            var byteFile = stats["size"]
            return byteFile
        }

        if (!self.started) {
            self.started = true
            fs.open(file, 'r', function(err,fd) {
                if(err) show_error(err)
                self.emit('open',fd)

                var fileSize = file_size(file)
                var read_file = Math.ceil(fileSize/self.buffer_size)
                self.data = new Array(read_file)
                for (var i =0; i< read_file; i++){
                    let ind = self.buffer_size * i
                    let buffer = Buffer.allocUnsafe(self.buffer_size)
                    fs.read(fd, buffer, 0, self.buffer_size, ind, function(err, bytesRead) {
                        if (err) show_error(err)
                        var current_index = ind/self.buffer_size
                        self.emit('data', fd, buffer, bytesRead, current_index)
                    })
                }
            })
        }
        else {
            let err = {message: "Process Started"}
            show_error(err)
        }
    }
}

let r = new Reader(size)
r.start('hello.txt')

r.once('open',fd => console.log(`opened ${fd}`))
r.on('data', function(fd, buff, bytesRead, current_index) {
    r.data[current_index] = buff.toString('utf8',0,bytesRead)
    if (!(r.data.includes(undefined))){
        for (var i=0; i< r.data.length; i++){
            console.log(r.data[i])
        }
        r.emit('close', fd)
    }
})
r.once('close', fd => console.log(`closed ${fd}`))
r.once('err', err => console.log(err.message))



