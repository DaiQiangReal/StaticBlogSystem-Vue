<template>
    <div id="blogBrief">
        <a id="blogTitle" :href="'./blog.html?path='+classification+'&filename='+filename">{{blogTitle}}</a>
        <div id="blogDetail">{{blogDetail}}</div>
        <div id="blogHead">
            <div id="blogDate">{{blogDate}}</div>
            <div id="blogKeyword">关键词: {{blogKeyword}}</div>
        </div>
    </div>
</template>

<script>
import Engine from "../core/markdownEngine/Engine";
export default {
    name: "BlogBrief",
    props: ["classification","filename"],
    data() {
        return {
            markdownFilePath:"",
            blogTitle: "",
            blogDetail: "",
            blogDate:"",
            blogKeyword:"",
            engine: null,
        };
    },
    created() {
        this.calculateData();
    },
    watch:{
        markdownFilePath(){
            this.calculateData()
        }
    },
    methods: {
        async calculateData() {
            if ((!this.markdownFilePath)&&this.engine) {
                return;
            }
            this.markdownFilePath="./blogs/"+this.classification+"/"+this.filename;
            let markdownFileContent = await (
                await fetch(this.markdownFilePath)
            ).text();
            this.engine = new Engine(markdownFileContent);
            let blogHead = this.engine.getBlogHead();
            this.blogTitle=blogHead.title;
            this.blogDate=blogHead.date;
            this.blogKeyword=blogHead.keyword;

            //计算博文开头内容
            let blogDetail="";

            let contentBeginLineIndex;
            let fileContentList = markdownFileContent.split("\n");
            for (let lineIndex in fileContentList) {
                lineIndex = Number.parseInt(lineIndex);
                if (fileContentList[lineIndex].indexOf("*/") !== -1) {
                    contentBeginLineIndex = lineIndex + 1;
                    break;
                }
            }
            //取内容前5行作为博文简介
            let count = 0;
            for (
                let lineIndex = contentBeginLineIndex;
                count <= 5 && lineIndex < fileContentList.length;
                lineIndex++, count++
            ) {
                //去除#号
                let start;
                for(let i=0;i<fileContentList[lineIndex].length;i++){
                    if(fileContentList[lineIndex][i]!=="#"){
                        start=i;
                        break;
                    }
                }
                blogDetail+=fileContentList[lineIndex].slice(start);
            }
            this.blogDetail=blogDetail;

        }
    }
};
</script>

<style lang="less" scoped>
#blogBrief{
    border-bottom: 1px solid gray;
    padding: 1rem 1rem;
    a {
        text-decoration:none;
        &:link {
            color: black;
            text-decoration:none;
        }
        &:visited {
            color: black;
            text-decoration:none;
        }
        &:hover {
            color: black;
            text-decoration:none;
        }
        &:active {
            color: black;
            text-decoration:none;
        }
    }
    #blogTitle{
        color: rgb(0, 102, 255);
        font-size: 1.5rem;
        font-weight: bold;
    }
    #blogDetail{
        margin: 0.2rem 0 0.2rem 0;
    }
    #blogHead{
        #blogDate{
            display: inline-block;
        }
        #blogKeyword{
            display: inline-block;
            margin-left: 1rem;
        }
    }
}
</style>