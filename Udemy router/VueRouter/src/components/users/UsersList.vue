<template>
  <div class="container">
    <div class="form">
      <label for="">Seach</label>
      <input type="text" v-model="search" placeholder="search for fullName" />
    </div>
    <ul>
      <user-item v-for="user in users1" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
    </ul>
  </div>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      search: " ",
    };
  },
  methods: {},
  computed: {
    users1() {
      if (this.search) {
        return this.users.filter((item) =>
          item.fullName.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.users;
      }
    },
  },
  watch: {
    search(value) {
      if (value) {
        this.$router.push({
          query: {
            search: this.search.trim().replace(/ /g, "%"),
          },
        });
      }
    },
  },
  created() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search.replace(/%/g, " ")
    }

    // //  KIEM SOAT QUERY STRING O this.$watch
    // this.$watch(
    //   () => this.$route.query.search,
    //   (value) => {
    //     if (value.length > 10) {
    //     confirm(
    //         `==> khong duoc tim kiem qua 10 ky tu `
    //       );
    //     }
    //   }
    // );

    // console.log("this.$router - router lớn", this.$router);
    // console.log("this.$route - router con", this.$route);
  },
  // beforeRouteEnter(to, from, next) {
  // // NEXT(FALSE) DÙNG ĐỂ CHẶN TRUY CẬP
  //   next(false);
  // },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  background-color: aquamarine;
  margin: 20px;
}

.form>input {
  outline: none;
  padding: 4px 8px;
  font-size: 1.5rem;
}

ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>