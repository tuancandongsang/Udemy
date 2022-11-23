<template>
  <div>
    <div class="flex">
      <div>
        <h1>Nested Routes</h1>
        <p><b>Nested Routes: kế thừa lại layout có sẵn</b> <br>
          - Như ví dụ trên, mỗi khi click _userID, _userName thì sẽ chuyển ra 1 trang hoàn toàn mới, và không
          kế thừa các thông tin của component routing hay id, name <br>
          - sơ đồ ảnh dưới, ta muốn phần foo.vue thay cho bar.vue còn lại các phần khác k đổi (tựa như
          keepAlive trong vue) <br>
          <img src="../../assets/layout.png" alt=""> <br>
          - chèn 1 thẻ component có sẵn của Nuxt là NuxtChild vào chỗ cần thay thế trong nested.vue  <br>
          cấu tạo pages như sau <br>
          <img src="../../assets/6.png" alt="">  add bên trong <img src="../../assets/66.png" alt=""> <br>
        </p>
      </div>
      <div>
        <img src="../../assets/filesystemrouting.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.flex{
  display: flex;
}
</style>