//assignment2-part1

const fs=require('fs')
const BUFFER_SIZE = 2*4500;

function handle_error(err) {
	console.error('ERROR:'+err.code+" "+err.message);
	process.exit();
	}

function copy(rpath,wpath){
	
	var buff = Buffer.allocUnsafe(BUFFER_SIZE);

	fs.open(rpath,'r',function(err,fd){ 
	if(err) 
	{
		handle_error(err);
	}
	fs.read(fd,buff,0,BUFFER_SIZE,null,
	function(err,bytesRead){
	   if(err) 
	   {
		   handle_error(err);
	   }
	});
	});
	
	fs.open(wpath, 'w', function(err, fd) {
		if(err) 
		{
			handle_error(err);
		}

	fs.write(fd, buff, 0, BUFFER_SIZE, null, function(err) {
		if (err) {throw 'Cannot write file: ' + err;}
		console.log('New file created successfully');
	    });
	});
}

copy('Old.txt','New.txt');