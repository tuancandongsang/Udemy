<template>
    <div>
        <h1>Vì sao lại sinh ra biến môi trường?</h1>
        <p>
            Có nhiều môi trường để chạy dự án như develop, build, test.... <br>
            rất có thể các môi trường đó sẽ có những api, biến giá trị... khách nhau mà ta cần thay đổi <br>
            vd: Truy cập server API backend thông qua một URL. <br>
            URL này có thể giống như <b><u>http://localhost:8080/api</u></b> khi đang phát triển và
            <b><u>https://site.com/api</u></b> trong
            production khi dự án được triển khai. <br>
            Như vây, với các môi trường khách nhau thì ta cũng có sự lựa chọn khác nhau về biên môi trường <br>

        </p>
        <h1>Cấu trúc biến môi trường</h1>
        Biến môi trường với Vue thông qua các file có phần mở rộng .env . <br>
        Các file này chịu trách nhiệm lưu trữ thông tin dành riêng cho môi trường (phát triển, thử nghiệm, production
        ,…) <br>
        <br>
        vd: khi tạo 1 dự án, ta sẽ tạo 2 file là dev.env.js và prod.env.js <br>
        - với dev.env.js tạo biến môi trường trong lúc dev bằng cách chạy: dev.env.js npm run dev <br>
        - prod.env.js trong lúc build lên môi trường thử nghiệm bằng cách chạy : prod.env.js npm run build <br>
        <br>
        <b>+ trong file dev.env.js ta viết</b> <br>
        'use strict'<br>
        const merge = require('webpack-merge') <br>
        const prodEnv = require('./prod.env') <br>
        module.exports = merge(prodEnv, { NODE_ENV: '"development"', ROOT_API: '"http://localhost/api"' }) <br>
        <br>
        <b> + trong file prod.env.js ta viết</b> <br>
        'use strict' <br>
        module.exports = { NODE_ENV: '"production"', ROOT_API: '"http://www.site.com/api"' } <br>
        <br>

        Sau khi tạo biến ROOT_API , ta có thể sử dụng nó ở bất kỳ đâu trong Vue thông qua đối tượng process.env global :
        <br>
        ở trong 1 file nào của app. ta có thể sử dụng biên môi trường <br>
        - khi chạy dev.env.js npm run dev vào dứng dụng <br>
        ở 1 trang bất kỳ ta chạy <br>
        mounted() { console.log(process.env.ROOT_API) } ==>> // http://localhost/api <br>
        <br>
        - khi chạy prod.env.js npm run build vào dứng dụng <br>
        folder dist sẽ được tạo với ứng dụng đã sẵn sàng để triển khai cho môi trường production <br>
        và biến ROOT_API sẽ hiển thị giá trị http://www.site.com./api , như đã chỉ định trong prod.env.js <br>
        ở 1 trang bất kỳ ta chạy <br>
        mounted() { console.log(process.env.ROOT_API) } ==>> // http://localhost/api <br>
        <br>
        <br>
        <b>=> với từng môi trường khác nhau ta có thể cấu hình biến môi trường khác nhau</b> <br>
        <br>
        <h1> ở Vue CLI 3:</h1>
        Nếu ứng dụng của bạn đang sử dụng Vue CLI mới , thay vào đó bạn cần có các file như .env và .env.prod ở folder
        root của dự án và bao gồm các biến như sau: <br>
        <br>
        <b>.env</b> <br>
        VUE_APP_ROOT_API=http://localhost/api <br>
        <br>
        <b>.env.prod</b> <br>
        VUE_APP_ROOT_API=http://www.site.com/api <br>
        Ở đây, tiền tố VUE_APP_ rất quan trọng và các biến không có tiền tố đó sẽ không khả dụng trong ứng dụng của bạn.
        <br>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>