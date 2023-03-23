<script setup>
import { watch, reactive } from 'vue'
import debounce from 'lodash.debounce'
import * as api from '../../services/api'
import ShowList from '../Show/ShowList.vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import windowStore from '../../../../share/store/store'
import { tap } from 'rxjs'

let sharedTextSubscription = windowStore.createSubscription()
const state = reactive({
  query: '',
  items: [],
  isLoading: false
})

watch(
  () => state.query,
  debounce(async (newQuery) => {
    state.isLoading = true
    state.items = await api.searchShows({ query: newQuery })
    state.isLoading = false
  }, 250)
)
</script>
<script>
export default {
  data() {
    return {
      sharedTextInput: ''
    }
  },
  created() {
    sharedTextSubscription = windowStore.sharedText
      .pipe(tap((c) => (this.sharedTextInput = c)))
      .subscribe()
  },
  beforeUnmount() {
    sharedTextSubscription.unsubscribe()
  },
  methods: {
    inputSharedText(event) {
      // console.log(input)
      windowStore.setSharedText(event.target.value)
    }
  }
}
</script>
<template>
  <div class="search-shows">
    <label>Search your favorite show 🎥</label>
    <input
      @input="inputSharedText"
      data-test="search-input"
      type="text"
      placeholder="Search show"
    />

    <div class="loading" v-show="state.isLoading">
      <LoadingSpinner />
    </div>

    <ShowList
      v-if="!state.isLoading && state.items.length > 0"
      data-test="search-results"
      class="search-results"
      :items="state.items"
    >
      <h2>Search results</h2>
    </ShowList>
  </div>
</template>

<style>
.loading {
  display: flex;
  width: 100%;
  justify-content: center;
}
.search-shows {
  margin-bottom: calc(var(--spacing) * 3);
}

.search-results {
  margin-top: calc(var(--spacing) * 2);
}

label {
  display: block;
  font-weight: 700;
  margin-bottom: var(--spacing);
}
</style>
