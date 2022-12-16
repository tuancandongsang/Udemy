<template>
  <div v-if="linkItem" :data-aos="animation">
    <nuxt-link :to="feature.link">
      <div class="card item-app-section-content">
        <div
          class="rounded-xl icon-feature mr-8"
          :class="`bg-${feature.bgIcon}`"
        >
          <img :src="require(`~/assets/images/icons/${feature.icon}`)" alt="" />
        </div>
        <div>
          <h4 class="card-title text-capitalize">
            {{ $t(feature.title) }}
          </h4>
          <p class="card-body">{{ $t(feature.desc) }}</p>
          <nuxt-link :to="feature.link">
            <span>{{ $t("labels.detail") }}...</span>
            <v-icon>mdi-arrow-right</v-icon>
          </nuxt-link>
        </div>
      </div>
    </nuxt-link>
  </div>
  <div v-else :data-aos="animation">
    <div
      class="card d-flex flex-column align-center justify-center text-center no-link item-app-section-content"
    >
      <div class="rounded-xl icon-feature" :class="`bg-${feature.bgIcon}`">
        <img :src="require(`~/assets/images/icons/${feature.icon}`)" alt="" />
      </div>
      <div>
        <h4 class="card-title text-capitalize">
          {{ $t(feature.title) }}
        </h4>
        <p class="card-body">{{ $t(feature.desc) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    linkItem: {
      type: Boolean,
      default: false,
    },
    feature: {
      type: Object,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    animation: {
      type: String,
      default: '',
    }
  },
};
</script>

<style lang="scss" scoped></style>
