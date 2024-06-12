module.exports=function(template,product){
    let output=template.replace('{{%NAME%}}',product.name);
    output=output.replace('{{%COLOR%}}',product.color);
    output=output.replace('{{%PRICE%}}',product.price);
    output=output.replace('{{%CAMERA%}}',product.camera);
    output=output.replace('{{%ID%}}',product.id);
    output=output.replace('{{%HEIGHT%}}',product.height);
    return output;

}