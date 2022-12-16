<template>
    <div class="container">
        <div class="item">
           <b>Customer Reviews</b>
           <p>
            <a-rate v-model:value="value" allow-half /> <span>Based on 6 reviews</span>
           </p>
        </div>
        <div class="item">
            <a-rate v-model:value="value" allow-half />
            <br>
            <br>
            <span>Comment: tuancandongsang</span>
        </div>
        <div class="item">
            <a-rate v-model:value="value" allow-half />
            <br>
            <br>
            <span>Comment: Ha Trung Hieu</span>
        </div>
        <div class="item">
            <a-rate v-model:value="value" allow-half />
            <br>
            <br>
            <span>Comment: Hiep</span>
        </div>
    </div>
</template>
<style scoped>
.container{
    border: 1px solid #ECECEC;;
}
.item{
    border-bottom: 1px solid #ECECEC;;
    padding: 15px 20px;
}
</style>
<script>
export default {
    data(){
        return{
            value:4,
        }
    }
}
</script>
