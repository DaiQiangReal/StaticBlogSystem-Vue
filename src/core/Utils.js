import Engine from "./markdownEngine/Engine"
async function getBlogUnixTime(classification, filename) {
    let markdownFilePath = "./blogs/" + classification + "/" + filename;
    let markdownFileContent = await (
        await fetch(markdownFilePath)
    ).text();
    let engine = new Engine(markdownFileContent);
    let blogHead;
    try{
    blogHead = engine.getBlogHead();
    }catch(e){
        return 999999999999
    }
    let blogDate = blogHead.date;
    let unixTime = new Date(blogDate).getTime();
    
    return unixTime;
}

async function getClassificationList(){
    let classificationList=[];
    let classificationTxtLine = (await (
        await fetch("./blogs/name.txt")
    ).text()).split("\n");
    for(let line of classificationTxtLine){
        let index=line.indexOf(":");
        if(index===-1)
            continue;
        let folderName=line.slice(0,index);
        let showName=line.slice(index+1);
        classificationList.push({folderName,showName});
    }
    return classificationList;
}

async function getBlogListByClassification(classification){
    let path="./blogs/"+classification+"/name.txt";
    let blogsTxtLine = (await (
        await fetch(path)
    ).text()).split("\n");
    if(blogsTxtLine[0].indexOf("<!DOCTYPE html>")!==-1)
        return [];
    return blogsTxtLine.filter((blogName)=>blogName!=="");
}

export {getBlogUnixTime,getClassificationList,getBlogListByClassification}