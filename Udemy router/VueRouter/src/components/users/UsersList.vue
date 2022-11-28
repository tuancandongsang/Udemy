<template>
  <div class="container">
    <div class="form">
      <label for="">Seach</label>
      <input type="text" v-model="search" placeholder="search for fullName" />
    </div>
    <ul>
      <user-item
        v-for="user in users"
        :key="user.id"
        :name="user.fullName"
        :role="user.role"
      ></user-item>
    </ul>
  </div>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  // inject: ['users'],
  data() {
    return {
      search: this.$route.query.search,
      users: [
        { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
        { id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer' },
        { id: 'u3', fullName: 'Julie Jones', role: 'Engineer' },
        { id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant' },
        { id: 'u5', fullName: 'Marie Smith', role: 'Consultant' },
      ],
    };
  },
  methods: {},
  computeds: {
    users() {
      if (this.search) {
        return this.users.filter((user) =>
          user.fullName.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.users;
      }
    },
  },
  watch: {
    search(value, _) {
      console.log(_);
      if (value) {
        this.$router.push({
          query: {
            search: this.search.trim(),
          },
        });
        console.log(this.$route.query.search);
      }
    },
  },
  created() {
    console.log(this.users);
    this.$watch(
      () => this.$route.query.search,
      (value, _) => {
        this.search = value;
        console.log(_);
      }
    );
  },
  // beforeRouteEnter(to, from, next) {
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
.form > input {
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