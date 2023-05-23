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