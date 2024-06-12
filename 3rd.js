
//Asynchronous file reading it is none blocking code.
const readline=require('readline');
const fs=require('fs');
fs.readFile('./file/text.txt','utf-8',(err1,data1)=>{
    console.log(data1);
    fs.readFile(`./file/${data1}.txt`,'utf-8',(err2,data2)=>{
        console.log(data2);
        fs.writeFile('./file/output.txt',`${data1}\n\n ${data2}`,(err,data)=>{
            console.log("file successfully written");});
    
    });
});
console.log("...is reading");