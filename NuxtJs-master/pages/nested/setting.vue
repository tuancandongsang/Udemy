<template>
  <div>
    <h1>setting nested</h1>
    <h2>active-class và exact-active-class trong nuxt-link </h2>
    <p>
      là các atribuil class của nuxt-link <br>
      <b>active-class</b>: khớp 1 phần nếu chứa đường dẫn route có đường link được chọn <br>
      <b>exact-active-class </b>: khớp toàn bộ nếu route có đường dẫn đó <br>
      - như ví dụ trên ta có thể thay vào
    </p>
    <b> Phần này bị phá layout do có kèm thẻ script vào head()</b>
  </div>
</template>

<script>
export default {
  created() {
  },
  data() {
    return {
      title: `User ${this.$route.params.userId}`
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'alo',
          content: 'user page description'
        }
      ],
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
          rel: "stylesheet",
          integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
          crossorigin: "anonymous",
        }
      ],
      script: [
        {
          body: true,
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
          integrity: "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
          crossorigin: "anonymous"
        }
      ]
    }
  }
}
</script>

<style>

</style>