<template>
    <div>
        <div id="blogHead">
            {{blogHead}}
  </div>
  <div id="blogContent">
      {{blogContent}}
  </div>
    </div>
  

</template>

<script>
export default {
    data(){
        return{
            name:"Blog",
            blogPath:null,
            blogHead:"标题获取失败",
            blogContentStr:null,
            blogContent:"内容获取失败",

        }
    },
    mounted(){
        let url=window.location.href;
        let reg=/\?[\w\W]+/;
        let parmas=reg.exec(url)[0]?reg.exec(url)[0]:null;
        if(parmas){
            parmas=parmas.slice(1).split("&");
            this.blogPath='./blogs/'+parmas[0].slice(5)+"/"+parmas[1].slice(9);
        }
        this.getBlogContent();
    },
    methods:{
        async getBlogContent(){
            this.blogContent=await (await fetch(this.blogPath)).text();
            console.log(this.blogContent)
        }
    }
}
</script>

<style lang="less" scoped>

</style>>

