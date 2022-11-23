<template>
  <div class="flex">
    <div>
      <h1>Structure thông thường của 1 dự án</h1>
      <ul>
        <li><b>Assets</b>: chứa ảnh, các file tĩnh</li>
        <li><b>Component</b>: chứa các component dùng chung</li>
        <li><b>Layouts</b>: chia layouts cho nhiều cấu hình trang</li>
        <li>
          <b>Middleware</b>: chứa những Middleware dùng để custome function trước khi
          render component ( tựa như beforeEach trong router)
        </li>
        <li>
          <b>Pages</b> : là thư mục quan trọng của nuxtJS, cấu hình thư mục sẽ chỉ định
          thay cho router trong project, tạo các file theo cấu trúc mẫu định sẵn
          của nuxt để có đường dẫn router mong muôn
        </li>
        <li><b>Mixin</b>: chứa các hàm, data... chung có thể import và sử dụng trong các component</li>
        <li><b>plugins</b>: chứa các thư viện mà chúng ta muốn sử dụng. nó sẽ chạy trước khi mounting component</li>
        <li><b>static</b>: chứa file hoặc ảnh tĩnh mà k sử lý wepback</li>
        <li><b>Store</b> : chứa global state</li>
        <li><b>nuxt.config.js</b> : chứa tổng quan gần như toàn bộ config của nuxt</li>
      </ul>
      <h2>1 số lưu ý và đặc điểm thêm của Nuxt so với Vue</h2>
      <p>- Sử dụng component mà không cần Import và dùng phương thức component{} để khai báo sử dụng ở thẻ script như
        trong Vuejs. Bằng cách <br>
        - Vào nuxt.config.js => components: true   <br>
        ==>> chỉ áp dụng ở phiên bản 2.13 trở lên <br>
        <b>Lưu ý</b>: với những dự án nhiều component nhỏ mà auto import sẽ rất khó kiểm soát vì rất dễ gây trùng tên -
        nên cần phải <b>đặt tên thật chi tiết</b> <br>
        nếu không muốn auto import thì có thể chọn chế độ <b> components: false </b> sau đó sử dụng import component như
        vuejs thông thường <br>
      </p>
      <p>
        <b>ScollToTop:</b> là 1 thuộc tính có sẵn của nuxtJS, khai báo ở cấp độ component. <br>
        khi chuyển giữa các compont dài, khi khai báo scollToTop: true ở component đó, thì trình duyệt sẽ tự động kéo lên đầu tiên
      </p>
    </div>
    <div>
      <img src="../../assets/contructer.png" alt="">
    </div>
  </div>
</template>

<script>
export default {

  scrollToTop: true
};
</script>

<style scoped>
.flex {
  display: flex;
}
</style>