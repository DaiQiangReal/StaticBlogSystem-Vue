<template>
  <div>
      List
  </div>
</template>

<script>
export default {
    props:['classification'],
    data(){
        return {
            name:"BlogsList",
            blogListData:null,
            components:{
            },
        }
    },
    computed:{
    
    },
    watch:{
    },
    mounted(){
        this.getBlogsDateByClassification()
    },
    methods:{
        async getBlogsDateByClassification(){
            if(!this.classification){
                console.log("try again after 100ms");
                setTimeout(this.getBlogsDateByClassification,100);
                return;
            }
            let nameTxtCountent=await (await fetch("./blogs/"+this.classification+"/name.txt")).text();
            this.blogListData=nameTxtCountent.split('\n').map((blogFile)=>blogFile.trim())
        },
        async getBlogContentByFilename(blogFileName){
            let text=await (await fetch("./blogs/"+this.classification+"/"+blogFileName)).text();
            
        }
    },
    
}
</script>

<style lang="less" scoped>

</style>>
