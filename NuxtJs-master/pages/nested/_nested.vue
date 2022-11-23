<template>
  <div>
    <h3>uderId page {{ this.$route.params.nested }}</h3>

    <h1>validate trong nuxtJS</h1>
    <p>
      -Là 1 <b>methods</b> riêng của nuxtjs. giúp chúng ta kiểm tra xem router nhập vào có đúng với mong muốn hay
      không, như các dynamic router ví dụ trên, đường dẫn /routing/20 vẫn đăng nhập vào nuxtlink /routing/1 được.
      <br>
      để kiểm soát điều này ta phải dùng validate() trong nuxtJS được gọi trước router được chuyển hướng ở 1
      component <br>
      <b>Lưu ý:</b> trong vuejs ta sử dụng các hàm như beforeEnter(), cũng ở cấp compponent <br>
      validate(context) => context là 1 object trong đó có nhiều thuộc tính, trong trường hợp này, ta cần lựa ra các
      thuộc tính mong muốn kiểm soát link là params <br>
      ta có thể console.log('context', context); xem bên trong context có những gì nhằm lấy ra thuộc tính phù hợp, ở đây
      context.params.nested là lấy ra router động của component <br> <br>
      validate(context) { <br>
      if(context.params.nested === "20"){ <br>
      return true <br>
      } <br>
      return false // if the params are valid <br>
      }, <br>
      - ở đây, do fix cứng nên giá trị dynamic là string 20, ta có thể đặt biến trong data và sử dụng <b>regex</b> để áp giá
      trị mong muốn như là số, có ký tự đặc biệt, có dấu cách....
    </p>


  </div>
</template>

<script>
export default {
  data() {
    return {
      title: `User ${this.$route.params.nested}`
    }
  },
  validate(context) {
    console.log('context', context);
    if (context.params.nested === "20") {
      return true
    }
    return false // if the params are valid
  },
}
</script>

<style>

</style>