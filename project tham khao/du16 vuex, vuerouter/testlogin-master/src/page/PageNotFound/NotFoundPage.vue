<template>
  <div id="not-found-page">
    <div class="box">
      <h3>404</h3>
      <p>{{$tc('pagenotfound')}}</p>
      <RouterLink to="/">
        <button type="button" class="btn-submit">{{$tc('backtologin')}}</button>
      </RouterLink>
    </div>
  </div>
</template>
<script >
</script>
<style scoped lang="scss">
@import "@/styles/index.scss";

#not-found-page {
  .box {
    background-color: $bg-app;
    min-height: 100vh;
    align-items: center;
    @include flexCenter;
    flex-direction: column;

    h3 {
      margin: 0 0 50px;
      font-size: 170px;
      font-weight: 600;
      line-height: 110px;
      @media screen and (max-width: 1024px) {
        font-size: 8rem;
      }
      @media screen and (max-width: 768px) {
        font-size: 4rem;
      }
    }

    button {
      @include borderDefault;
      padding: 9px 20px;
      border-radius: 10px;
      cursor: pointer;
      @media screen and (max-width: 425px) {
        width: 150px;
      }

      &:hover {
        color: $bg-app;
        background-color: $btn-error;
      }
    }
  }
}
</style>
