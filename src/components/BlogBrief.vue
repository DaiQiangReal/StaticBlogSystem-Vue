<template>
    <div id="blogBrief">
        <div id="blogTitle" >{{blogTitle}}</div>
        <div id="blogDetail">{{blogDetail}}</div>
        <div id="blogHead">
            <div id="blogDate">{{blogDate}}</div>
            <div id="blogKeyword">{{blogKeyword}}</div>
        </div>
    </div>
</template>

<script>
import Engine from "../core/markdownEngine/Engine";
export default {
    name: "BlogBrief",
    props: ["markdownFilePath"],
    data() {
        return {
            blogTitle: "",
            blogDetail: "",
            blogDate:"",
            blogKeyword:"",
            engine: null
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
</style>