<template>
    <div>
        <h1>Plugins</h1>

        <p>
            Có 3 các khai báo plugins <br>
            <b>c1</b> - khai báo dạng thư viện như axios.... các thư viện viết sẵn ta chỉ cần install về và dùng <br>
            <b>c2</b> - khai báo ở trong nuxtJs ở trong ứng dụng Vue.use(_name) <br>
            cài ứng dụng notifications => npm i vue-notification <br>
            tạo forder plugins => tạo file vue-notifications.js <br>
            <img src="../../assets/16.png" alt=""> <br>
            vào nuxt.config.js cài đặt plugin đó vào <br>
            1 số thư viện phải sử dụng mode:'client', vì 1 số thư viện k chạy ở trình duyệt - window (DOM) mà chỉ chạy ở document(serve) <br>
            <img src="../../assets/17.png" alt=""> <br>
            ở component nào muốn sử dụng noty thì ta gọi ở đó <br>
            <img src="../../assets/18.png" alt=""> <br>
            lúc này <b>console.log(this.$notify)</b> sẽ ra 1 hàm ở trong đối tượng nuxtJS <br>
            <img src="../../assets/19.png" alt=""> <br>
            <b>c3</b>  tạo 1 thư viện  <br>
            tại forder plugins => tạo file hello.js <br>
            <img src="../../assets/20.png" alt=""> <br>
            vào nuxt.config.js cài đặt plugin đó vào <br>
            <img src="../../assets/21.png" alt=""> <br>
            ở component nào muốn sử dụng noty thì ta gọi ở đó <br>
            <img src="../../assets/23.png" alt=""> <br>
            <img src="../../assets/24.png" alt=""> <br>
        </p>
        <h2>lưu ý:</h2>
            <b>inject</b> sẽ nhúng vào đối tượng vue còn <b>context</b> sẽ vài obj context có thể sử dụng trong middleware <br>
            <img src="../../assets/25.png" alt="">
        <notifications group="foo" />
    </div>
</template>
<script>
export default { 
    created(){
        console.log(this.$notify);
        console.log(this.$abc);
        console.log(this.$abc('tuancan'));
    }, 
    mounted() {
        this.$notify({
            group: 'foo',
            title: 'Important message',
            text: 'Hello user! This is a notification!'
        })
    },
}
</script>

<style>

</style>