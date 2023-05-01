<!-- html 템플릿 코드 -->
<template>
    <div class="mytemp">
        <span class="tit">{{txt}}</span>
    </div>
</template>

<!-- JS 코드 -->
<script>
export default(await import("vue").undefineComponent({
    name: "myTemp",
    data(){
        return{
            txt: "연습"
        }
    }
}))
</script>

<!--스타일 시트 코드 -->
<style scoped>
    span.tit{color:red}
</style>