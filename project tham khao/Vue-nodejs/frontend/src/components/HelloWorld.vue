<template>
  <div>
    <div class="header">
      <h1>data from xampp</h1>
      <button @click="refresh" :class="hinden ? 'hinden' : ''">
        refresh data
      </button>
    </div>
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
    <div v-if="!isShowEditUser">
      <label for="">Search</label>
      <input
        type="text"
        placeholder="Search..."
        v-model="keyword"
        @keydown.enter="getUserList"
      />
      <button @click="getUserList">Search</button>
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
    <div class="pagination">
      <h4>
        Panigation: <label for="pageSize">page size:</label>
        <select v-model="pagination.pageSize">
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </h4>
      <div>
        <button @click="previewPage">Preview</button>
        <span class="pageNumber">{{ pageNumber }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </div>
    <div>
      <div>
        <label for="">Description</label>
        <input
          type="text"
          placeholder="description,,,"
          v-model="description"
          @input="throttleSaveData"
        />
        <input
          type="text"
          placeholder="description,,,"
          v-model="description"
          @input="test1"
        />
      </div>
      <div>
        <h3>{{ description }}</h3>
      </div>
    </div>
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
// import throttle from "lodash/throttle";
import axios from "axios";
export default {
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
      pagination: {
        pageNumber: 1,
        pageSize: 5,
      },
      keyword: "",
      timeOut: null,
      lastCall: Date.now(),
      hinden: false,
      description: "abc",
      last: 0,
    };
  },
  watch: {
    pagination: {
      handler(newValue, _oldValue) {
        this.getUserList();
      },
      deep: true,
    },
  },
  created() {
    this.getUserList();
    this.getDescription();
    this.throttleSaveData = this.throttle(this.saveDecscription, 3000);
    this.test1 = this.test();
  },
  computed: {
    pageNumber() {
      return this.pagination.pageNumber;
    },
  },
  methods: {
    test() {
      // console.log("chi chay 1 lan tuancandongsang")
      return () => console.log("tuancandongsang");
    },
    // throttleSaveData() {
    //   this.throttle(this.saveDecscription, 2000);
    // },
    throttle(callback, timeout = 0) {

      let waiting = false;
      // console.log("chi chay 1 lan")
      return (...args) => {
        if (!waiting) {
          callback(...args);
          waiting = true;
          setTimeout(() => {
            waiting = false;
          }, timeout);
        }
      };

      // const now = Date.now();
      // console.log(now, this.lastCall, now - this.lastCall, timeout);
      // if (now - this.lastCall < timeout) {
      //   return;
      // }

      // this.debounce(callback, 2000);
      // this.lastCall = now;
    },
    async getDescription() {
      try {
        const data = await axios.get(
          " http://localhost:8080/api/v1/get-description"
        );
        this.description = data.data.data[0].description;
      } catch (error) {}
    },
    async saveDecscription() {
      // console.log("description duoc goi", this);
      if (this.description.trim()) {
        try {
          const data = await axios.put(
            " http://localhost:8080/api/v1/description",
            { description: this.description }
          );
        } catch (error) {
          console.log("khong goi duoc api", error);
        }
      }
    },
    refresh() {
      this.debounce(this.getUserList, 2000);
    },
    debounce(fn, delay) {
      this.hinden = true;
      this.timeOut && clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.hinden = false;
        fn();
      }, delay);
    },
    nextPage() {
      this.pagination.pageNumber += 1;
      this.getUserList();
    },
    previewPage() {
      if (this.pagination.pageNumber === 1) return;
      this.pagination.pageNumber = this.pagination.pageNumber - 1;
      this.getUserList();
    },
    async getUserList() {
      const params = {
        page: this.pagination.pageNumber,
        limit: this.pagination.pageSize,
      };
      if (this.keyword.trim()) {
        params.keyword = this.keyword.trim();
      }
      try {
        const data = await axios.get(" http://localhost:8080/api/v1/users/", {
          params,
        });
        this.users = data.data.data;
      } catch (error) {}
    },
    async saveEditUser() {
      try {
        await axios.put(
          `http://localhost:8080/api/v1/update-user/${this.formEdit.id}`,
          this.formEdit
        );
        this.getUserList();
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
        this.getUserList();
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
        this.getUserList();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.hinden {
  opacity: 0.5;
  cursor: default !important;
  background-color: red;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header button {
  border: 1ps solid #dddddd;
  margin-right: 50px;
  height: 2rem;
  border-radius: 8px;
  cursor: pointer;
}
.pagination {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 60px;
  margin-top: 20px;
}
.pagination h4 {
  margin: 0 30px 10px 0;
}
.pagination button {
  border: 0;
  cursor: pointer;
  padding: 4px 12px;
  background-color: #dddddd;
  border-radius: 4px;
}
.pageNumber {
  margin: 4px 8px;
  font-weight: 700;
}
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
