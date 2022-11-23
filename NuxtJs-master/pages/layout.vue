<template>
    <div>
        <h1>Layout</h1>
        <p>
            - Ta có thể chọn 1 file pages vào 1 layout mong muốn bằng thuộc tính layout:'layout' <br>
            hoặc có thể dưới dạng function <br>
            <!-- <img src="../assets/8.png" alt=""> <br> -->
            <img src="../assets/10.png" alt=""> <br>
            - Tương tự có thể tuỳ chỉnh 1 <b>route</b> nào đó vào 1 layout nhất định đã xếp ở file layout <br>
            - Trong forder layout có thể cấu hình nhiều màn hình layout mà ta mong muốn, sau đó tuỳ chỉnh <b>route</b>
            con vào đó <br>
            <img src="../assets/9.png" alt=""> <br>
        </p>
        <h2>sử dụng Dynamic Layout và middleware</h2>
        <b>middleware</b> <br>
        <p>
            - là 1 tập hợp các function, chạy trước khi render component, áp dụng cho việc check login, ... tương tự như
            beforeEach <br>
            - tạo foder midderware , tạo file name, import file name vào nust.config.js <br>
            - thứ tự chạy : middleware ở forder middleware sẽ chạy trước, rồi mới tới render component <br>
            <b>ví dụng về Dynamic Layout và middleware</b> <br>
            - xét cấu hình giao diện màn hình hiển thị để chọn layout là destop hay mobile <br>
            b1: tạo 2 laylout với 1 là destop 1 là mobile <br>
            <img src="../assets/12.png" alt=""> <br>
            b2: tạo forder midderware và file mobile.js, bên trong file mobile.js viết hàm xét cấu hình giao diện người
            dùng <br>
            <img src="../assets/13.png" alt=""> <br>
            b3: khai báo ở file nuxt.config.js <br>
            <img src="../assets/14.png" alt=""> <br>
            b4: thộc tính layout vào component <br>
            <img src="../assets/15.png" alt=""> <br>
        </p>
        <b>serve middleware</b> <br>
        <p>
            - chỉ chạy ở phía serve
        </p>
        <button
            style=" padding: 8px 12px; background-color: antiquewhite; border: none; border-radius: 4px; cursor: pointer;"
            v-on:click="() => handleBack(this.$router.go(-1))">BACK</button>
    </div>
</template>

<script>
export default {
    
    // layout:'blog',
    layout(context) {
        // console.log("[context user.vue]", Object.keys(context));
        return context.isMobile ? 'mobile' : 'blog'
        // console.log('userAgent', userAgent);
        // console.log('navigator', navigator);
        // return 'admin'
    },
}
</script>

<style>

</style>