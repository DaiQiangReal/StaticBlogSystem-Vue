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
            blogContent:"内容获取失败",

        }
    }
}
</script>

<style lang="less" scoped>

</style>>

