<template>
  <div class="form">
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="Username" name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="Password" name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { h } from 'vue';
import { notification } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue'
import { FrownTwoTone } from '@ant-design/icons-vue'
import { mapMutations } from 'vuex'


export default {
  data() {
    return {
      formState: {
        username: '',
        password: '',
        remember: true,
      },

    }
  },
  methods: {
    ...mapMutations(['TOGGLE_LOGIN']),
    successNoti() {
      notification.open({
        message: 'Dang nhap thanh cong',
        description: 'ban da dang nhap thanh cong, chao mung den voi chung toi.',
        style: 'border-radius: 5px; border: 3px solid green; ',
        icon: () => h(SmileOutlined, {
          style: 'color: green',
        }),
      });
    },
    failNoti() {
      notification.open({
        message: 'Dang nhap that bai',
        description: 'dang nhap khong thanh cong.',
        style: 'border-radius: 5px; border: 3px solid red; ',
        icon: () => h(FrownTwoTone, {
          style: 'color: red',
        }),
      })
    },
    routerGo() {
      this.$router.go(-1)
    },
    onFinish(values) {
      console.log('Success:', values);
      this.successNoti()

      // // SỬ DỤNG THIS.$ROUTER.GO() ĐỂ QUAY LẠI ROUTER TRƯỚC ĐÓ BAO NHIÊU BƯỚC
      // this.$router.go(-1)

      // // SỬ DỤNG this.$router.back() QUAY LẠI 1 ROUTE
      // this.$router.back()

      // // SỬ DỤNG this.$router.push() ĐỂ ĐIỀU HƯỚNG TỚI 1 ROUTER
      // this.$router.push("/")

      // // SỬ DỤNG this.$router.replace() ĐỂ ĐIỀU HƯỚNG TỚI 1 ROUTER mà k lưu lại lịch sử
      // this.$router.replace("/")

      // // SỬ DỤNG this.$router.forward() ĐỂ ĐIỀU HƯỚNG TỚI 1 ROUTER trước đó trong lịch sử router
      // this.$router.forward()

      // setTimeout(this.routerGo, 1500)
      this.TOGGLE_LOGIN()
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
    }

  },
  computed: {

  },
  created() {
    console.log("this.$router - router lớn", this.$router);
    console.log("this.$route - router con", this.$route);
    console.log(this.$router.resolve);
  }
}
</script>
<style scoped>
.form {
  display: flex;
  justify-content: center;
  margin: 30px;


}
</style>





<!-- <template>
  <div class="form">
    <form @submit.prevent="submitForm">
      <div>
        <label for="">Email</label>
        <input type="text" v-model="email">
      </div>
      <div>
        <label for="">Pass</label>
        <input type="text" v-model="pass">
      </div>
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { notification } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import {h} from "vue"
export default {
  data() {
    return {
      email: '',
      pass: "",
    }
  },
  methods: {
    submitForm() {
      this.successNoti()

    },
    successNoti() {
      notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        style: ' border-radius: 5px',
        icon: () => h(SmileOutlined, {
          style: 'color: #108ee9',
        }),
      });
    }
  }
}
</script>

<style>
.form{
  display: flex;
  justify-content: center;
  margin: 30px;  
}
</style> -->