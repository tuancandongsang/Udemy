<template>
  <div>
    <h1>data from xampp</h1>
    <div v-if="isShowEditUser">
      <p><b>edit user</b></p>
      <input type="text" placeholder="email" v-model="formEdit.email" /> <br />
      <input type="text" placeholder="firstName" v-model="formEdit.firstName" />
      <br />
      <input type="text" placeholder="lastName" v-model="formEdit.lastName" />
      <br />
      <input type="text" placeholder="address" v-model="formEdit.address" />
      <br />
      <button @click="saveEditUser">save</button>
      <button @click="canelEditUser">canel</button>
    </div>
    <table>
      <tr>
        <th>email</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.email }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.address }}</td>
        <td>
          <button @click="removeEmail(user.id)">delete</button>
          <button @click="editInforUser(user.id)">Edit</button>
        </td>
      </tr>
    </table>
    <div>
      <h1>add item</h1>
      <div>
        <input type="text" placeholder="email...." v-model="form.email" />
        <br />
        <input
          type="text"
          placeholder="lastName...."
          v-model="form.lastName"
        /><br />
        <input
          type="text"
          placeholder="firstName...."
          v-model="form.firstName"
        /><br />
        <input
          type="text"
          placeholder="address...."
          v-model="form.address"
        /><br />
        <button @click="addItem">add Item</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async created() {
    try {
      const data = await axios.get(" http://localhost:8080/api/v1/users/");
      this.users = data.data.data;
    } catch (error) {}
  },
  data() {
    return {
      isShowEditUser: false,
      users: undefined,
      form: {
        email: "",
        lastName: "",
        firstName: "",
        address: "",
      },
      formEdit: {},
    };
  },
  methods: {
    async saveEditUser() {
      try {
        await axios.put(
          `http://localhost:8080/api/v1/update-user/${this.formEdit.id}`,
          this.formEdit
        );
        const data = await axios.get(" http://localhost:8080/api/v1/users/");
        this.users = data.data.data;
      } catch (error) {}
      this.isShowEditUser = false;
    },
    canelEditUser() {
      this.isShowEditUser = false;
    },
    editInforUser(id) {
      this.isShowEditUser = true;
      const i = this.users.findIndex((item) => item.id === id);
      this.formEdit = {
        email: this.users[i].email,
        lastName: this.users[i].lastName,
        firstName: this.users[i].firstName,
        address: this.users[i].address,
        id: this.users[i].id,
      };
    },
    async addItem() {
      try {
        await axios.post(
          " http://localhost:8080/api/v1/create-user",
          this.form
        );
        const data = await axios.get(" http://localhost:8080/api/v1/users/");
        this.users = data.data.data;
      } catch (error) {}
      this.form = {
        email: "",
        lastName: "",
        firstName: "",
        address: "",
      };
    },
    async removeEmail(id) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/delete-user/${id}`);
        const data = await axios.get(" http://localhost:8080/api/v1/users/");
        this.users = data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
