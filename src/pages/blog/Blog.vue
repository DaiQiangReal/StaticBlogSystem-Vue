<template>
    <div id="app">
        <div id="blogHead" >
            <BlogHead :markdownFileContent="markdownFileContent"/>
        </div>
        <div id="blogContent" ></div>
        <BlogContent :markdownFileContent="markdownFileContent"/>
    </div>
</template>

<script>
import BlogHead from "../../components/BlogHead"
import BlogContent from "../../components/BlogContent";

export default {
    name: "App",
    data() {
        return {
            markdownFileContent: null,
            markdownFilePath: "",
        };
    },
    components: {
        BlogHead,
        BlogContent
    },
    beforeMount() {
        let url = window.location.href;
        let reg = /\?[\w\W]+/;
        let parmas = reg.exec(url)[0] ? reg.exec(url)[0] : null;
        if (parmas) {
            parmas = parmas.slice(1).split("&");
            this.markdownFilePath =
                "./blogs/" + parmas[0].slice(5) + "/" + parmas[1].slice(9);
        }
        this.getMarkdownFileContent();
    },
    mounted() {},
    methods: {
        async getMarkdownFileContent() {
            try{
            this.markdownFileContent=await (await fetch(this.markdownFilePath)).text();
            }catch(e){
                console.log("获取博文markdown失败");
                throw e;
            }
        }
    }
};
</script>

<style>
#app {
}
</style>
