const readline=require('readline');//importing readline from node
const fs=require('fs');
let r2=fs.readFileSync("./file/text.txt",'utf-8');
console.log(r2);
const content=`the text is duplicated: ${r2} \n  and the date is ${new Date()}`
fs.writeFileSync("./file/text.txt",content);