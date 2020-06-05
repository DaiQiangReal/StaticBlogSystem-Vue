
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

    let reg, res;

    //开始解析

    //换行
    if (markdown === '')
        return "<br/>"
    //分割线
    if (markdown === '***' || markdown === '---')
        return "<hr/>"

    //#标题字体放大
    reg = /^#+ /;
    res = reg.exec(markdown);
    if (res) {
        markdown = ('<h' + (res[0].length - 1) + '>' + markdown.slice(res[0].length) + '</h' + (res[0].length - 1) + '>');
    }

    //粗体
    reg = /\*{2}[\w\W]+\*{2}/
    res = reg.exec(markdown);
    if (res) {
        
        markdown = markdown.replace(reg, '<b>' + res[0].slice(2, -2) + '</b>')
        
    }
    //斜体
    reg = /\*{1}[\w\W]+\*{1}/
    res = reg.exec(markdown);
    if (res) {
        markdown = markdown.replace(reg, '<i>' + res[0].slice(1, -1) + '</i>')
    }

    //无序列表 接多行计算函数
    reg = /^- /
    res = reg.exec(markdown);
    if (res) {
        markdown = "<uli>" + markdown.slice(2) + "</uli>"
    }

    //有序列表 接多行计算函数
    reg = /^(\d)+\. /
    res = reg.exec(markdown);
    if (res) {
        markdown = "<oli>" + markdown.slice(res[0].length) + "</oli>"
    }

    //图片
    reg=/!\[([\w\W]+)\]\(([\w\W]+)\)/g
    markdown=markdown.replace(reg,(match,p1,p2)=>{
        let res="<img src=\""+p2+"\" alt=\""+p1+"\"/>"
        return res;
    })

    //单个简短代码块
    reg=/(?!<=`)`(?!=`)(([^`])+)(?!<=`)`(?!=`)/g
    markdown=markdown.replace(reg,(match,p1)=>"<code>"+p1+"</code>")

    return markdown;
}

//计算markdown多行规则
function calculateMultipleMarkdownLine(markdownDom) {
    let reg, res;


    //无序列表
    reg = /<uli>([\w\W]+)<\/uli>+/g
    markdownDom = markdownDom.replace(reg, (match) => {
        let res = "<ul>" + match + "</ul>";
        res = res.replace(/<uli>/g, "<li>");
        res = res.replace(/<\/uli>/g, "</li>");
        return res;
    })

    //有序列表
    reg = /<oli>([\w\W]+)<\/oli>+/g
    markdownDom = markdownDom.replace(reg, (match) => {
        let res = "<ol>" + match + "</ol>";
        res = res.replace(/<oli>/g, "<li>");
        res = res.replace(/<\/oli>/g, "</li>");
        return res;
    })

    //多行代码块
    reg=/```[\w\W]+```/g
    markdownDom=markdownDom.replace(reg,(match)=>{
        console.log(match);
        let language=match.slice(3,match.indexOf("\n"));
        let code=match.slice(match.indexOf('\n')+1,-3);
        code=code.replace(/\n/g,"<br/>")
        let res="<code>"+"<b>"+language+"</b><br/>"+code+"</code>"
        return res;
    })


    return markdownDom;
}

function calculateBlogContentDom(contentMarkdown) {
    let markdownList = contentMarkdown.split("\n");
    let domList = [];
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
    let doms = calculateMultipleMarkdownLine(domList.join("\n"));
    return doms;
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