<template>
    <div id="main">
        <TopBar :hightLight="classification"/>
    </div>
</template>

<script>
import TopBar from "../../components/TopBar"

export default {
    name: "Classification",
    data() {
        return {
            classification:null,
            blogList:[]
        };
    },
    components: {
        TopBar,
    },
    created() {
        let url = window.location.href;
        let reg = /\?classification=.+/;
        let parmas = reg.exec(url)[0] ? reg.exec(url)[0] : null;
        this.classification = parmas.slice(16);
        
    },
    mounted() {},
    methods: {
        
    }
};
</script>

<style lang="less" scoped>

</style>