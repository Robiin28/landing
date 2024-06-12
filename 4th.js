//starting node server using node js.
const fs=require('fs');
const http=require('http');

const home=fs.readFileSync('./templates/home.html','utf-8');
  const server=http.createServer((request,response)=>{
    response.end(home);
     console.log(request);

});
   server.listen(8000,'127.0.0.1',()=>{
  console.log("server is starting");
});
