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
import { SmileOutlined } from '@ant-design/icons-vue';
import { FrownTwoTone } from '@ant-design/icons-vue';
import { mapMutations } from 'vuex';
// import { START_LOCATION } from 'vue-router';

export default {
  data() {
    return {
      formState: {
        username: '',
        password: '',
        remember: true,
      },
    };
  },
  methods: {
    ...mapMutations(['TOGGLE_LOGIN']),
    successNoti() {
      notification.open({
        message: 'Dang nhap thanh cong',
        description:
          'ban da dang nhap thanh cong, chao mung den voi chung toi.',
        style: 'border-radius: 5px; border: 3px solid green; ',
        icon: () =>
          h(SmileOutlined, {
            style: 'color: green',
          }),
      });
    },
    failNoti() {
      notification.open({
        message: 'Dang nhap that bai',
        description: 'dang nhap khong thanh cong.',
        style: 'border-radius: 5px; border: 3px solid red; ',
        icon: () =>
          h(FrownTwoTone, {
            style: 'color: red',
          }),
      });
    },
    routerGo() {
      this.$router.go(-1);
    },
    onFinish(values) {
      console.log('Success:', values);
      this.successNoti();

      // // S??? D???NG THIS.$ROUTER.GO() ????? QUAY L???I ROUTER TR?????C ???? BAO NHI??U B?????C
      // this.$router.go(-1)

      // // S??? D???NG this.$router.back() QUAY L???I 1 ROUTE
      // this.$router.back()

      // // S??? D???NG this.$router.push() ????? ??I???U H?????NG T???I 1 ROUTER
      // this.$router.push("/")

      // // S??? D???NG this.$router.replace() ????? ??I???U H?????NG T???I 1 ROUTER m?? k l??u l???i l???ch s???
      // this.$router.replace("/")

      // // S??? D???NG this.$router.forward() ????? ??I???U H?????NG T???I 1 ROUTER tr?????c ???? trong l???ch s??? router
      // this.$router.forward()

      // // S??? D???NG this.$router.START_LOCATION() x??c ?????nh router ?????u ti??n khi kh???i ?????ng
      // this.$router.START_LOCATION()

      // // S??? D???NG NAME THAY CHO PATH,
      // this.$router.push({name: 'teams'})

      setTimeout(this.routerGo, 1500);
      this.TOGGLE_LOGIN();
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
    },
  },
  computed: {},
  created() {
    // // SO SANH ROUTER LON VA CON
    // console.log('this.$router - router l???n', this.$router);
    // console.log('this.$route - router con', this.$route);
    // // V??? TR?? ?????U TI??N, S?? KHAI C???A ROUTER
    // console.log(START_LOCATION);
  },
};
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