const fs = require('fs')
const http = require('http')
const url = require('url')
const home='./weather.json'
const headers={"Content-Type" : "application/json"}

// json get


function jsonCsv(a, val){
	var col = [];
	 var csv = col+'\n';
	 for (let i in a) {
		 if(Object.keys(val).length !==0){
		 keyFlag = (Object.keys(val)).every(f => (Object.keys(a[i])).includes(f));
		 valFlag = (Object.values(val)).every(f => (Object.values(a[i])).toString().includes(f));
	    if(keyFlag && valFlag){
	    }else
	    	delete a[i]
	 }
		 for (var key in a[i]){
		     	var initKey = key
					key = key.toUpperCase();
					if (col.indexOf(key) === -1) {
						col.push(key);
					}
					a[i][key] = a[i][initKey]
					delete a[i][initKey] 
		         }
	 }
	
	 var csv = col+'\n';
	 for (var i = 0; i < a.length; i++) {
		 if(a[i]!==null && a[i]!== undefined) {
	        var line = '';
	            for (var j = 0; j < col.length; j++) {   
	              if(a[i][col[j]]!==undefined){  
	                  if (line != '') line += ','
	                 line += a[i][col[j]]
	                }
	                          else{line += ','}
	            }
	             csv += line + '\r\n';
	            }  
	 }
	 if(csv.length==1){
		 csv= "No Result to display."
	 }
	 return csv;
}


let s=http.createServer((req,res) => {
	 fs.readFile(home,(err,files) => {
		if(err){
		res.writeHead(500,headers);
		res.end(JSON.stringify({error : err.toString(), files: files||null})+'\n');
		}
	else  if (req.url != '/favicon.ico'){
		 var queryObjectStr  = JSON.stringify(url.parse(req.url,true).query);
		 var val = JSON.parse(queryObjectStr);
		 var a=JSON.parse(files.toString());
		 res.writeHead(200,headers);
		 res.end(jsonCsv(a,val));
		}
		});
});


// json post

function postJsonCSV(a) {
	var col = [];
	for (var i = 0; i < a.length; i++) {
		for ( var key in a[i]) {
			var initKey = key
			key = key.toUpperCase();
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
			a[i][key] = a[i][initKey]
			delete a[i][initKey]
		}
	}
	var csv = col + '\n'
	for (var i = 0; i < a.length; i++) {
		var line = '';
		for (var j = 0; j < col.length; j++) {
			if (a[i][col[j]] !== undefined) {
				if (line != '')
					line += ','
				line += a[i][col[j]]
			} else {
				line += ','
			}

		}
		csv += line + '\r\n';
	}
	console.log(csv);
	return csv;
}


let s=http.createServer(
    (req,res) => {
      if(req.method=='POST'){
          if(req.url==='/postJsonCSV'){
        let posted=''
        req.on('data', chunk => {  
            console.log(`Received ${chunk.length} bytes of data`)
            posted +=chunk ;
        })
        req.on('end',() => {
            try{
                let obj=postJsonCSV(JSON.parse(posted)) ;
                res.writeHead(200,headers)
                res.end(obj);  
            }
            catch(err){
                res.writeHead(400,headers)
                res.end(err.message)
            }
        })
     }else{
         res.end('Invalid URL')
     }
      }
    });
s.listen(8080)


