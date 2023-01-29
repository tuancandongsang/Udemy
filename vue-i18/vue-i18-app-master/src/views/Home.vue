<template>
  <div>
    <input type="text" :placeholder="$t('common.select_lang')" />
    <p>{{ $t("common.select_lang") }}</p>
    <p>{{ $t("login.title") }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>