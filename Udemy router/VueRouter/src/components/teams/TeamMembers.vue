<template>
  <section>
    <h2>{{ teamName }}</h2>
    <div>
      <button @click="handleAdd">+</button>
      <input class="input" type="text" v-model="text">
      <button @click="handleInscre">-</button>
    </div>
    <ul>
      <user-item v-for="member in members" :key="member.id" :name="member.fullName" :role="member.role"></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

 <!-- BỘ 3 COMPONENT ROUTER -->
  <!-- SỬ DỤNG watch ĐỂ THAY ĐỔI DATA KHI PARAMS THAY ĐỔI -->
<script>
import UserItem from '../users/UserItem.vue';
export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
      text: 1
    };
  },
  methods: {
    handleAdd() {
      this.text++
    },
    handleInscre() {
      this.text--
    },
    loadTeamMembers(teamId) {
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  created() {
    this.loadTeamMembers(this.teamId);
  },
  beforeRouteEnter(to, from, next) {
    const userWantsToLeave = confirm(
      '`==> truy cap vao beforeRouteEnter  .../users/:ID : ${this.teamId}!`'
    );
    next(userWantsToLeave);
  },
  beforeRouteUpdate(to, from, next) {
    this.text=1
    const userWantsToLeave = confirm(
      `==> thay doi beforeRouteUpdate .../users/:ID === ${this.teamId} !`
    );
    next(userWantsToLeave);
  },
  beforeRouteLeave(to, from, next) {
    const userWantsToLeave = confirm(
      `==> roi khoi beforeRouteLeave  .../users/:ID : ${this.teamId} !`
    );
    next(userWantsToLeave);
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
      // this.text = 1
    },
  },
};
</script>

<!-- SỬ DỤNG beforeRouteUpdate ĐỂ THAY ĐỔI DATA KHI PARAMS THAY ĐỔI -->
<!-- <script>
import UserItem from '../users/UserItem.vue';
export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
      text: 1
    };
  },
  methods: {
    handleAdd() {
      this.text++
    },
    handleInscre() {
      this.text--
    },
    loadTeamMembers(teamId) {
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  created() {
    this.loadTeamMembers(this.teamId);
  },
  beforeRouteUpdate(to, from, next) {
    this.text=1
    const userWantsToLeave = confirm(
      `==> thay doi beforeRouteUpdate .../users/:ID === ${this.teamId} !`
    );
    next(userWantsToLeave);
  },
}
</script> -->

<!-- SỬ DỤNG WATCH ĐỂ THAY ĐỔI DATA KHI PARAMS THAY ĐỔI -->
<!-- <script>
import UserItem from '../users/UserItem.vue';
export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
      text: 1
    };
  },
  methods: {
    handleAdd() {
      this.text++
    },
    handleInscre() {
      this.text--
    },
    loadTeamMembers(teamId) {
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  created() {
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.params.teamId);
    this.$watch(
      () => this.$route.params.teamId,
      (toParams, previousParams, next) => {
        // console.log(previousParams);
        // console.log(toParams);
        this.text = 1
        next()
      }
    )
  },
 
};
</script> -->

<!-- SỬ DỤNG HÀM RELOAD ĐỂ THAY ĐỔI DATA KHI PARAMS THAY ĐỔI -->
<!-- <script>
import UserItem from '../users/UserItem.vue';
export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
      text: 1
    };
  },
  watch:{
    teamId(){
      this.reloadWindowOne()
    }
  },
  methods: {
    reloadWindowOne() {
      if (!window.location.hash) {
        window.location.reload();
      }
    },
    handleAdd() {
      this.text++
    },
    handleInscre() {
      this.text--
    },
    loadTeamMembers(teamId) {
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  created() {
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.params.teamId);
    this.$watch(
      () => this.$route.params.teamId,
      (toParams, previousParams, next) => {
        // console.log(previousParams);
        // console.log(toParams);
        this.text = 1
        next()
      }
    )
  },

};
</script> -->



<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
}

input {
  width: 40px;
  outline: none;
  border: none;
  padding: 8px 12px;
  font-size: 1rem;
  background-color: antiquewhite;
  text-align: center;
}
</style>