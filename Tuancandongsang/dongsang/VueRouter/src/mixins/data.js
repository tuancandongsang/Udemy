export default {
  data() {
    return {
      teams: [
        { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
        { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
        { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
      ],
      users: [
        { id: 'u1', fullName: 'Nguyen Anh Tuan', role: 'Developer' },
        { id: 'u2', fullName: 'Duong Van Hiep', role: 'Developer' },
        { id: 'u3', fullName: 'Nguyen Van Ha', role: 'Developer' },
        { id: 'u4', fullName: 'Ngo Duy Anh', role: 'Manager' },
        { id: 'u5', fullName: 'Ngo Thi Khanh', role: 'Manager' },
      ],
    };
  },
};


//  <script>
// import UserItem from '../users/UserItem.vue';
// export default {
//   inject: ['users', 'teams'],
//   props: ['teamId'],
//   components: {
//     UserItem,
//   },
//   data() {
//     return {
//       teamName: '',
//       members: [],
//       text: 1
//     };
//   },
//   methods: {
//     handleAdd() {
//       this.text++
//     },
//     handleInscre() {
//       this.text--
//     },
//     loadTeamMembers(teamId) {
//       const selectedTeam = this.teams.find((team) => team.id === teamId);
//       const members = selectedTeam.members;
//       const selectedMembers = [];
//       for (const member of members) {
//         const selectedUser = this.users.find((user) => user.id === member);
//         selectedMembers.push(selectedUser);
//       }
//       this.members = selectedMembers;
//       this.teamName = selectedTeam.name;
//     },
//   },
//   created() {
//     this.loadTeamMembers(this.teamId);
//     console.log('this.$route: ', this.$route);
//     console.log('this.$routes: ', this.$routes);
//   },
//   beforeRouteUpdate(to, from, next) {
//     this.text=1
//     // const userWantsToLeave = confirm(
//     //   `==> thay doi .../users/:ID === ${this.teamId} !`
//     // );
//     // next(userWantsToLeave);
//     next();

//   },
//   // beforeRouteEnter(to, from, next) {
//   //   // console.log(to, from);
//   //   const userWantsToLeave = confirm(
//   //     '`==> truy cap vao  .../users/:ID : ${this.teamId}!`'
//   //   );
//   //   next(userWantsToLeave);
//   // },
//   beforeRouteLeave(to, from, next) {
//     // console.log(to, from);

//     const userWantsToLeave = confirm(
//       `==> roi khoi  .../users/:ID : ${this.teamId} !`
//     );
//     next(userWantsToLeave);
//   },
//   watch: {
//     teamId(newId) {
//       this.loadTeamMembers(newId);
//     },
//   },
// };
// </script>

