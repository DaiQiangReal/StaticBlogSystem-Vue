
function calculateBlogHead(contentMarkdown) {
    //提取博文信息
    let reg = /\/\*[\w\W]+?\*\//;
    let titleReg = /title:[\w\W]+?\n/;
    let dateReg = /date:\d\d\d\d-\d\d-\d\d\n/;
    let keywordReg = /keyword:[\w\W]+?\n/;
    let res = reg.exec(contentMarkdown)[0];
    let title = titleReg.exec(res) ? titleReg.exec(res)[0].trim() : null;
    let date = dateReg.exec(res) ? dateReg.exec(res)[0].trim() : null;
    let keyword = keywordReg.exec(res) ? keywordReg.exec(res)[0].trim() : null;
    title = title ? "\"" + title.slice(0, 5) + "\":" + "\"" + title.slice(6) + "\"" : null;
    date = date ? "\"" + date.slice(0, 4) + "\":" + "\"" + date.slice(5) + "\"" : null;
    keyword = keyword ? "\"" + keyword.slice(0, 7) + "\":" + "\"" + keyword.slice(8) + "\"" : null;
    let all = '{' + (title ? title + "," : '') + (date ? date + "," : '') + (keyword ? keyword : '') + '}'
    return JSON.parse(all)
}

function calculateOneMarkdownLine(markdown) {
    console.log("+"+markdown+"+")
    if(markdown==='')
        return "<br>"
    let reg,res;
    //开始解析
    
    //#标题字体放大
    reg=/^#+ /;
    res = reg.exec(markdown);
    if(res){
        markdown=('<h' + (res[0].length-1) + '>' +markdown.slice(res[0].length)+'</h'+(res[0].length-1)+'>');
    }

    //粗体
    reg=/\*{2}[\w\W]+\*{2}/
    res=reg.exec(markdown);
    if(res){
        console.log(1,markdown)
        markdown=markdown.replace(reg,'<b>'+res[0].slice(2,-2)+'</b>')
        console.log(2,markdown)
    }
    //斜体
    reg=/\*{1}[\w\W]+\*{1}/
    res=reg.exec(markdown);
    
    if(res){
        console.log(1,markdown)
        markdown=markdown.replace(reg,'<i>'+res[0].slice(1,-1)+'</i>')
        console.log(2,markdown)
    }

    return markdown;
    // console.log(markdown)

    // let curre
    // let dom='';
    // let reg,res;
    // //#标题字体放大
    // reg = /^#+ /
    // res = reg.exec(markdown);
    // if (res) {
    //     dom+=('<h' + res[0].length + '>' +calculateOneMarkdownLine(markdown.slice(res[0].length))+'<h'+res[0].length+'/>')
    // }
    // //粗体斜体
    // reg=/\*{1,2}[\w\W]\*{1,2}/
    // res=reg.exec(markdown)
    // if(res){
    //     if(res[0][1]==='*'&&res[0][2]!=='*'){
    //         //粗体
    //         dom+='<b>'+res[0].slice(2,-2)+'</b>'
    //     }else if(res[0][1]!=='*'){
    //         //斜体
    //         dom+='<i>'+res[0].slice(1,-1)+'</i>'
    //     }else{
    //         //其他
    //         dom+=res[0];
    //     }

    // }

    // return dom;
}

function calculateBlogContentDom(contentMarkdown) {
    let markdownList = contentMarkdown.split("\n");
    let domList=[];
    let begin;
    //计算内容起始位置
    for (let lineIndex in markdownList) {
        if (markdownList[lineIndex].indexOf("*/") !== -1) {
            begin = Number.parseInt(lineIndex) + 1;
            break;
        }
    }
    //解析开始
    let currentLineIndex = begin;
    for (; currentLineIndex < markdownList.length; currentLineIndex++) {
        let markdown = markdownList[currentLineIndex];
        domList.push(calculateOneMarkdownLine(markdown))
        // console.log(calculateOneMarkdownLine(markdown))
    }
    console.log(domList.join(""))
    return domList.join("");
}

class Engine {
    constructor(contentMarkdown) {
        this.contentMarkdown = contentMarkdown;
        this.headMessage = null;
    }

    getBlogHead() {
        return this.headMessage ? this.headMessage : (this.headMessage = calculateBlogHead(this.contentMarkdown))
    }

    getBlogContentDom() {
        return calculateBlogContentDom(this.contentMarkdown);
    }

}

export default Engine