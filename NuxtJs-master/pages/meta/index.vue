<template>
  <div>
    <h1>Meta tag</h1>
    <h3>Là 1 phàn quang trọng trong SEO</h3>
    <p>
      vì khi tìm kiếm. phần description của head sẽ chính là nơi cho ra thông
      tin kết quả tìm kiếm hiển thị, ngoài ra còn ảnh.... là các yếu tố mà ta
      cần cài đặt ở head và meta
    </p>
    <p>
      <b>- c1: Cấp global:</b> Có thể khai báo cho toàn bộ app ở file
      nuxt.config.js,
    </p>
    <p>head này sẽ có tác dụng ở tất cả các component trong app</p>
    <p>Ví dụ trong ảnh, gắn link family=Roboto vào app, ta sẽ kiểm tra f12</p>
    <img src="../../access/30.png" alt="" /> <br />

    <p>
      <b> - c2: sử dụng ở cấp component dưới dạng head:{}</b> <br />
      ở mỗi component sẽ tự khai báo head riêng <br />
      tuy nhiên dữ liệu sẽ là fix cứng và không gán giá trị data vào được <br />
      <img src="../../access/32.png" alt="" /> <br />
    </p>

    <p>
      <b>- c3 : sử dụng head như 1 function </b> và lấy dữ liệu từ data trong
      component gắn vào. sau đó đẩy lên header <br />
      chính phần <b> content: this.description của thẻ Meta</b> sẽ hiển thị lên
      kết quả tìm kiếm của gg <br />

      <img src="../../access/31.png" alt="" />
    </p>

    <p>
      ngoài ra có thể tìm kiếm <b>open graph hoặc các thẻ meta hỗ trợ SEO</b> để
      xem thêm nhiều thẻ META
    </p>
    <p>
      meta property="og:title" content="The Rock" => tiêu đề được nhìn thấy 1
      phần khi tìm kiếm <br />
      meta property="og:type" content="video.movie" => Kiểu tiêu đề <br />
      meta property="og:url" content="https://www.imdb.com/title/tt0117500/" =>
      hiển thị url khi tìm kiếm <br />
      meta property="og:image"
      content="https://ia.media-imdb.com/images/rock.jpg" => hình ảnh hiển thị
      khi tìm kiếm <br />
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Meta Tag vs SEO",
      description:
        "Hiện nay, SEO được thực hiện đa dạng với nhiều loại hình khác nhau, trong đó nổi bật là",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "alo",
          content: this.description,
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/123.jpg" }],
      script: [
        {
          body: true,
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
          crossorigin: "anonymous",
        },
      ],
    };
  },
  // head: {
  //   // title: this.title1,
  //   title: "Meta Tag vs SEO",
  //   description:"Hiện nay, SEO được thực hiện đa dạng với nhiều loại hình khác nhau, trong đó nổi bật là",
  //   meta: [
  //     {
  //       hid: "description",
  //       name: "alo",
  //       content: "user page description",
  //     },
  //   ],
  //   link: [{ rel: "icon", type: "image/x-icon", href: "/123.jpg" }],
  // },
};
</script>

<style>
</style>>