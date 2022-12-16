<template>
  <section id="roadmap" class="py-8">
    <v-container>
      <div class="roadmap-title">
        <p
            data-aos="zoom-in"
            class="text-center"
            v-html="$t('homePage.sections.roadmap.title')"
        ></p>
      </div>
    </v-container>
    <div class="roadmap-deatail text-center" data-aos="zoom-in" :data-aos-delay="500">
      <img :src="require(`~/assets/images/roadmap/pc.svg`)" class="hidden-sm-and-down" alt="Mô hình chuyển đổi số trong DN 5"/>
      <img class="hidden-md-and-up" :src="require(`~/assets/images/roadmap/tablet.svg`)"/>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
