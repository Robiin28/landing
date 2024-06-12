const readline=require('readline');//importing readline from node
const r1=readline.createInterface({//crating interface
input:process.stdin,//input interface
output:process.stdout//output interface
});
r1.question("enter your name ",(name)=>{//question mthod have 2 parameters 1 , th mssg 2nd function to display if you want
console.log(name);
r1.close();//closing interface
});
r1.on('close',()=>{
    console.log("interface close");
    process.exit(0);//to exit
})