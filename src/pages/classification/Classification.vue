<template>
    <div id="main">
        <TopBar :hightLight="classification" />
        <div id="content">
            <div id="blogList">
                <BlogBrief
                    v-for="filename in blogList"
                    :key="filename"
                    :classification="classification"
                    :filename="filename"
                />

                <h1 v-if="blogList.length===0" style="text-align:center">未找到文件</h1>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from "../../components/TopBar";
import BlogBrief from "../../components/BlogBrief";
export default {
    name: "Classification",
    data() {
        return {
            classification: null,
            blogList: []
        };
    },
    components: {
        TopBar,
        BlogBrief
    },
    created() {
        let url = window.location.href;
        let reg = /\?classification=.+/;
        let parmas = reg.exec(url)[0] ? reg.exec(url)[0] : null;
        this.classification = parmas.slice(16);
        this.getBlogList();
    },
    mounted() {},
    methods: {
        async getBlogList() {
            let nameTxtCountent = await (
                await fetch("./blogs/" + this.classification + "/name.txt")
            ).text();
            this.blogList = nameTxtCountent
                .split("\n")
                .map(blogFile => blogFile.trim());
            if (this.blogList[0].indexOf("<!DOCTYPE html>") !== -1) {
                this.blogList = [];
            }
        }
    }
};
</script>

<style lang="less" scoped>
#main {
    #content {
        margin-top: 3rem;
        width: 80vw;
        margin: 3rem 10vw 0 10vw;
        #blogList {
            width: 45vw;
        }
    }
}
</style>