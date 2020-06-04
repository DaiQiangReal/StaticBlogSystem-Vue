
function getBlogMessage(content){
    let reg=/\/\*[\w\W]+?\*\//;
    let titleReg=/title:[\w\W]+?\n/;
    let dateReg=/date:\d\d\d\d-\d\d-\d\d\n/;
    let keywordReg=/keyword:[\w\W]+?\n/;
    let res=reg.exec(content)[0];
    let title=titleReg.exec(res)?titleReg.exec(res)[0].trim():null;
    let date=dateReg.exec(res)?dateReg.exec(res)[0].trim():null;
    let keyword=keywordReg.exec(res)?keywordReg.exec(res)[0].trim():null;
    title=title?"\""+title.slice(0,5)+"\":"+"\""+title.slice(6)+"\"":null;
    date=date?"\""+date.slice(0,4)+"\":"+"\""+date.slice(5)+"\"":null;
    keyword=keyword?"\""+keyword.slice(0,7)+"\":"+"\""+keyword.slice(8)+"\"":null;
    let all='{'+(title?title+",":'')+(date?date+",":'')+(keyword?keyword:'')+'}'
    return JSON.parse(all)
}

class Engine{
    constructor(content) {
        this.contentStr=content;
        this.headMessage=null;
    }

    getBlogHead(){
        return this.headMessage?this.headMessage:(this.headMessage=getBlogMessage(this.contentStr))
    }

    getBlogContentDom(){
        return this.content;
    }

}

export default Engine