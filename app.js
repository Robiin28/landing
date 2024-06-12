//starting node server using node js.
const fs=require('fs');
const http=require('http');
const url=require('url');
const user=require('./basics/user');
const replaceHtml=require('./basics/replaceHtml');
const html=fs.readFileSync('./templates/index.html','utf-8');
//parsing is needed to convert json data object to javascript object
let productList=fs.readFileSync('./templates/products.html','utf-8');
let productDetailHtml=fs.readFileSync('./templates/detail.html','utf-8');
const products=JSON.parse(fs.readFileSync('./data/production.json','utf-8'));

let productArray=products.map((prod)=>{
    let output=productList.replace('{{%NAME%}}',prod.name);
    output=output.replace('{{%COLOR%}}',prod.color);
    output=output.replace('{{%PRICE%}}',prod.price);
    output=output.replace('{{%CAMERA%}}',prod.camera);
    output=output.replace('{{%ID%}}',prod.id);
    output=output.replace('{{%HEIGHT%}}',prod.height);
    return output;
})
const server=http.createServer();

server.on('request',(request,response)=>{
  //url parsing to search specfically
  let {query,pathname: path}= url.parse(request.url,true);
  //
  if(path==='/' || path.toLocaleLowerCase()==='/home'){
   response.writeHead(200,{
     'Content-Type' : 'text/html',
     'my-header':'hello,world '
   });
      response.end(html.replace('{{%contents%}}','you are in home page'));
  }
  else if(path.toLocaleLowerCase()==='/about'){
      response.end(html.replace('{{%contents%}}','you are in about page'));
  }
  else if(path.toLocaleLowerCase()==='/products'){
   if(!query.id){
    products.map((prod)=>{
      return replaceHtml(productList, prod);

    });
      let productResponse=html.replace('{{%contents%}}',productArray.join(','));
    response.writeHead(200,{
      'Content-Type' : 'text/html',
      'my-header':'product-list'
    });
    response.end(productResponse);
  }
  else{
    let prod=products[query.id];
    let prodHtml=replaceHtml(productDetailHtml,prod)
      response.end(html.replace('{{%contents%}}',prodHtml));
  }
      }

  else{
    response.end(html.replace('{{%contents%}}','404,error'));
  }

});

   server.listen(8000,'127.0.0.1',()=>{
   console.log("server is starting");
});

//emmitting and handiling events
let myEmitter=new user();
myEmitter.on('userCreated',(id,name)=>{
console.log(`a new user ${id} with name ${name} logged in`);


});
myEmitter.emit('userCreated',101,'alex');