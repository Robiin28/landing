//starting node server using node js.
const fs=require('fs');
const http=require('http');
const html=fs.readFileSync('./templates/index.html','utf-8');
//parsing is needed to convert json data object to javascript object
let productList=fs.readFileSync('./templates/products.html','utf-8');

const products=JSON.parse(fs.readFileSync('./data/production.json','utf-8'));

let productArray=products.map((prod)=>{
    let output=productList.replace('{{%NAME%}}',prod.name);
    output=output.replace('{{%COLOR%}}',prod.color);
    output=output.replace('{{%PRICE%}}',prod.price);
    output=output.replace('{{%CAMERA%}}',prod.camera);
   
    return output;
})

const server=http.createServer((request,response)=>{
    let path=request.url;
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
      let productResponse=html.replace('{{%contents%}}',productArray.join(','));
      response.writeHead(200,{
        'Content-Type' : 'text/html',
        'my-header':'product-list'
      });
      response.end(productResponse);
      
        }
    else{
        response.end(html.replace('{{%contents%}}','404,error'));
    }}
);
   server.listen(8000,'127.0.0.1',()=>{
   console.log("server is starting");
});
