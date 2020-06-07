<template>
        <div id="blogHead">
            <div id="title">
                <h1>{{blogHead.title}}</h1>
            </div>
            <div id="date">
                创建时间:{{blogHead.date}}
            </div>
            <div id="keyword">
                关键词: {{blogHead.keyword}}
            </div>
  </div>
 

  

</template>

<script>
import Engine from "../core/markdownEngine/Engine"
import "../core/markdownEngine/Engine.css"
export default {
    props:["markdownFileContent"],
    data(){
        return{
            name:"BlogHead",  
            blogHead:{
                title:"加载中...",
                date:"加载中...",
                keyword:"加载中..."
            },
            engine:null
        }
    },
    created(){
        this.getBlogHead();
    },
    beforeMount(){

    },
    mounted(){
    },
    methods:{
        async getBlogHead(){
            if(this.markdownFileContent===null)
                return;
            try{
            this.engine=new Engine(this.markdownFileContent);
            this.blogHead=this.engine.getBlogHead();
            }catch(e){
                this.blogHead="获取标题信息失败"
                throw e;
            }
        }
    },
    watch:{
        markdownFileContent(){
            this.getBlogHead();
        }
    }
}
</script>

<style lang="less" scoped>

</style>>

