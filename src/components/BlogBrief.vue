<template>
    <div id="blogBrief">
        <a
            id="blogTitle"
            :href="'./blog.html?path='+classification+'&filename='+filename"
        >{{blogTitle}}</a>
        <div id="blogDetail">{{blogDetail}}</div>
        <div id="blogHead">
            <div id="blogKeyword">关键词: {{blogKeyword}}</div>
            <div id="blogDate">{{blogDate}}</div>
            <div id="classification">分类: {{classificationName}}</div>
        </div>
    </div>
</template>

<script>
import Engine from "../core/markdownEngine/Engine";
export default {
    name: "BlogBrief",
    props: ["classification", "filename"],
    data() {
        return {
            markdownFilePath: "",
            blogTitle: "",
            blogDetail: "",
            blogDate: "",
            blogKeyword: "",
            classificationName: "",
            engine: null
        };
    },
    created() {
        this.calculateData();
    },
    watch: {
        markdownFilePath() {
            this.calculateData();
        }
    },
    methods: {
        async calculateData() {
            if (!this.markdownFilePath && this.engine) {
                return;
            }
            this.markdownFilePath =
                "./blogs/" + this.classification + "/" + this.filename;
            let markdownFileContent = await (
                await fetch(this.markdownFilePath)
            ).text();
            this.engine = new Engine(markdownFileContent);
            let blogHead = this.engine.getBlogHead();
            this.blogTitle = blogHead.title;
            this.blogDate = blogHead.date;
            this.blogKeyword = blogHead.keyword;
            //计算博文分类名称
            let classificationTxt = await (
                await fetch("./blogs/name.txt")
            ).text();
            let startIndex =
                classificationTxt.indexOf(this.classification) +
                this.classification.length +
                1;
            let endIndex = classificationTxt.indexOf("\n", startIndex);
            this.classificationName = classificationTxt.slice(
                startIndex,
                endIndex
            );

            //计算博文开头内容
            let blogDetail = "";

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
                for (let i = 0; i < fileContentList[lineIndex].length; i++) {
                    if (fileContentList[lineIndex][i] !== "#") {
                        start = i;
                        break;
                    }
                }
                blogDetail += fileContentList[lineIndex].slice(start);
            }
            this.blogDetail = blogDetail;
        }
    }
};
</script>

<style lang="less" scoped>
#blogBrief {
    border-bottom: 1px solid gray;
    padding: 1rem 1rem;
    margin: 1rem;
    box-shadow: 0 0 5px 0.1px grey;
    border-radius: 0.2rem;
    a {
        text-decoration: none;
        &:link {
            color: black;
            text-decoration: none;
        }
        &:visited {
            color: black;
            text-decoration: none;
        }
        &:hover {
            color: black;
            text-decoration: none;
        }
        &:active {
            color: black;
            text-decoration: none;
        }
    }
    #blogTitle {
        color: rgb(0, 102, 255);
        font-size: 1.5rem;
        font-weight: bold;
    }
    #blogDetail {
        margin: 0.2rem 0 0.2rem 0;
    }
    #blogHead {
        &::before {
            content: " ";
            height: 1rem;
            width: 100%;
            display: block;
            border-bottom: 1px dashed grey;
            float: right;
        }
        #blogKeyword {
            display: block;
            
        }
        #blogDate {
            margin-right: 1rem;
            float:right
        }

        #classification {
            display: inline-block;
            margin-right: 1rem;
        }
        &::after {
            content: "";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }
}
</style>