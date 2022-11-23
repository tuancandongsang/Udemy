<template>
    <div>
        <div class="flex">
            <div>
                <h1>Routing and Pages</h1>
                <p>- NuxtJS sẽ tự cấu hình và setting file pages của chương trình thành các router</p>
                <B> ==>> lưu ý: tất cả những gì Router trong vueJS làm được thì pages Nuxt cũng làm được</B>, sau đây ta
                tìm hiểu 1 số
                cách thức sắp xếp chính của nuxtJS
                <p>- mặc định đầu tiên ctrinh chạy vào mỗi route và file index.vue </p>
                <p>- trong ảnh trên, sơ đồ thứ tự các router được sắp xếp theo thư mục của file pages</p>
                <p><b>ưu điểm</b>: dễ cấu trúc theo trực quan develop mà không cần nhiều kiến thức về <b>router</b></p>
                <h3>Dynamic router</h3>
                <p>với úng dụng có nhiều thư mục, file index.vue coi như trang chủ đầu tiên sẽ truy cập vào thư mục</p>
                <p>
                    - quy tắc đặc biệt đặt tên file với dynamic là _namefile.vue vd _userID.vue, _userName.vue ... <br>
                    - có thể truy xuất vào biến params thông qua thuộc tính &route.params.userID
                    - đường dẫn vào thư mục có dạng như sau /routing/_userID => chỏ vào file index.vue trong thư mục
                    _userID <br>
                    - thư mục có cấu tạo như sau <br>
                    <img src="../../assets/1dynamic.png" alt=""> <br>
                    - nếu muốn dynamic router với 2 lần dẫn động dạng <b>.../routing/_userID/setting/_userName </b> thì
                    thư mục có cấu tạo như sau<br>
                    - <img src="../../assets/2dynamic.png" alt=""> <br>

                    <button>
                        <nuxt-link to="/routing/1">.../routing/_userID</nuxt-link>
                    </button>
                </p>
            </div>
            <div style="margin-left: 20px">
                <img src="../../assets/routingdoc.png" alt="">
            </div>
        </div>

        <div>
            <NuxtChild />
            <button
      style=" padding: 8px 12px; background-color: antiquewhite; border: none; border-radius: 4px; cursor: pointer;"
      v-on:click="() => handleBack(this.$router.go(-1))">BACK</button>
            <button style="    padding: 8px 12px;
    background-color: antiquewhite;
    border: none;
    border-radius: 4px;
    cursor: pointer;">
                <nuxt-link to="/routing/example">Đi tới 1 số ví dụ về ROUTING</nuxt-link>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    layouts: 'user'
}
</script>

<style scoped>


.flex {
    display: flex;
    border-bottom: 1px solid #888;
    margin-bottom: 30px;
}
</style>