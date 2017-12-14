const path = require('path');
const fs = require('fs');
const utils = require('./utils');

let buildEntries = {};

/*获取所有模块的文件夹名*/
const modules = path.join(utils.resolve('src'),'modules');
//TODO 单层级页面打包编译逻辑
/*const modules = fs.readdirSync(path.join(utils.resolve('src'),'modules'));
for (let moduleName of modules) {
  buildEntries[moduleName] = path.join(utils.resolve('src'),'modules',moduleName,'main.js');
    console.log("----"+moduleName+'------');
    console.log("----"+path.join(utils.resolve('src'),'modules',moduleName,'main.js')+'------');
}
console.log(buildEntries);*/
//TODO 多层级页面打包编译逻辑 2017.11.20 姚乔，王宁，李春辉
readDirSync(modules);

function readDirSync(modules,parentPath){
    let pa=fs.readdirSync(modules);
    pa.forEach(function(ele,index){
        let info = fs.statSync(modules+"/"+ele);
        if(info.isDirectory() && (ele.indexOf("api")==-1) &&  (ele.indexOf("components")==-1) &&  (ele.indexOf("asset")==-1) &&  (ele.indexOf("router")==-1) &&  (ele.indexOf("store")==-1)){
            //console.log("modules---: "+modules);
            let  _path = path.normalize(modules+"/"+ele+"/"+"main.js");
            if(fs.existsSync(_path)){
                let _key = ele;
                if(parentPath){
                    //_key = parentPath+"/"+ele;
                    let newPath=_path.replace(/\\/g,"/");
                    _key = newPath.substring(newPath.indexOf("modules/")+8,newPath.lastIndexOf("/"));
                }
                //console.log("key---: "+_key);
                buildEntries[_key] = _path;
            }else{
               let _modules = path.normalize(modules+"/"+ele);
               readDirSync(_modules,ele);
            }
        }
    })
}

module.exports = buildEntries;
