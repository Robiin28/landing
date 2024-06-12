Server.on('request',(req,res)=>{
    let rs=fs.createReadStream('./');
    rs.pipe(res);
})
//pipe method only can b used in readable stream and can shorten long source code
// readableSource.pipe(writableDestination);