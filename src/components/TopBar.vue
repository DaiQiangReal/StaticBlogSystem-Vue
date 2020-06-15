<template>
    <div id="topbar">
        <a
            id="classification"
            :class="hightLight==='index'?'hight-light':''"
            :href="'./index.html'"
        >首页</a>
        <a
            id="classification"
            v-for="classification of classifications"
            :key="JSON.stringify(classification)"
            :class="Object.keys(classification)[0]===hightLight?'hight-light':''"
            :href="'./classification.html?classification='+Object.keys(classification)[0]"
        >{{Object.values(classification)[0]}}</a>
    </div>
</template>

<script>
export default {
    props: ["hightLight"],
    data() {
        return {
            name: "TopBar",
            classifications: []
        };
    },
    created() {
        this.getClassifications();
    },
    methods: {
        async getClassifications() {
            if (this.classifications.length !== 0) return;
            let classTxtContentList = (
                await (await fetch("./blogs/name.txt")).text()
            ).split("\n");
            for (let classStr of classTxtContentList) {
                if (!/.+:.+/.test(classStr)) continue;
                let folderName = classStr.slice(0, classStr.indexOf(":"));
                let showName = classStr.slice(classStr.indexOf(":") + 1);
                let classification = {};
                classification[folderName] = showName;
                this.classifications.push(classification);
            }
        }
    }
};
</script>

<style lang="less" scoped>
#topbar {
    background: rgba(134, 205, 233, 0.5);
    position: fixed;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 100vw;
    padding: 0 10vw 0 10vw;
    // margin: 0 10vw;
    height: 3rem;
    justify-content: flex-end;
    box-shadow: 0 0 5px 0.1px;
    backdrop-filter: blur(30px);
    a {
        color: black;
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

    #classification {
        display: inline-block;
        
        height: 1rem;
        min-width: 2rem;
        line-height: 1rem;
        // margin: 1rem 1.5rem 1rem 1.5rem;
        margin: 1rem 0.75rem 1rem 0.75rem;
        transition: 200ms;
        padding-bottom: 0.3rem;
        &:first-child{
            margin-right: auto;
        }
        &:hover {
            color: rgb(30, 102, 210);
            cursor: pointer;
        }
        &[class="hight-light"] {
            border-bottom: 2px solid grey;
        }
    }
}
</style>