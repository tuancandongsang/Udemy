<template>
  <div id="not-found-page">
    <div class="box">
      <h3>404</h3>
      <p>PAGE NOT FOUND</p>
      <p class="desc">
        You may have mis-typed the URL. Or the page has been removed, had its
        name changed, or is temporarily unavailabl Actually, there is nothing to
        see here....
      </p>
      <RouterLink to="/">
        <button type="button" class="btn btn-dark btn-submit">
          Back to home
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<script lang="ts">
import "./not-found-page.scss";
</script>
