import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

Vue.use(VueFbCustomerChat, {
  page_id: 106391778468519, //  change 'null' to your Facebook Page ID,
  theme_color: '#00BCD4', // theme color in HEX
  locale: 'vi_VN', // default 'en_US'
})