<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
        <li>
          <router-link to="/nested">Nested Named Views </router-link>
        </li>
        <li>
          <router-link to="/login" v-if="login">Login</router-link>
          <!-- <router-link to="/login" @click="TOGGLE_LOGIN" v-else>LogOut</router-link> -->

          <a-popconfirm v-else title="Are you sure delete this task?" ok-text="Yes" cancel-text="No" @confirm="confirm"
            @cancel="cancel">
            <span>Logout</span>
          </a-popconfirm>

        </li>
      </ul>
    </nav>

  </header>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { message } from 'ant-design-vue';
export default {
  // watch:{
  //   login(newlogin,oldlogin) {
  //      if(newlogin){
  //       console.log('newlogin', this.login);
  //     } else{
  //       console.log("oldlogin", oldlogin, this.login);
  //     }
  //   }
  // },
  computed: mapGetters(['login']),
  methods: {
    ...mapMutations(['TOGGLE_LOGIN']),
    confirm(e) {
      console.log(e);
      message.success('Click on Yes');
      this.$router.push('/login')
      this.TOGGLE_LOGIN()
    },
    cancel(e) {
      console.log(e);
      message.error('Click on No');
    }
  },
  // created(){
  //   console.log("login",this.login);
  // }
}
</script>
<style scoped>
span{
  color: #fff;
}
span:hover{
  cursor: pointer;
  border: #f1a80a 2ps solid;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>