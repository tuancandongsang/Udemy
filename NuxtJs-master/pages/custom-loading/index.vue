<template>
  <div>
    <h1>custome loading</h1>
    <h2>Tại sao lại cần loading??</h2>
    <p>
      Vì Nuxt lần đầu tiên chạy là SSR, còn các lần tiếp theo chuyển đổi giữa
      các component lại là CSR. khi chuyển đổi giữa các component thì vẫn cần
      gọi dữ liệu về và mất 1 khoảng thời gian nào đó mới có dữ liệu đầy đủ để
      hiển thị <br />
      vì vậy để trải nghiệm mượt mà hơn ta có thể sử dụng loading của nuxt thay
      cho async component của vuejs.
    </p>
    <p>thanh loading được chạy như trong hình là mặc định của nuxt</p>

    <u><b> loading khi chuyển component, mặc định hoặc có thể tự tạo</b></u>
    <br />
    <h3>
      <p>với trường hợp mặc định</p>
    </h3>
    <p>vào file nuxt.config.js sửa loading các thuộc tính của thanh loading</p>
    <p>
      loading: { <br />
      color: 'blue', // màu thanh loading <br />
      height: '5px', // chiều cao thanh loading <br />
      throttle : 1000, // độ chễ khi chạy loading vd: sau 1s thanh loading mới
      chạy <br />
      failedColor: 'red', /// màu khi lỗi <br />
      css: true, // css true: sử dụng css của nuxt loading. false thì sẽ là dùng
      của dev tạo <br />
      rtl: true, // false thanh loading chạy từ trái xang phải, true thanh
      loading chạy phải xang trái <br />
      }
    </p>
    <p>
      <b>lưu ý:</b> bình thường <b>css: true</b> thì khi chuyển giữa các
      component loading vẫn chạy, chỉ là thời gian lấy dữ liệu và render nhanh
      quá ta không để ý và nhìn thấy nên trong ví dụ này ta để thời gian là 2s
      cho thanh hiện :D
    </p>
    <h3>
      <p>với trường hợp tự tạo</p>
    </h3>
    <p>
      <b>vào file nuxt.config.js => loading => chọn css: false </b> để tắt css
      mặc định nuxt loading, sau đó tự build màn hình chờ chuyển trang
    </p>
    <button>
      <nuxt-link to="/">home</nuxt-link>
    </button>
    <button v-on:click="()=>handleBack(this.$router.go(-1))">BACK</button>
  </div>
</template>

<script>
export default {
  asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    return new Promise((resolve, redirect) => {
      setTimeout(function () {
        resolve({});
        // redirect({error: 'co loi say ra'})
      }, 2000);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
  },
};
</script>

<style>
</style>